import React, { FC } from "react";
import { Box, Text, Button } from "zmp-ui";
import { DisplayPrice } from "components/display/price";
// Assuming these components exist based on your provided code
import { DisplaySelectedOptions } from "components/display/selected-options";
import { FinalPrice } from "components/display/final-price";

type CartItemProps = {
  item: any; // The cart item object { product, options, quantity }
  selected: boolean; // Whether the item is currently selected
  toggleSelect: (key: string) => void; // Function to toggle the selection state
  updateQuantity: (item: any, delta: number) => void; // Function to update item quantity
};

export const CartItem: FC<CartItemProps> = ({
  item,
  selected,
  toggleSelect,
  updateQuantity,
}) => {
  // Generate a unique key for the item based on its product ID and options.
  // This key is used for selection management.
  const key = JSON.stringify({
    product: item.product.id,
    options: item.options,
  });

  return (
    <Box
      flex
      className="
        items-start justify-between mb-3 p-4 rounded-xl
        border border-gray-300 bg-white shadow-sm
        hover:shadow-md hover:border-blue-400
        transition
      "
    >
      {/* Left Column: Checkbox + Image */}
      <Box flex className="items-start space-x-3">
        <input
          type="checkbox"
          checked={selected}
          onChange={(e) => {
            e.stopPropagation();
            toggleSelect(key);
          }}
          className="
            w-5 h-5 mt-1 rounded-[4px] border border-gray-400 
            appearance-none cursor-pointer transition-all duration-200
            checked:bg-blue-500 checked:border-blue-500 
            focus:ring-2 focus:ring-blue-300
          "
        />
        <img
          className="w-20 h-20 object-cover rounded-lg border"
          src={item.product.image}
          alt={item.product.name}
        />
      </Box>

      {/* Right Column: Info + Quantity Controls + Price */}
      <Box flex className="flex-1 flex-col ml-4">
        {/* Product Name and Options */}
        <Box className="flex-1 mb-2">
          <Text size="large" className="font-medium text-gray-800">
            {item.product.name}
          </Text>
          <Text size="small" className="text-gray-600">
            <DisplaySelectedOptions options={item.options}>
              {item.product}
            </DisplaySelectedOptions>
          </Text>
        </Box>

        {/* Quantity Controls and Price */}
        <Box flex className="items-center justify-between">
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
            <Text className="text-gray-800 font-medium" size="large">
              {item.quantity}
            </Text>
            <Button
              size="small"
              className="w-7 h-7 min-w-0 rounded-full p-0 flex items-center justify-center"
              onClick={(e) => {
                e.stopPropagation();
                updateQuantity(item, 1);
              }}
            >
              +
            </Button>
          </Box>
          <Text className="font-semibold text-blue-500" size="large">
            <FinalPrice options={item.options}>{item.product}</FinalPrice>
          </Text>
        </Box>
      </Box>
    </Box>
  );
};