import React, { FC } from "react";
import { Box, Text } from "zmp-ui";
import { useRecoilState } from "recoil";
import { shippingMethodState } from "state";
import { useState } from "react";
import { Box, Text, Icon } from "zmp-ui";

export default function Transportation() {
  const [shipping, setShipping] = useState<"standard" | "express">("standard");

  return (
    <Box className="flex flex-col w-full space-y-2">
      <Box
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setShipping("standard")}
      >
        <Box>
          <Text size="small" className="text-blue-500 font-bold">
            Giao hàng tiêu chuẩn
          </Text>
          <Text size="xSmall" className="text-gray">
            Miễn phí
          </Text>
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
          <Text size="small" className="text-blue-500">
            Giao hàng nhanh
          </Text>
          <Text size="xSmall" className="text-gray">
            30.000đ
          </Text>
        </Box>
        {shipping === "express" && (
          <Icon icon="zi-check" className="text-blue-500" />
        )}
      </Box>
    </Box>
  );
}
