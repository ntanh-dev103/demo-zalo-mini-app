import React, { FC } from "react";
import { Box, Text } from "zmp-ui";
import { useRecoilValue } from "recoil";
import { couponState } from "state";
import { Product } from "types/product";
import { SelectedOptions } from "types/cart";
import { calcFinalPrice } from "utils/product";
import { DisplayPrice } from "./price";

export const DiscountedPrice: FC<{
  product: Product;
  options?: SelectedOptions;
}> = ({ product, options }) => {
  const coupon = useRecoilValue(couponState);
  const originalPrice = calcFinalPrice(product, options);
  const discountedPrice = coupon
    ? coupon.discountType === "percent"
      ? originalPrice * (1 - coupon.value / 100)
      : Math.max(0, originalPrice - coupon.value)
    : originalPrice;

  return (
    <Box flex className="items-center space-x-2">
      {coupon ? (
        <>
          <Text className="line-through text-red-500" size="xxSmall">
            <DisplayPrice>{originalPrice}</DisplayPrice>
          </Text>
          <Text className="text-blue-600 font-semibold" size="xxSmall">
            <DisplayPrice>{discountedPrice}</DisplayPrice>
          </Text>
        </>
      ) : (
        <Text className="text-blue-600 font-semibold" size="xxSmall">
          <DisplayPrice>{originalPrice}</DisplayPrice>
        </Text>
      )}
    </Box>
  );
};