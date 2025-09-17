import React, { FC } from "react";
import { Box, Text } from "zmp-ui";
import { DisplayPrice } from "components/display/price";

type CartItemProps = {
  item: any;
  selected: boolean;
  toggleItem: (item: any) => void;
};

export const CartItem: FC<CartItemProps> = ({ item, selected, toggleItem }) => {
  return (
    <Box
      key={item.product.id}
      flex
      className=""
    >
      {/* checkbox */}
      <input
        type="checkbox"
        checked={selected}
        onChange={() => toggleItem(item)}
        className="w-5 h-5 mr-3 rounded border border-gray-400 appearance-none checked:bg-blue-500 checked:border-blue-500 focus:ring-2 focus:ring-blue-300 cursor-pointer"
      />

      <img
        src={item.product.image}
        alt={item.product.name}
        className="w-16 h-16 rounded-md object-cover border mr-3"
      />

      <Box className="flex flex-col flex-1">
        <Text className="font-medium text-gray-800">{item.product.name}</Text>
        <Text className="text-blue-500 font-semibold">
          <DisplayPrice>
          {item.product.price}
        </DisplayPrice>
        </Text>
      </Box>
    </Box>
  );
};
