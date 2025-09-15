import React, { FC } from "react";
import { Box, Text, Icon } from "zmp-ui";

export const Transportation: FC = () => {
  return (
    <Box className="bg-white p-4 space-y-3">
      <Text className="font-medium">Phương thức vận chuyển</Text>

      <Box className="flex items-center justify-between p-3 rounded-lg border border-gray-200">
        <Box className="flex items-center space-x-2">
          <Icon icon="zi-location" className="text-blue-500" />
          <Box>
            <Text size="small" className="font-medium">
              Giao hàng tiêu chuẩn
            </Text>
            <Text size="xSmall" className="text-gray">
              2-3 ngày làm việc
            </Text>
          </Box>
        </Box>
        <Text size="small" className="text-blue-500 font-medium">Miễn phí</Text>
      </Box>

      <Box className="flex items-center justify-between p-3 rounded-lg border border-gray-200">
        <Box className="flex items-center space-x-2">
          <Icon icon="zi-" className="text-green-500" />
          <Box>
            <Text size="small" className="font-medium">
              Giao hàng nhanh
            </Text>
            <Text size="xSmall" className="text-gray">
              Trong ngày (trước 18:00)
            </Text>
          </Box>
        </Box>
        <Text size="small" className="text-green-600 font-medium">30.000đ</Text>
      </Box>
    </Box>
  );
};
