import { FinalPrice } from "components/display/final-price";
import { DisplaySelectedOptions } from "components/display/selected-options";
import { ListRenderer } from "components/list-renderer";
import { ProductPicker } from "components/product/picker";
import React, { FC, useState } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import { cartState, selectedCartItemsState } from "state";
import { CartItem } from "types/cart";
import { Box, Text } from "zmp-ui";

export const CartItems: FC = () => {
  const cart = useRecoilValue(cartState);
  const [editingItem, setEditingItem] = useState<CartItem | undefined>();
  const [selectedIds, setSelectedIds] = useRecoilState(selectedCartItemsState);

  const toggleSelect = (key: string) => {
    setSelectedIds((prev) =>
      prev.includes(key) ? prev.filter((id) => id !== key) : [...prev, key]
    );
  };

  return (
    <Box className="py-3 px-4">
      {cart.length > 0 ? (
        <ProductPicker product={editingItem?.product} selected={editingItem}>
          {({ open }) => (
            <ListRenderer
              items={cart}
              limit={3}
              onClick={(item) => {
                setEditingItem(item);
                open();
              }}
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
                  <Box flex className="items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(key)}
                      onChange={() => toggleSelect(key)}
                    />
                    <img
                      className="w-10 h-10 rounded-lg"
                      src={item.product.image}
                    />
                  </Box>
                );
              }}
              renderRight={(item) => (
                <Box flex className="space-x-1">
                  <Box className="space-y-1 flex-1">
                    <Text size="small">{item.product.name}</Text>
                    <Text className="text-gray" size="xSmall">
                      <FinalPrice options={item.options}>
                        {item.product}
                      </FinalPrice>
                    </Text>
                    <Text className="text-gray" size="xxxSmall">
                      <DisplaySelectedOptions options={item.options}>
                        {item.product}
                      </DisplaySelectedOptions>
                    </Text>
                  </Box>
                  <Text className="text-primary font-medium" size="small">
                    x{item.quantity}
                  </Text>
                </Box>
              )}
            />
          )}
        </ProductPicker>
      ) : (
        <Text
          className="bg-background rounded-xl py-8 px-4 text-center text-gray"
          size="xxSmall"
        >
          Không có sản phẩm trong giỏ hàng
        </Text>
      )}
    </Box>
  );
};
