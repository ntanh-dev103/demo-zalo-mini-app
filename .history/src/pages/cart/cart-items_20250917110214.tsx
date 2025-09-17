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

  // toggle selection
  const toggleSelect = (key: string) => {
    setSelectedIds((prev) =>
      prev.includes(key) ? prev.filter((id) => id !== key) : [...prev, key]
    );
  };

  // create unique key for each cart item (product + options only)
  const getItemKey = (item: CartItem) =>
    JSON.stringify({
  product: item.product.id,
  options: item.options,
  quantity: item.quantity,
});

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
              renderKey={(item) => getItemKey(item)}
              renderLeft={(item) => {
                const key = getItemKey(item);
                return (
                  <Box flex className="items-center space-x-3 p-2 rounded-lg bg-gray-50">
  <label className="flex items-center cursor-pointer">
    <input
      type="checkbox"
      className="w-5 h-5 rounded border-gray-300 text-primary  focus:ring-primary focus:ring-2 transition-all duration-200"
      checked={selectedIds.includes(key)}
      onChange={() => toggleSelect(key)}
    />
    <span className="sr-only">Select {item.product.name}</span>
  </label>
  <div className="relative">
    <img
      className="w-12 h-12 rounded-xl object-cover shadow-md hover:shadow-lg transition-shadow duration-200"
      src={item.product.image}
      alt={item.product.name}
      loading="lazy"
    />
    {item.product.sale && (
      <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
        Sale
      </div>
    )}
  </div>
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
