import { FinalPrice } from "components/display/final-price";
import { DisplaySelectedOptions } from "components/display/selected-options";
import { ListRenderer } from "components/list-renderer";
import { ProductPicker } from "components/product/picker";
import React, { FC, useState } from "react";
import { useRecoilState } from "recoil";
import { cartState, selectedCartItemsState } from "state";
import { CartItem, getItemKey } from "types/cart";
import { Box, Text, Button } from "zmp-ui";

export const CartItems: FC = React.memo(() => {
  const [cart, setCart] = useRecoilState(cartState);
  const [editingItem, setEditingItem] = useState<CartItem | undefined>();
  const [selectedItems, setSelectedItems] = useRecoilState(selectedCartItemsState);

  const toggleSelect = (item: CartItem) => {
    const itemKey = getItemKey(item);
    setSelectedItems((prev) =>
      prev.includes(itemKey) ? prev.filter((key) => key !== itemKey) : [...prev, itemKey]
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
    <Box className="py-4 px-4 pb-24 space-y-4 w-full overflow-x-hidden">
      {cart.length > 0 ? (
        <ProductPicker product={editingItem?.product} selected={editingItem}>
          {() => (
            <ListRenderer
              items={cart}
              limit={5}
              onClick={() => {}}
              renderKey={(item) => getItemKey(item)}
              renderLeft={(item) => (
                <Box flex className="items-start space-x-3">
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(getItemKey(item))}
                    onChange={(e) => {
                      e.stopPropagation();
                      toggleSelect(item);
                    }}
                    className="
                      w-5 h-5 rounded-md border border-gray-300 
                      cursor-pointer transition-all duration-200
                      checked:bg-blue-600 checked:border-blue-600
                      focus:ring-2 focus:ring-blue-400
                    "
                  />
                  <img
                    className="w-16 h-16 object-cover rounded-lg border border-gray-200 shadow-sm"
                    src={item.product.image}
                    alt={item.product.name}
                  />
                </Box>
              )}
              renderRight={(item) => (
                <Box flex className="flex-1 justify-between items-start">
                  {/* Product info */}
                  <Box className="space-y-1 flex-1 pr-4">
                    <Text size="small" className="font-semibold text-gray-900">
                      {item.product.name}
                    </Text>
                    <Text size="xxSmall" className="text-gray-500">
                      <DisplaySelectedOptions options={item.options}>
                        {item.product}
                      </DisplaySelectedOptions>
                    </Text>
                  </Box>

                  {/* Quantity + Price */}
                  <Box flex className="items-center space-x-4">
                    <Box flex className="items-center space-x-2 bg-gray-100 rounded-full px-2 py-1">
                      <Button
                        size="small"
                        variant="secondary"
                        className="w-7 h-7 min-w-0 rounded-full p-0 flex items-center justify-center hover:bg-gray-200"
                        onClick={(e) => {
                          e.stopPropagation();
                          updateQuantity(item, -1);
                        }}
                      >
                        -
                      </Button>
                      <Text className="text-gray-800 font-medium" size="small">
                        {item.quantity}
                      </Text>
                      <Button
                        size="small"
                        variant="secondary"
                        className="w-7 h-7 min-w-0 rounded-full p-0 flex items-center justify-center hover:bg-gray-200"
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
          <Text className="bg-gray-50 rounded-xl py-8 px-4 text-gray-400" size="small">
            Không có sản phẩm trong giỏ hàng
          </Text>
        </Box>
      )}
    </Box>
  );
});
