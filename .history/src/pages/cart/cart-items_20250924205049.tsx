import { FinalPrice } from "components/display/final-price";
import { DisplaySelectedOptions } from "components/display/selected-options";
import { ListRenderer } from "components/list-renderer";
import { ProductPicker } from "components/product/picker";
import React, { FC, useState } from "react";
import { useRecoilState } from "recoil";
import { cartState, selectedCartItemsState } from "state";
import { CartItem, getItemKey } from "types/cart";
import { Box, Text, Button, Checkbox } from "zmp-ui";

export const CartItems: FC = React.memo(() => {
  const [cart, setCart] = useRecoilState(cartState);
  const [editingItem] = useState<CartItem | undefined>();
  const [selectedItems, setSelectedItems] = useRecoilState(
    selectedCartItemsState
  );

  const toggleSelect = (item: CartItem) => {
    const key = getItemKey(item);
    setSelectedItems((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const updateQuantity = (item: CartItem, delta: number) => {
    setCart((prev) =>
      prev
        .map((c) =>
          getItemKey(c) === getItemKey(item)
            ? { ...c, quantity: c.quantity + delta }
            : c
        )
        .filter((c) => c.quantity > 0)
    );
  };

  return (
    <Box className="p-4 space-y-4">
      {cart.length > 0 ? (
        <ProductPicker product={editingItem?.product} selected={editingItem}>
          {() => (
            <ListRenderer
              items={cart}
              renderKey={(item) => getItemKey(item)}
              onClick={() => {}}
              renderItem={(item) => {
                const key = getItemKey(item);
                return (
                  <Box className="flex items-start p-3 bg-white rounded-2xl shadow-sm border border-gray-100">
                    {/* Left side: checkbox + image */}
                    <Box flex className="items-start space-x-3">
                      <Checkbox
                        value={key}
                        checked={selectedItems.includes(key)}
                        onChange={() => toggleSelect(item)}
                      />
                      <img
                        className="w-20 h-20 object-cover rounded-xl border"
                        src={item.product.image}
                        alt={item.product.name}
                      />
                    </Box>

                    {/* Right side */}
                    <Box className="flex-1 flex flex-col justify-between pl-3">
                      <Box className="space-y-1">
                        <Text size="small" className="font-semibold text-primary">
                          {item.product.name}
                        </Text>
                        <Text size="xxSmall" className="text-gray-500">
                          <DisplaySelectedOptions options={item.options}>
                            {item.product}
                          </DisplaySelectedOptions>
                        </Text>
                      </Box>

                      <Box flex className="justify-between items-center mt-3">
                        {/* Quantity controls */}
                        <Box flex className="items-center space-x-2 bg-gray-100 rounded-full px-2 py-1">
                          <Button
                            size="small"
                            className="w-8 h-8 min-w-0 rounded-full p-0"
                            onClick={(e) => {
                              e.stopPropagation();
                              updateQuantity(item, -1);
                            }}
                          >
                            -
                          </Button>
                          <Text size="small" className="font-medium text-primary">
                            {item.quantity}
                          </Text>
                          <Button
                            size="small"
                            className="w-8 h-8 min-w-0 rounded-full p-0"
                            onClick={(e) => {
                              e.stopPropagation();
                              updateQuantity(item, +1);
                            }}
                          >
                            +
                          </Button>
                        </Box>

                        {/* Price */}
                        <Text
                          className="font-bold text-blue-600 text-right"
                          size="small"
                        >
                          <FinalPrice options={item.options} showOriginal={false}>
                            {item.product}
                          </FinalPrice>
                        </Text>
                      </Box>
                    </Box>
                  </Box>
                );
              }}
            />
          )}
        </ProductPicker>
      ) : (
        <Box className="text-center">
          <Text className="bg-gray-50 rounded-xl py-8 px-4 text-gray-500">
            Không có sản phẩm trong giỏ hàng
          </Text>
        </Box>
      )}
    </Box>
  );
});
