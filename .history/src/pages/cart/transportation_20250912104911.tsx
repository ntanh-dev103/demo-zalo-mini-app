import React, { useEffect } from "react";
import { Box, Text, Icon } from "zmp-ui";
import { useRecoilState } from "recoil";
import { shippingMethodState, totalPriceState } from "state";

export default function Transportation() {
  const [shipping, setShipping] = useRecoilState(shippingMethodState);
  const [totalPrice, setTotalPrice] = useRecoilState(totalPriceState);

  useEffect(() => {
    if (shipping === "standard") {
      setTotalPrice(prev => prev - 30000); // remove express fee if previously selected
    } else if (shipping === "express") {
      setTotalPrice(prev => prev + 30000); // add express fee
    }
  }, [shipping]);

  return (
    <Box className="flex flex-col w-full space-y-2">
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
        {shipping === "standard" && <Icon icon="zi-check" className="text-blue-500" />}
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
        {shipping === "express" && <Icon icon="zi-check" className="text-blue-500" />}
      </Box>
    </Box>
  );
}
