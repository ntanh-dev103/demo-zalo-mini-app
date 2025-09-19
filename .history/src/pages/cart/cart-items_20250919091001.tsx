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
    setCart((prev) =>
      prev
        .map((c) =>
          c.product.id === item.product.id &&
          JSON.stringify(c.options) === JSON.stringify(item.options)
            ? { ...c, quantity: c.quantity + delta }
            : c
        )
        .filter((c) => c.quantity > 0)
    );
  };

  return (
    <Box className="py-3 px-4 pb-24 space-y-4 min-h-fit w-full">
      {cart.length > 0 ? (
        <ProductPicker
  product={editingItem?.product}
  selected={editingItem}
>
  {({ open, close }) => (
    <ListRenderer
      items={cart}
      renderKey={({ product, options }) =>
        JSON.stringify({ product: product.id, options })
      }
      renderLeft={(item) => (
        // ... your left side checkbox + image
      )}
      renderRight={(item) => (
        <Box
          flex
          className="flex-1 justify-between items-center overflow-hidden min-h-[48px]"
        >
          {/* Product info */}
          <Box className="flex flex-col justify-center flex-1 pr-3 overflow-hidden">
            <Text
              size="xxxSmall"
              className="font-medium text-gray-800 truncate leading-tight"
            >
              {item.product.name}
            </Text>
            <Text
              size="xxSmall"
              className="text-gray-500 truncate leading-tight cursor-pointer hover:text-blue-600"
              onClick={(e) => {
                e.stopPropagation();
                setEditingItem(item);
                open();
              }}
            >
              <DisplaySelectedOptions options={item.options}>
                {item.product}
              </DisplaySelectedOptions>
            </Text>
          </Box>

          {/* Quantity + Price */}
          {/* ... same as before */}
        </Box>
      )}
    />
  )}
</ProductPicker>

      ) : (
        <Box className="flex items-center justify-center flex-col min-h-[200px] text-center">
          <Text
            className="bg-white border border-primary rounded-lg shadow-sm py-4 px-4 text-gray-500"
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
