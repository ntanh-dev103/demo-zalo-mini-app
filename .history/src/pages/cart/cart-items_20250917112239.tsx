import { FinalPrice } from "components/display/final-price";
import { DisplaySelectedOptions } from "components/display/selected-options";
import { ListRenderer } from "components/list-renderer";
import { ProductPicker } from "components/product/picker";
import React, { FC, useState } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import { cartState, selectedCartItemsState } from "state";
import { CartItem } from "state";
import { Box, Text, Button } from "zmp-ui";

export const CartItems: FC = React.memo(() => {
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
              renderKey={generateCartItemKey}
              renderLeft={(item) => {
                const key = generateCartItemKey(item);
                return (
                  <Box flex className="items-center space-x-3">
                    <input
                      type="checkbox"
                      className="w-5 h-5 rounded border-2 border-gray-300 focus:border-teal-500 focus:ring-teal-500 checked:bg-teal-500 checked:border-teal-500 transition-colors duration-200"
                      checked={selectedIds.includes(key)}
                      onChange={() => toggleSelect(key)}
                    />
                    <Box className="relative">
                      <img
                        className="w-12 h-12 rounded-lg object-cover shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
                        src={item.product.image}
                        alt={item.product.name}
                      />
                      {item.product.sale && (
                        <Box className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full shadow">
                          Sale
                        </Box>
                      )}
                    </Box>
                  </Box>
                );
              }}
              renderRight={(item) => (
                <Box flex className="space-x-1">
                  <Box className="space-y-1 flex-1">
                    <Text size="small" className="font-medium line-clamp-1">
                      {item.product.name}
                    </Text>
                    <Text className="text-gray" size="xSmall">
                      <FinalPrice options={item.options}>
                        {item.product}
                      </FinalPrice>
                    </Text>
                    <Text className="text-gray-500" size="xxxSmall">
                      <DisplaySelectedOptions options={item.options}>
                        {item.product}
                      </DisplaySelectedOptions>
                    </Text>
                  </Box>
                  <Text className="text-primary font-semibold" size="small">
                    x{item.quantity}
                  </Text>
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
              // Navigate to products page (implement navigation logic)
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