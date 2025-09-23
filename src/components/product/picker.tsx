import { FinalPrice } from "components/display/final-price";
import { Sheet } from "components/fullscreen-sheet";
import React, { FC, ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useSetRecoilState } from "recoil";
import { cartState } from "state";
import { SelectedOptions, getItemKey } from "types/cart";
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
  const [quantity, setQuantity] = useState(selected ? selected.quantity : 1);
  const setCart = useSetRecoilState(cartState);

  const addToCart = () => {
    if (!product) return;

    setCart((cart) => {
      const updatedCart = [...cart];
      const newItem = {
        product,
        options,
        quantity,
      };

      // Find existing item
      const existingIndex = cart.findIndex((item) => 
        item.product.id === product.id && 
        JSON.stringify(item.options) === JSON.stringify(options)
      );

      if (existingIndex !== -1) {
        if (quantity > 0) {
          // Update existing item
          updatedCart[existingIndex] = newItem;
        } else {
          // Remove item if quantity is 0
          updatedCart.splice(existingIndex, 1);
        }
      } else if (quantity > 0) {
        // Add new item
        updatedCart.push(newItem);
      }

      return updatedCart;
    });

    setVisible(false);
  };

  // Reset quantity and options when product changes
  useEffect(() => {
    if (product && !selected) {
      setOptions(getDefaultOptions(product));
      setQuantity(1);
    }
  }, [product, selected]);

// --- Review state ---
const [reviews, setReviews] = useState<{ user: string; rating: number; comment: string }[]>([]);
const [rating, setRating] = useState(0);
const [comment, setComment] = useState("");
const [userName, setUserName] = useState("");

// --- Submit review ---
const submitReview = () => {
  if (!rating || !comment.trim() || !userName.trim()) return;
  setReviews([...reviews, { user: userName.trim(), rating, comment }]);
  setRating(0);
  setComment("");
  setUserName("");
};

// --- Overall rating ---
const avgRating = reviews.length
  ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
  : null;

  return (
    <>
      {children({
        open: () => setVisible(true),
        close: () => setVisible(false),
      })}
      {createPortal(
        <Sheet
          visible={visible}
          onClose={() => setVisible(false)}
          autoHeight={false}
        >
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
              <Box className="space-y-3 pt-5">
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
                        }hover:scale-110`}
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
                  <Button onClick={submitReview} variant="primary">
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
