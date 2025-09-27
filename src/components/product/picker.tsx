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

// -------------------------------------------------------------
// HÀM MOCK DATA: TẠO ĐÁNH GIÁ KHÁC NHAU DỰA TRÊN PRODUCT ID
// FIX: Chấp nhận productId có thể là string, number, hoặc undefined
// -------------------------------------------------------------
const mockReviewTemplates = [
    { rating: 5, comment: "Tuyệt vời! Sản phẩm vượt ngoài mong đợi, sẽ mua lại lần nữa." },
    { rating: 4, comment: "Sản phẩm chất lượng, giao hàng nhanh chóng. Rất hài lòng!" },
    { rating: 5, comment: "Đúng như mô tả, mình rất thích. Cảm ơn shop!" },
    { rating: 3, comment: "Sản phẩm ổn, nhưng có vẻ chưa xứng với giá tiền. Cần cải thiện." },
];

const generateReviewsForProduct = (productId?: string | number) => {
    // Chuyển đổi ID sang chuỗi và kiểm tra tính hợp lệ
    const idString = productId ? String(productId) : undefined;

    if (!idString || idString.length === 0) {
        return []; 
    }
    
    // Sử dụng ID để mô phỏng sự khác biệt
    const seed = idString.charCodeAt(idString.length - 1) % mockReviewTemplates.length;
    
    // Tạo 3 đánh giá mẫu khác nhau cho mỗi sản phẩm dựa trên seed
    return [
        { user: `Khách hàng ${idString.slice(0, 3)}A`, rating: mockReviewTemplates[(seed) % mockReviewTemplates.length].rating, comment: mockReviewTemplates[(seed) % mockReviewTemplates.length].comment },
        { user: `Khách hàng ${idString.slice(0, 3)}B`, rating: mockReviewTemplates[(seed + 1) % mockReviewTemplates.length].rating, comment: mockReviewTemplates[(seed + 1) % mockReviewTemplates.length].comment },
        { user: `Khách hàng ${idString.slice(0, 3)}C`, rating: mockReviewTemplates[(seed + 2) % mockReviewTemplates.length].rating, comment: mockReviewTemplates[(seed + 2) % mockReviewTemplates.length].comment },
    ];
};
// -------------------------------------------------------------


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
// FIX: Truyền product?.id an toàn
const [reviews, setReviews] = useState<{ user: string; rating: number; comment: string }[]>(
    generateReviewsForProduct(product?.id) 
);
const [rating, setRating] = useState(0);
const [comment, setComment] = useState("");
const [userName, setUserName] = useState("Bạn"); 

// ĐỒNG BỘ: Cập nhật reviews khi product thay đổi
// FIX: Phụ thuộc vào product?.id và xử lý an toàn
useEffect(() => {
    setReviews(generateReviewsForProduct(product?.id));
    setRating(0); // Reset form khi xem sản phẩm mới
    setComment("");
}, [product?.id]);


// --- Submit review ---
const submitReview = () => {
  if (!rating || !comment.trim()) {
    alert("Vui lòng chọn số sao và nhập nhận xét!");
    return;
  }
  setReviews([...reviews, { user: userName.trim(), rating, comment }]); 
  setRating(0);
  setComment("");
  alert("Đã gửi đánh giá thành công!"); 
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
              {/* Product Image và Variant Pickers (Giữ nguyên) */}
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

                {/* Existing Reviews - ĐÃ SỬA LỖI KIỂU DỮ LIỆU */}
                {reviews.length === 0 ? (
                  <Text className="text-gray">Chưa có đánh giá nào</Text>
                ) : (
                  reviews.map((r, i) => (
                    <Box key={i} className="border-b pb-2">
                      <Text>
                         {/* FIX: Đảm bảo r.rating là số để repeat hoạt động */}
                        {"★".repeat(Number(r.rating)) + "☆".repeat(5 - Number(r.rating))}{" "} 
                        <span className="text-gray text-xs">({r.rating}/5) bởi {r.user}</span>
                      </Text>
                      <Text>{r.comment}</Text>
                    </Box>
                  ))
                )}

                {/* Add Review - Giữ nguyên logic */}
                <Box className="space-y-2">
                  <Text className="font-semibold">Thêm đánh giá của bạn</Text>
                  {/* THÊM CLASS review-star-container cho styling CSS tùy chỉnh */}
                  <Box className="flex space-x-2 review-star-container"> 
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Text
                        key={star}
                        className={`cursor-pointer text-2xl ${
                          star <= rating ? "text-yellow-500" : "text-gray-400"
                        } hover:scale-110 transition-transform`} 
                        onClick={() => setRating(star)}
                      >
                        {star <= rating ? "★" : "☆"} 
                      </Text>
                    ))}
                  </Box>
                  <Input.TextArea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Nhập nhận xét của bạn..."
                  />
                  <Button onClick={submitReview} variant="primary" fullWidth>
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