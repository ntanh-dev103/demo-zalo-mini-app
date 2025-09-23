
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
  const [selectedIds, setSelectedIds] = useRecoilState(selectedCartItemsState);

  const toggleSelect = (key: string) => {
    setSelectedIds((prev) =>
      prev.includes(key) ? prev.filter((id) => id !== key) : [...prev, key]
    );
  };

  const updateQuantity = (item: CartItem, delta: number) => {
    const itemKey = getItemKey(item);
    const isSelected = selectedIds.includes(itemKey);
    
    setCart((prev) => {
      const newCart = prev
        .map((c) =>
          c.product.id === item.product.id &&
          JSON.stringify(c.options) === JSON.stringify(item.options)
            ? { ...c, quantity: c.quantity + delta }
            : c
        )
        .filter((c) => c.quantity > 0); // auto-remove when 0

      // If the item was selected and got removed, remove it from selectedIds
      if (isSelected && !newCart.find(c => getItemKey(c) === itemKey)) {
        setSelectedIds(ids => ids.filter(id => id !== itemKey));
      }
        
      return newCart;
    });
  };

  return (
    <Box className="py-3 px-4 space-y-4">
      {cart.length > 0 ? (
        <ProductPicker product={editingItem?.product} selected={editingItem}>
          {({ open }) => (
            <ListRenderer
              items={cart}
              limit={5}
              // disable opening product page
              onClick={() => {}}
              renderKey={(item) => getItemKey(item)}
              renderLeft={(item) => {
                const key = getItemKey(item);
                return (
                  <Box flex className="items-start space-x-3">
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(key)}
                      onChange={(e) => {
                        e.stopPropagation();
                        toggleSelect(key);
                      }}
                      className="
                        w-5 h-5 rounded-[4px] border-2 border-gray-300 
                        appearance-none cursor-pointer transition-all duration-200
                        checked:bg-blue-500 checked:border-blue-500 
                        checked:shadow-[0_0_0_2px_white_inset]
                        hover:border-blue-400
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
                        className="w-7 h-7 min-w-0 rounded-full p-0 flex items-center justify-center
                          bg-gray-100 hover:bg-gray-200 active:bg-gray-300 text-gray-600
                          transition-colors duration-200"
                        onClick={(e) => {
                          e.stopPropagation();
                          updateQuantity(item, -1);
                        }}
                      >
                        -
                      </Button>
                      <Text 
                        className="text-primary font-medium min-w-[20px] text-center transition-all duration-200" 
                        size="small"
                      >
                        {item.quantity}
                      </Text>
                      <Button
                        size="small"
                        className="w-7 h-7 min-w-0 rounded-full p-0 flex items-center justify-center
                          bg-gray-100 hover:bg-gray-200 active:bg-gray-300 text-gray-600
                          transition-colors duration-200"
                        onClick={(e) => {
                          e.stopPropagation();
                          updateQuantity(item, +1);
                        }}
                      >
                        +
                      </Button>
                    </Box>
                    <Text className="font-semibold text-green" size="small">
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
        </Box>
      )}
    </Box>
  );
});
