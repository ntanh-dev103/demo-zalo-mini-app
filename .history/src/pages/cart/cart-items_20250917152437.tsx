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
    <Box className="py-3 px-4">
      {cart.length > 0 ? (
        <ProductPicker product={editingItem?.product} selected={editingItem}>
          {({ open }) => (
            <ListRenderer
  items={cart}
  limit={5}
  // disable opening product page
  onClick={() => {}}
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
      <Box flex className="items-center space-x-3">
        {/* Custom checkbox */}
        <input
          type="checkbox"
          checked={selectedIds.includes(key)}
          onChange={(e) => {
            e.stopPropagation();
            toggleSelect(key);
          }}
          className="
            w-5 h-5 rounded-[6px] border border-gray-400 
            appearance-none cursor-pointer transition-all duration-200
            checked:bg-blue-500 checked:border-blue-500 
            checked:shadow-[0_0_0_2px_white]
          "
        />
        {/* Product image */}
        <img
          className="w-20 h-20 object-cover rounded-md shadow-sm"
          src={item.product.image}
        />
      </Box>
    );
  }}
  renderRight={(item) => (
    <Box
      flex
      className="flex-1 justify-between items-center bg-white rounded-lg p-3 shadow-sm"
    >
      {/* Product info */}
      <Box className="space-y-1 flex-1 pr-4">
        <Text size="small" className="font-medium text-primary line-clamp-2">
          {item.product.name}
        </Text>
        <Text size="xxSmall" className="text-gray">
          <DisplaySelectedOptions options={item.options}>
            {item.product}
          </DisplaySelectedOptions>
        </Text>
      </Box>

      {/* Quantity + Price */}
      <Box flex className="items-center space-x-4">
        <Box flex className="items-center space-x-2">
          <Button
            size="small"
            className="w-7 h-7 min-w-0 rounded-full p-0 flex items-center justify-center bg-gray-100"
            onClick={(e) => {
              e.stopPropagation();
              updateQuantity(item, -1);
            }}
          >
            -
          </Button>
          <Text className="text-primary font-medium" size="small">
            {item.quantity}
          </Text>
          <Button
            size="small"
            className="w-7 h-7 min-w-0 rounded-full p-0 flex items-center justify-center bg-gray-100"
            onClick={(e) => {
              e.stopPropagation();
              updateQuantity(item, +1);
            }}
          >
            +
          </Button>
        </Box>
        <Text className="font-bold text-green-600" size="small">
          <FinalPrice options={item.options}>{item.product}</FinalPrice>
        </Text>
      </Box>
    </Box>
  )}
/>

          )}
        </ProductPicker>
      ) : (
        <Box className="text-center">
          <Text
            className="bg-background rounded-xl py-8 px-4 text-gray"
            size="xxSmall"
          >
            Không có sản phẩm trong giỏ hàng
          </Text>
          <Button
            className="mt-4"
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
