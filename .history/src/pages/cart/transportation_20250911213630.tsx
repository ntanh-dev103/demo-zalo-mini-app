import React, { FC, useState } from "react";
import { Box, Icon, Text } from "zmp-ui";

export const Transportation: FC = () => {
  const [shipping, setShipping] = useState<"standard" | "express">("standard");

  return (
    <Box className="space-y-3 px-4">
      <Text.Header>Phương thức vận chuyển</Text.Header>
      <Box className="flex flex-col space-y-2 w-full">
        <Box
          className={`flex justify-between items-center p-3 rounded-lg border cursor-pointer ${
            shipping === "standard"
              ? "border-blue-500 bg-blue-50"
              : "border-gray-200"
          }`}
          onClick={() => setShipping("standard")}
        >
          <Text size="small" className="font-medium">
            Giao hàng tiêu chuẩn
          </Text>
          <Text size="xSmall" className="text-gray">Miễn phí</Text>
        </Box>
        <Box
          className={`flex justify-between items-center p-3 rounded-lg border cursor-pointer ${
            shipping === "express"
              ? "border-blue-500 bg-blue-50"
              : "border-gray-200"
          }`}
          onClick={() => setShipping("express")}
        >
          <Text size="small" className="font-medium">
            Giao hàng nhanh
          </Text>
          <Text size="xSmall" className="text-green-600">30.000đ</Text>
        </Box>
      </Box>
    </Box>
  );
};
