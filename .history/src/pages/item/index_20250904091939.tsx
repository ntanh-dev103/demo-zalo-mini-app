import React, { useState } from "react";
import { Box, Text, Button } from "zmp-ui";
import { Product, Variant } from "types/product";

// Example product data (replace with real data fetching logic)
const product: Product = {
  id: 1,
  name: "Tai Nghe Không Dây Bluetooth 5.0",
  image: "/static/logo.png",
  price: 999000,
  categoryId: ["audio"],
  description: "Âm thanh sống động, bass trầm ấm. Thiết kế công thái học, thoải mái khi đeo lâu. Tương thích đa thiết bị.",
  sale: { type: "percent", percent: 10 },
  variants: [
    {
      id: "color",
      label: "Màu sắc",
      type: "single",
      options: [
        { id: "black", label: "Đen" },
        { id: "white", label: "Trắng" },
      ],
      default: "black",
    },
    {
      id: "battery",
      label: "Pin",
      type: "single",
      options: [
        { id: "20h", label: "20 giờ" },
      ],
      default: "20h",
    },
  ],
};

const formatPrice = (price: number) => `₫${price.toLocaleString()}`;

// const getFinalPrice = (product: Product) => {
//   if (!product.sale) return product.price;
//   if (product.sale.type === "percent") {
//     // Clamp percent between 0 and 100
//     const percent = Math.max(0, Math.min(100, product.sale.percent));
//     return Math.round(product.price * (1 - percent / 100));
//   }
//   if (product.sale.type === "fixed") {
//     return Math.max(0, product.price - product.sale.amount);
//   }
//   return product.price;
// };

// const getFinalPrice = (product: Product) => {
//   if (!product.sale) return product.price;

//   if (product.sale.type === "percent") {
//     // Here percent is a decimal (0.05 = 5%)
//     const percent = Math.max(0, Math.min(1, product.sale.percent)); // clamp 0–1
//     return Math.round(product.price * (1 - percent));
//   }

//   if (product.sale.type === "fixed") {
//     return Math.max(0, product.price - product.sale.amount);
//   }

//   return product.price;
// };


const ItemDetailPage: React.FC = () => {
  // State for selected options
  const [selectedOptions, setSelectedOptions] = useState<{ [variantId: string]: string | string[] }>(() => {
    const initial: { [variantId: string]: string | string[] } = {};
    product.variants?.forEach((variant) => {
      if (variant.type === "single") {
        initial[variant.id] = variant.default || variant.options[0]?.id;
      } else if (variant.type === "multiple") {
        initial[variant.id] = variant.default || [];
      }
    });
    return initial;
  });

  // Option selection handler
  const handleOptionChange = (variant: Variant, optionId: string) => {
    setSelectedOptions((prev) => {
      if (variant.type === "single") {
        return { ...prev, [variant.id]: optionId };
      } else {
        const arr = Array.isArray(prev[variant.id]) ? [...(prev[variant.id] as string[])] : [];
        if (arr.includes(optionId)) {
          return { ...prev, [variant.id]: arr.filter((id) => id !== optionId) };
        } else {
          return { ...prev, [variant.id]: [...arr, optionId] };
        }
      }
    });
  };

  return (
    <Box className="p-4 max-w-2xl mx-auto">
      <Text className="text-2xl font-bold mb-2">{product.name}</Text>
      <img src={product.image} alt={product.name} className="w-full h-64 object-cover rounded-xl mb-4" />
      <Box className="mb-2">
        {product.sale && (
          <Text className="text-sm text-red-500 font-semibold mr-2">
            Giảm {product.sale.type === "percent" ? `${product.sale.percent}%` : formatPrice(product.sale.amount)}
          </Text>
        )}
        <Text className="text-primary text-2xl font-bold mr-2">{formatPrice(getFinalPrice(product))}</Text>
        {product.sale && (
          <Text className="line-through text-gray-400 text-lg">{formatPrice(product.price)}</Text>
        )}
      </Box>
      {product.variants && product.variants.length > 0 && (
        <Box className="mb-4">
          {product.variants.map((variant) => (
            <Box key={variant.id} className="mb-2">
              <Text className="font-semibold mr-2">{variant.label || variant.id}:</Text>
              {variant.options.map((option) => (
                <Button
                  key={option.id}
                  size="small"
                  className={`mr-2 mb-2 ${
                    (variant.type === "single" && selectedOptions[variant.id] === option.id) ||
                    (variant.type === "multiple" && Array.isArray(selectedOptions[variant.id]) && (selectedOptions[variant.id] as string[]).includes(option.id))
                      ? "bg-primary text-white"
                      : "bg-gray-100"
                  }`}
                  onClick={() => handleOptionChange(variant, option.id)}
                >
                  {option.label || option.id}
                </Button>
              ))}
            </Box>
          ))}
        </Box>
      )}
      <Text className="mb-4 block">{product.description}</Text>
      <Box className="flex gap-4 mb-4">
        <Button type="highlight" className="flex-1">Thêm vào giỏ hàng</Button>
        <Button type="neutral" className="flex-1">Mua ngay</Button>
      </Box>
    </Box>
  );
};

export default ItemDetailPage;