import React, { FC } from "react";
import { Box, Text } from "zmp-ui";
import { useRecoilState } from "recoil";
import { shippingMethodState } from "state";

export const Transportation: FC = () => {
  const [shipping, setShipping] = useRecoilState(shippingMethodState);

  return (
    <Box className="space-y-3 px-4 pt-4 pb-20">
      <Text.Header>Hình thức nhận hàng</Text.Header>
      <ListRenderer
        items={[
          // {
          //   left: <Icon icon="zi-location" className="my-auto" />,
          //   right: (
          //     <Suspense fallback={<RequestStorePickerLocation />}>
          //       <StorePicker />
          //     </Suspense>
          //   ),
          // },
          {
            left: <Icon icon="zi-clock-1" className="my-auto" />,
            right: (
              <Box flex className="space-x-2">
                <Box className="flex-1 space-y-[2px]">
                  <TimePicker />
                  <Text size="xSmall" className="text-gray">
                    Thời gian nhận hàng
                  </Text>
                </Box>
                <Icon icon="zi-chevron-right" />
              </Box>
            ),
          },
          {
            left: <Icon icon="zi-user" className="my-auto" />,
            right: <RequestPersonPickerPhone />,
          },
          {
  left: <Icon icon="zi-location" className="my-auto" />, // or any truck-like icon
  right: (
    <Box className="flex flex-col w-full space-y-2">
      <Box
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setShipping("standard")}
      >
        <Box>
          <Text size="large" className="text-primary font-medium">
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
          <Text size="large" className="text-primary font-medium">
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
};
