import React, { FC, useMemo } from "react";
import { SelectedOptions } from "types/cart";
import { Product } from "types/product";
import { calcFinalPrice } from "utils/product";
import { DisplayPrice } from "./price";
import { Box, Text } from "zmp-ui";

export const FinalPrice: FC<{
  children: Product;
  options?: SelectedOptions;
  showOriginal?: boolean;
}> = ({ children, options, showOriginal = true }) => {
  const finalPrice = useMemo(
    () => calcFinalPrice(children, options),
    [children, options],
  );
  const originalPrice = children.price;
  const hasDiscount = finalPrice < originalPrice;

  return (
    <Box flex className="items-center space-x-2">
      {showOriginal && hasDiscount && (
        <Text className="line-through text-red-500" size="xxxSmall">
          <DisplayPrice>{originalPrice}</DisplayPrice>
        </Text>
      )}
      <Text 
        className={hasDiscount ? "text-green-500 font-semibold" : ""} 
        size="xxSmall"
      >
        <DisplayPrice>{finalPrice}</DisplayPrice>
      </Text>
    </Box>
  );
};
