import { FinalPrice } from "components/display/final-price";
import { Sheet } from "components/fullscreen-sheet";
import React, { FC, ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useSetRecoilState } from "recoil";
import { cartState } from "state";
import { SelectedOptions } from "types/cart";
import { Product } from "types/product";
import { isIdentical } from "utils/product";
import { Box, Button, Text, Input, Select } from "zmp-ui";
import { MultipleOptionPicker } from "./multiple-option-picker";
import { QuantityPicker } from "./quantity-picker";
import { SingleOptionPicker } from "./single-option-picker";

export interface ProductPickerProps {
  product?: Product;
  selected?: {
    options: SelectedOptions;
    quantity: number;
  };
  children: (methods: { open: () => void; close: () => void }) => ReactNode;
}

type Review = { user: string; rating: number; comment: string; date: number };

function getDefaultOptions(product?: Product) {
  if (product && product.variants) {
    return product.variants.reduce(
      (options, variant) =>
        Object.assign(options, {
          [variant.id]: variant.default,
        }),
      {}
    );
  }
  return {};
}

export const ProductPicker: FC<ProductPickerProps> = ({
  children,
  product,
  selected,
}) => {
  const [visible, setVisible] = useState(false);
  const [options, setOptions] = useState<SelectedOptions>(
    selected ? selected.options : getDefaultOptions(product)
  );
  const [quantity, setQuantity] = useState(1);
  const setCart = useSetRecoilState(cartState);

  // --- Reviews state ---
  const [reviews, setReviews] = useState<Review[]>([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [userName, setUserName] = useState("");
  const [sortBy, setSortBy] = useState<"rating" | "newest">("newest");

  // Load persisted reviews
  useEffect(() => {
    if (product?.id) {
      const saved = localStorage.getItem(`reviews_${product.id}`);
      if (saved) setReviews(JSON.parse(saved));
    }
  }, [product?.id]);

  // Persist reviews
  useEffect(() => {
    if (product?.id) {
      localStorage.setItem(`reviews_${product.id}`, JSON.stringify(reviews));
    }
  }, [reviews, product?.id]);

  useEffect(() => {
    if (selected) {
      setOptions(selected.options);
      setQuantity(selected.quantity);
    }
  }, [selected]);

  const addToCart = () => {
    if (product) {
      setCart((cart) => {
        let res = [...cart];
        if (selected) {
          const editing = cart.find(
            (item) =>
              item.product.id === product.id &&
              isIdentical(item.options, selected.options)
          )!;
          if (quantity === 0) {
            res.splice(cart.indexOf(editing), 1);
          } else {
            const existed = cart.find(
              (item, i) =>
                i !== cart.indexOf(editing) &&
                item.product.id === product.id &&
                isIdentical(item.options, options)
            )!;
            res.splice(cart.indexOf(editing), 1, {
              ...editing,
              options,
              quantity: existed ? existed.quantity + quantity : quantity,
            });
            if (existed) {
              res.splice(cart.indexOf(existed), 1);
            }
          }
        } else {
          const existed = cart.find(
            (item) =>
              item.product.id === product.id &&
              isIdentical(item.options, options)
          );
          if (existed) {
            res.splice(cart.indexOf(existed), 1, {
              ...existed,
              quantity: existed.quantity + quantity,
            });
          } else {
            res = res.concat({
              product,
              options,
              quantity,
            });
          }
        }
        return res;
      });
    }
    setVisible(false);
  };

  const submitReview = () => {
    if (!userName.trim() || !comment.trim() || !rating) return;
    setReviews([
      ...reviews,
      { user: userName, rating, comment, date: Date.now() },
    ]);
    setUserName("");
    setComment("");
    setRating(0);
  };

  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
        ).toFixed(1)
      : "0";

  // Sort reviews
  const sortedReviews = [...reviews].sort((a, b) => {
    if (sortBy === "rating") {
      return b.rating - a.rating;
    } else {
      return b.date - a.date;
    }
  });

  return (
    <>
      {children({
        open: () => setVisible(true),
        close: () => setVisible(false),
      })}
      {createPortal(
        <Sheet visible={visible} onClose={() => setVisible(false)}>
          {product && (
            <Box className="max-h-[80vh] overflow-y-auto" p={4}>
              {/* Product Image */}
              {product.image && (
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-xl mb-4"
                />
              )}

              {/* Product Info */}
              <Box className="space-y-2">
                <Text.Title>{product.name}</Text.Title>
                <Text>
                  <FinalPrice options={options}>{product}</FinalPrice>
                </Text>
                <Text>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: product.description ?? "",
                    }}
                  />
                </Text>
              </Box>

              {/* Variant Pickers */}
              <Box className="space-y-5">
                {product.variants &&
                  product.variants.map((variant) =>
                    variant.type === "single" ? (
                      <SingleOptionPicker
                        key={variant.id}
                        variant={variant}
                        value={options[variant.id] as string}
                        onChange={(selectedOption) =>
                          setOptions((prev) => ({
                            ...prev,
                            [variant.id]: selectedOption,
                          }))
                        }
                      />
                    ) : (
                      <MultipleOptionPicker
                        key={variant.id}
                        product={product}
                        variant={variant}
                        value={options[variant.id] as string[]}
                        onChange={(selectedOption) =>
                          setOptions((prev) => ({
                            ...prev,
                            [variant.id]: selectedOption,
                          }))
                        }
                      />
                    )
                  )}
                <QuantityPicker value={quantity} onChange={setQuantity} />

                <Button
                  variant="primary"
                  fullWidth
                  disabled={!quantity}
                  onClick={addToCart}
                >
                  {selected
                    ? quantity > 0
                      ? "Cập nhật giỏ hàng"
                      : "Xoá"
                    : "Thêm vào giỏ hàng"}
                </Button>
              </Box>

              {/* --- Reviews Section --- */}
              <Box className="space-y-3 pt-6">
                <Text.Title className="text-lg">
                  Đánh giá ({reviews.length})
                </Text.Title>
                <Text className="text-yellow-600 font-semibold">
                  ⭐ {averageRating}/5
                </Text>

                {/* Sort Options */}
                <Select
                  value={sortBy}
                  onChange={(val) => setSortBy(val as "rating" | "newest")}
                  options={[
                    { value: "newest", label: "Mới nhất" },
                    { value: "rating", label: "Điểm cao nhất" },
                  ]}
                />

                {/* Existing Reviews */}
                {sortedReviews.length === 0 ? (
                  <Text className="text-gray">Chưa có đánh giá nào</Text>
                ) : (
                  sortedReviews.map((r, i) => (
                    <Box key={i} className="border-b pb-2">
                      <Text className="font-semibold">{r.user}</Text>
                      <Text>
                        {"⭐".repeat(r.rating)}{" "}
                        <span className="text-gray">({r.rating}/5)</span>
                      </Text>
                      <Text className="text-sm text-gray">
                        {new Date(r.date).toLocaleString()}
                      </Text>
                      <Text>{r.comment}</Text>
                    </Box>
                  ))
                )}

                {/* Add Review */}
                <Box className="space-y-2 border-t pt-3">
                  <Text className="font-semibold">Thêm đánh giá của bạn</Text>
                  <Input
                    placeholder="Tên của bạn"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                  />
                  <Input.TextArea
                    placeholder="Nhập nhận xét..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                  <Box className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Text
                        key={star}
                        className={`cursor-pointer text-2xl ${
                          star <= rating ? "text-yellow-500" : "text-gray-400"
                        }`}
                        onClick={() => setRating(star)}
                      >
                        ⭐
                      </Text>
                    ))}
                  </Box>
                  <Button variant="primary" onClick={submitReview}>
                    Gửi đánh giá
                  </Button>
                </Box>
              </Box>
            </Box>
          )}
        </Sheet>,
        document.body
      )}
    </>
  );
};
