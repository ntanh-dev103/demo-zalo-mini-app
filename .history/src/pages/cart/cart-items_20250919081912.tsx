import { FinalPrice } from "components/display/final-price";
import { DisplaySelectedOptions } from "components/display/selected-options";
import { ListRenderer } from "components/list-renderer";
import { ProductPicker } from "components/product/picker";
import React, { FC, useState } from "react";
import { useRecoilState } from "recoil";
import { cartState, selectedCartItemsState } from "state";
import { CartItem } from "types/cart";
import { Box, Text, Button } from "zmp-ui";

export const CartItems: FC = React.memo(() => {
  const [cart, setCart] = useRecoilState(cartState);
  const [editingItem, setEditingItem] = useState<CartItem | undefined>();
  const [selectedIds, setSelectedIds] = useRecoilState(selectedCartItemsState);

  console.log("CartItems rendered"); // Debug log

  const toggleSelect = (key: string) => {
    setSelectedIds((prev) =>
      prev.includes(key) ? prev.filter((id) => id !== key) : [...prev, key]
    );
  };

  const updateQuantity = (item: CartItem, delta: number) => {
    setCart(
      (prev) =>
        prev
          .map((c) =>
            c.product.id === item.product.id &&
            JSON.stringify(c.options) === JSON.stringify(item.options)
              ? { ...c, quantity: c.quantity + delta }
              : c
          )
          .filter((c) => c.quantity > 0) // auto-remove when 0
    );
  };

  return (
    <Box className="py-3 px-4 pb-24 space-y-4 min-h-fit w-full">
      {cart.length > 0 ? (
        <ProductPicker product={editingItem?.product} selected={editingItem}>
          {({ open }) => (
            <ListRenderer
  items={cart}
  limit={5}
  onClick={() => {}}
  itemClassName="
    bg-white rounded-xl shadow-sm border border-gray-200 
    p-4 mb-3 w-full min-h-[90px] 
    hover:shadow-md hover:border-gray-300 transition-all duration-200
    flex items-center
  "
  renderKey={({ product, options, quantity }) =>
    JSON.stringify({ product: product.id, options, quantity })
  }
  renderLeft={(item) => {
    const key = JSON.stringify({
      product: item.product.id,
      options: item.options,
      quantity: item.quantity,
    });
    return (
      <Box flex className="items-center space-x-3 min-w-[70px]">
        <input
          type="checkbox"
          checked={selectedIds.includes(key)}
          onChange={(e) => {
            e.stopPropagation();
            toggleSelect(key);
          }}
          className="
            w-5 h-5 rounded border border-gray-300 
            cursor-pointer transition-all duration-200
            checked:bg-primary checked:border-primary 
          "
        />
        <img
          className="w-16 h-16 object-cover rounded-lg border border-gray-200"
          src={item.product.image}
          alt={item.product.name}
        />
      </Box>
    );
  }}
  renderRight={(item) => (
    <Box flex className="flex-1 justify-between items-center overflow-hidden">
      {/* Product info */}
      <Box className="space-y-1 flex-1 pr-4 overflow-hidden">
        <Text
          size="small"
          className="font-semibold text-gray-800 truncate"
        >
          {item.product.name}
        </Text>
        <Text
          size="xxxSmall"
          className="text-gray-500 truncate"
        >
          <DisplaySelectedOptions options={item.options}>
            {item.product}
          </DisplaySelectedOptions>
        </Text>
      </Box>

      {/* Quantity + Price */}
      <Box flex className="items-center space-x-3 shrink-0">
        <Box flex className="items-center space-x-2">
          <Button
            size="small"
            className="w-7 h-7 min-w-0 rounded-md p-0 flex items-center justify-center bg-gray-100 text-gray-800 border border-gray-300 hover:bg-gray-200"
            onClick={(e) => {
              e.stopPropagation();
              updateQuantity(item, -1);
            }}
          >
            -
          </Button>
          <Text className="text-primary font-semibold min-w-[20px] text-center" size="small">
            {item.quantity}
          </Text>
          <Button
            size="xsmall"
            className="w-7 h-7 min-w-0 rounded-md p-0 flex items-center justify-center bg-gray-100 text-gray-800 border border-gray-300 hover:bg-gray-200"
            onClick={(e) => {
              e.stopPropagation();
              updateQuantity(item, +1);
            }}
          >
            +
          </Button>
        </Box>
        <Text className="font-semibold text-primary whitespace-nowrap" size="xxxSmall">
          <FinalPrice options={item.options}>{item.product}</FinalPrice>
        </Text>
      </Box>
    </Box>
  )}
/>

          )}
        </ProductPicker>
      ) : (
        <Box className="flex items-center justify-center flex-col min-h-[200px] text-center">
          <Text
            className="bg-white border border-gray-200 rounded-lg shadow-sm py-4 px-4 text-gray-500"
            size="small"
          >
            Không có sản phẩm trong giỏ hàng
          </Text>
          <Button
            className="mt-4 bg-primary text-white rounded-md hover:bg-primary-dark px-4 py-2"
            onClick={() => {
              console.log("Navigate to products");
            }}
          >
            Duyệt sản phẩm
          </Button>
        </Box>
      )}
    </Box>
  );
});
