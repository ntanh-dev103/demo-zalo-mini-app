
import { FinalPrice } from "components/display/final-price";
import { DisplayPrice } from "components/display/price";
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
  const [selectedItems, setSelectedItems] = useRecoilState(
    selectedCartItemsState
  );

  const toggleSelect = (item: CartItem) => {
    setSelectedItems((prev) => {
      const itemKey = getItemKey(item);
      return prev.includes(itemKey)
        ? prev.filter((key) => key !== itemKey)
        : [...prev, itemKey];
    });
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
    <Box className="py-3 px-4 pb-24 space-y-4 min-h-fit w-full overflow-x-hidden">
      {cart.length > 0 ? (
        <ProductPicker product={editingItem?.product} selected={editingItem}>
          {({ open, close }) => (
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
                  <Box flex className="items-start space-x-3">
                    <input
                      type="checkbox"
                      checked={selectedItems.some(
                        (i) =>
                          i.product.id === item.product.id &&
                          JSON.stringify(i.options) ===
                            JSON.stringify(item.options)
                      )}
                      onChange={(e) => {
                        e.stopPropagation();
                        toggleSelect(item);
                      }}
                      className="
                        w-5 h-5 rounded-[4px] border border-gray-400 
                        appearance-none cursor-pointer transition-all duration-200
                        checked:bg-blue-500 checked:border-blue-500 
                        checked:shadow-[0_0_0_2px_white]
                      "
                    />
                    <img
                      className="w-16 h-16 object-cover rounded-md border mr-3"
                      src={item.product.image}
                      alt={item.product.name}
                    />
                  </Box>
                );
              }}
              renderRight={(item) => (
                <Box flex className="flex-1 justify-between items-start">
                  {/* Product info */}
                  <Box className="space-y-1 flex-1 pr-4">
                    <Text size="xSmall" className="font-medium text-primary">
                      {item.product.name}
                    </Text>
                    <Text size="xxSmall" className="text-gray">
                      <DisplaySelectedOptions options={item.options}>
                        {item.product}
                      </DisplaySelectedOptions>
                    </Text>
                  </Box>

                  {/* Quantity + Price */}
                  <Box flex className="items-center space-x-3">
                    <Box flex className="items-center space-x-2">
                      <Button
                        size="small"
                        className="w-7 h-7 min-w-0 rounded-full p-0 flex items-center justify-center"
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
                        className="w-7 h-7 min-w-0 rounded-full p-0 flex items-center justify-center"
                        onClick={(e) => {
                          e.stopPropagation();
                          updateQuantity(item, +1);
                        }}
                      >
                        +
                      </Button>
                    </Box>
                    <Box flex className="flex-col items-end">
                      {/* {(item.product.sale || item.options) && (
                        <Text
                          className="line-through text-red-500"
                          size="xxxSmall"
                        >
                          <DisplayPrice>{item.product.price}</DisplayPrice>
                        </Text>
                      )} */}
                      <Text
                        className="font-semibold text-blue-600 whitespace-nowrap"
                        size="xxSmall"
                      >
                        <FinalPrice options={item.options} showOriginal={false}>
                          {item.product}
                        </FinalPrice>
                      </Text>
                    </Box>
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
        </Box>
      )}
    </Box>
  );
  }
});
