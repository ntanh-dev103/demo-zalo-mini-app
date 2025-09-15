import React, { FC } from "react";
import { ListItem } from "components/list-item";
import { Box, Text, Icon } from "zmp-ui";
import { useRecoilState } from "recoil";
import { shippingMethodState } from "state";

export const Transportation: FC = () => {
  const [shipping, setShipping] = useRecoilState(shippingMethodState);

  return (
    <ListItem
      subtitle={
        <Box className="flex flex-col space-y-2 w-full">
          {/* Giao hàng tiêu chuẩn */}
          <Box
            className="flex justify-between items-center cursor-pointer"
            onClick={() => setShipping("standard")}
          >
            <Box>
              <Text
                size="small"
                className={`font-medium ${
                  shipping === "standard" ? "text-blue-500" : "text-primary"
                }`}
              >
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

          {/* Giao hàng nhanh */}
          <Box
            className="flex justify-between items-center cursor-pointer"
            onClick={() => setShipping("express")}
          >
            <Box>
              <Text
                size="small"
                className={`font-medium ${
                  shipping === "express" ? "text-blue-500" : "text-primary"
                }`}
              >
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
      }
    />
  );
};
