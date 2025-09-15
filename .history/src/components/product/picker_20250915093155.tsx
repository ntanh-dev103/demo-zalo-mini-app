import { FinalPrice } from "components/display/final-price";
import { Sheet } from "components/fullscreen-sheet";
import React, { FC, ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useSetRecoilState } from "recoil";
import { cartState } from "state";
import { SelectedOptions } from "types/cart";
import { Product } from "types/product";
import { isIdentical } from "utils/product";
import { Box, Button, Text, Input } from "zmp-ui";
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

  // --- New state for reviews ---
  const [reviews, setReviews] = useState<{ rating: number; comment: string }[]>(
    []
  );
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

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

  // --- Submit review handler ---
  const submitReview = () => {
    if (!rating || !comment.trim()) return;
    setReviews([...reviews, { rating, comment }]);
    setRating(0);
    setComment("");
  };

  return (
    <>
      {children({
        open: () => setVisible(true),
        close: () => setVisible(false),
      })}
      {createPortal(
        <Sheet visible={visible} onClose={() => setVisible(false)} autoHeight>
          {product && (
            <Box className="space-y-3" p={4}>
              {/* Product Image */}
              {product.image && (
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-xl"
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
                  ></div>
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
                          setOptions((prevOptions) => ({
                            ...prevOptions,
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
                          setOptions((prevOptions) => ({
                            ...prevOptions,
                            [variant.id]: selectedOption,
                          }))
                        }
                      />
                    )
                  )}
                <QuantityPicker value={quantity} onChange={setQuantity} />

                {/* Cart Button */}
                {selected ? (
                  <Button
                    variant={quantity > 0 ? "primary" : "secondary"}
                    type={quantity > 0 ? "highlight" : "neutral"}
                    fullWidth
                    onClick={addToCart}
                  >
                    {quantity > 0
                      ? selected
                        ? "Cập nhật giỏ hàng"
                        : "Thêm vào giỏ hàng"
                      : "Xoá"}
                  </Button>
                ) : (
                  <Button
                    disabled={!quantity}
                    variant="primary"
                    type="highlight"
                    fullWidth
                    onClick={addToCart}
                  >
                    Thêm vào giỏ hàng
                  </Button>
                )}
              </Box>

              {/* --- Reviews Section --- */}
              <Box className="space-y-3 border-t pt-3">
                <Text.Title className="text-lg">Đánh giá</Text.Title>

                {/* Existing Reviews */}
                {reviews.length === 0 ? (
                  <Text className="text-gray">Chưa có đánh giá nào</Text>
                ) : (
                  reviews.map((r, i) => (
                    <Box key={i} className="border-b pb-2">
                      <Text>
                        {"⭐".repeat(r.rating)}{" "}
                        <span className="text-gray">({r.rating}/5)</span>
                      </Text>
                      <Text>{r.comment}</Text>
                    </Box>
                  ))
                )}

                {/* Add Review */}
                <Box className="space-y-2">
                  <Text className="font-semibold">Thêm đánh giá của bạn</Text>
                  <Box className="flex space-x-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Text
                        key={star}
                        className={`cursor-pointer text-2xl ${
                          star <= rating ? "text-yellow-500" : "text-gray"
                        }`}
                        onClick={() => setRating(star)}
                      >
                        ⭐
                      </Text>
                    ))}
                  </Box>
                  <Input.TextArea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Nhập nhận xét của bạn..."
                  />
                  <Button type="primary" onClick={submitReview}>
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
