import React from "react";
import { Box, Text, Icon } from "zmp-ui";
import { useRecoilState, useRecoilValue } from "recoil";
import { shippingMethodState, totalPriceWithShippingState } from "state";

export default function Transportation() {
  const [shipping, setShipping] = useRecoilState(shippingMethodState);
  const totalPrice = useRecoilValue(totalPriceWithShippingState);

  return (
    <Box className="flex flex-col w-full space-y-2">
      {/* Shipping Options */}
      <Box
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setShipping("standard")}
      >
        <Box>
          <Text size="small" className="text-primary font-medium">
            Giao hàng tiêu chuẩn
          </Text>
          <Text size="xSmall" className="text-gray">Miễn phí</Text>
        </Box>
        {shipping === "standard" && (
          <Icon icon="zi-check" className="text-blue-500" />
        )}
      </Box>

      <Box
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setShipping("express")}
      >
        <Box>
          <Text size="small" className="text-primary font-medium">
            Giao hàng nhanh
          </Text>
          <Text size="xSmall" className="text-gray">30.000đ</Text>
        </Box>
        {shipping === "express" && (
          <Icon icon="zi-check" className="text-blue-500" />
        )}
      </Box>

      {/* Display Total
      <Box className="flex justify-between items-center mt-4">
        <Text size="small" className="text-primary font-medium">
          Tổng thanh toán
        </Text>
        <Text size="small" className="text-primary font-medium">
          {totalPrice.toLocaleString()}đ
        </Text>
      </Box> */}
    </Box>
  );
}
