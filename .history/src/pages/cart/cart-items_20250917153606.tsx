import React, { FC, useState } from "react";
import { Box, Text, Button } from "zmp-ui";
import { DisplayPrice } from "components/display/price";
import { ListRenderer } from "components/list-renderer";
import { DisplaySelectedOptions } from "components/display/selected-options";
import { FinalPrice } from "components/display/final-price";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { cartState, toggleSelectedItemState, updateQuantityState } from "state/cart";
import { useNavigate } from "react-router-dom";

// The CartPage component brings everything together
const CartPage: FC = () => {
  const navigate = useNavigate();
  const cart = useRecoilValue(cartState);
  const toggleSelect = useSetRecoilState(toggleSelectedItemState);
  const updateQuantity = useSetRecoilState(updateQuantityState);

  // You would need to manage selectedIds state here
  const [selectedIds, setSelectedIds] = useState([]);

  // A simple way to toggle selection for a single item
  const toggleSelection = (key) => {
    setSelectedIds((prevIds) =>
      prevIds.includes(key)
        ? prevIds.filter((id) => id !== key)
        : [...prevIds, key]
    );
  };

  return (
    <Box className="bg-gray-100 min-h-screen p-4">
      <Text.Header className="mb-4">Giỏ hàng</Text.Header>
      
      {/* ListRenderer component to display cart items */}
      <ListRenderer
        items={cart}
        onClick={() => {}}
        renderKey={({ product, options, quantity }) =>
          JSON.stringify({ product: product.id, options, quantity })
        }
        renderItem={(item) => {
          const key = JSON.stringify({
            product: item.product.id,
            options: item.options,
            quantity: item.quantity,
          });

          return (
            <Box
              key={key}
              flex
              className="
                items-start justify-between mb-3 p-4 rounded-xl
                border border-gray-300 bg-white shadow-sm
                hover:shadow-md hover:border-blue-400
                transition
              "
            >
              {/* Left: Checkbox + image */}
              <Box flex className="items-start space-x-3">
                <input
                  type="checkbox"
                  checked={selectedIds.includes(key)}
                  onChange={(e) => {
                    e.stopPropagation();
                    toggleSelection(key);
                  }}
                  className="
                    w-5 h-5 rounded-[4px] border border-gray-400
                    appearance-none cursor-pointer transition-all duration-200
                    checked:bg-blue-500 checked:border-blue-500
                    checked:shadow-[0_0_0_2px_white]
                  "
                />
                <img
                  className="w-20 h-20 object-cover rounded-lg"
                  src={item.product.image}
                  alt={item.product.name}
                />
              </Box>

              {/* Right: product info + qty + price */}
              <Box flex className="flex-1 justify-between items-start">
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
                <Box flex className="items-center space-x-3">
                  {/* Quantity controls */}
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
                  <Text className="font-semibold text-green" size="small">
                    <FinalPrice options={item.options}>{item.product}</FinalPrice>
                  </Text>
                </Box>
              </Box>
            </Box>
          );
        }}
      />
    </Box>
  );
};

export default CartPage;