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
  const [selectedItems, setSelectedItems] = useRecoilState(
    selectedCartItemsState,
  );

  const toggleSelect = (item: CartItem) => {
    const key = getItemKey(item);
    setSelectedItems((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key],
    );
  };

  const updateQuantity = (item: CartItem, delta: number) => {
    setCart((prev) =>
      prev
        .map((c) =>
          getItemKey(c) === getItemKey(item)
            ? { ...c, quantity: c.quantity + delta }
            : c,
        )
        .filter((c) => c.quantity > 0),
    );
  };

  if (cart.length === 0) {
    return (
      <Box className="text-center">
        <Text
          className="bg-background rounded-xl py-8 px-4 text-gray"
          size="xxSmall"
        >
          Không có sản phẩm trong giỏ hàng
        </Text>
      </Box>
    );
  }

  return (
    <ProductPicker product={editingItem?.product} selected={editingItem}>
      {() => (
        <ListRenderer<CartItem>
          items={cart}
          limit={5}
          renderKey={(item) => getItemKey(item)}
          itemClassName="w-full p-4 bg-white rounded-xl shadow hover:shadow-md transition-all duration-200"
          renderLeft={(item) => (
            // FIX 1: Dùng items-center hoặc items-end để kéo checkbox xuống
            <Box flex className="items-center space-x-3 h-full"> 
              <input
                type="checkbox"
                checked={selectedItems.includes(getItemKey(item))}
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
                className="w-16 h-16 object-cover rounded-md border"
                src={item.product.image}
                alt={item.product.name}
              />
            </Box>
          )}
          renderRight={(item) => (
            // BỐ CỤC CHÍNH: Flex cột để chia thành 2 hàng dọc rõ ràng
            <Box flex flexDirection="column" className="flex-1 justify-between items-start space-y-1 h-full">
              
              {/* Hàng 1: Tên, Tùy chọn, và Giá tiền */}
              <Box flex flexDirection="column" className="w-full justify-start items-start">
                {/* Tên sản phẩm */}
                <Text size="small" className="font-semibold text-blue-600 mb-1">
                  {item.product.name}
                </Text>

                {/* Tùy chọn */}
                <Text size="xxSmall" className="text-gray mb-1">
                  <DisplaySelectedOptions options={item.options}>
                    {item.product}
                  </DisplaySelectedOptions>
                </Text>
                
                {/* Giá tiền */}
                <Text
                  className="font-bold text-red-500 whitespace-nowrap"
                  size="small"
                >
                  <FinalPrice options={item.options} showOriginal={false}>
                    {item.product}
                  </FinalPrice>
                </Text>
              </Box>

              {/* Hàng 2: Số lượng (Kéo lên và căn chỉnh sang phải) */}
              {/* FIX 2: Thêm -mt-4 hoặc -mt-6 để kéo khối này lên trên */}
              <Box flex className="w-full justify-end items-center -mt-4"> 
                
                {/* Số lượng */}
                <Box flex className="items-center space-x-2">
                  <Button
                    size="small"
                    className="w-7 h-7 min-w-0 rounded-full p-0 flex items-center justify-center bg-blue-500 text-white active:bg-blue-600"
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
                    className="w-7 h-7 min-w-0 rounded-full p-0 flex items-center justify-center bg-blue-500 text-white active:bg-blue-600"
                    onClick={(e) => {
                      e.stopPropagation();
                      updateQuantity(item, +1);
                    }}
                  >
                    +
                  </Button>
                </Box>
              </Box>
            </Box>
          )}
        />
      )}
    </ProductPicker>
  );
});