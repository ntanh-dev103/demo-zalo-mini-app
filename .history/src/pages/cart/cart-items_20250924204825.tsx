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
  const [editingItem, setEditingItem] = useState<CartItem | undefined>();
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
    <Box className="py-3 px-4 pb-24 space-y-4 w-full">
      {cart.length > 0 ? (
        <ProductPicker product={editingItem?.product} selected={editingItem}>
          {() => (
            <ListRenderer
              items={cart}
              renderKey={(item) => getItemKey(item)}
              onClick={() => {}}
              renderLeft={(item) => (
                <Box flex className="items-center space-x-3">
                  <Checkbox
                    checked={selectedItems.includes(getItemKey(item))}
                    onChange={() => toggleSelect(item)}
                  />
                  <img
                    className="w-16 h-16 object-cover rounded-lg border"
                    src={item.product.image}
                    alt={item.product.name}
                  />
                </Box>
              )}
              renderRight={(item) => (
                <Box flex className="flex-1 justify-between items-start">
                  {/* Product info */}
                  <Box className="flex-1 pr-4 space-y-1">
                    <Text size="small" className="font-medium text-primary">
                      {item.product.name}
                    </Text>
                    <Text size="xxSmall" className="text-gray">
                      <DisplaySelectedOptions options={item.options}>
                        {item.product}
                      </DisplaySelectedOptions>
                    </Text>
                  </Box>

                  {/* Quantity and price */}
                  <Box flex className="items-center space-x-3">
                    <Box flex className="items-center space-x-2 bg-gray-100 rounded-full px-2">
                      <Button
                        size="small"
                        className="w-7 h-7 min-w-0 rounded-full p-0"
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
                        className="w-7 h-7 min-w-0 rounded-full p-0"
                        onClick={(e) => {
                          e.stopPropagation();
                          updateQuantity(item, +1);
                        }}
                      >
                        +
                      </Button>
                    </Box>
                    <Text
                      className="font-semibold text-blue-600 whitespace-nowrap"
                      size="small"
                    >
                      <FinalPrice options={item.options} showOriginal={false}>
                        {item.product}
                      </FinalPrice>
                    </Text>
                  </Box>
                </Box>
              )}
            />
          )}
        </ProductPicker>
      ) : (
        <Box className="text-center">
          <Text className="bg-gray-100 rounded-xl py-8 px-4 text-gray">
            Không có sản phẩm trong giỏ hàng
          </Text>
        </Box>
      )}
    </Box>
  );
});
