import { ElasticTextarea } from "components/elastic-textarea";
import { ListRenderer } from "components/list-renderer";
import React, { FC } from "react";
import { Box, Icon, Text } from "zmp-ui";
import { RequestPersonPickerPhone } from "./person-picker";
import { Transportation } from "./transportation";
import { TimePicker } from "./time-picker";
import { useRecoilState, useRecoilValue } from "recoil";
import { LocationPicker } from "./location-picker";
import {
  orderNoteState,
  shippingMethodState,
  totalPriceState,
  totalPriceWithCouponState,
  couponState,
} from "state";
import { CouponPicker } from "./coupon-picker";

export const Delivery: FC = () => {
  const [note, setNote] = useRecoilState(orderNoteState);
  const [shipping, setShipping] = useRecoilState(shippingMethodState);

  const subtotal = useRecoilValue(totalPriceState);
  const total = useRecoilValue(totalPriceWithCouponState);
  const coupon = useRecoilValue(couponState);

  return (
    <Box className="space-y-3 px-4 pt-4 pb-20">
      <Text.Header>Hình thức nhận hàng</Text.Header>
      <ListRenderer
        items={[
          {
            left: <Icon icon="zi-pin" className="my-auto" />,
            right: <LocationPicker />,
          },
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
            left: <Icon icon="zi-exclamation" className="my-auto" />,
            right: <CouponPicker />,
          },
          {
            left: <Icon icon="zi-location" className="my-auto" />,
            right: <Transportation />,
          },
          {
            left: <Icon icon="zi-note" className="my-auto" />,
            right: (
              <Box flex>
                <ElasticTextarea
                  placeholder="Nhập ghi chú..."
                  className="border-none px-0 w-full focus:outline-none"
                  maxRows={4}
                  value={note}
                  onChange={(e) => setNote(e.currentTarget.value)}
                />
              </Box>
            ),
          },
        ]}
        limit={6}
        renderLeft={(item) => item.left}
        renderRight={(item) => item.right}
      />

      <Box className="p-4 space-y-2 border-t">
        <Text>Thành tiền: {subtotal.toLocaleString()}₫</Text>
        {coupon && (
          <Text className="text-green-600">
            Giảm giá ({coupon.code}):{" "}
            {coupon.discountType === "percent"
              ? `${coupon.value}%`
              : `-${coupon.value?.toLocaleString()}₫`}
          </Text>
          <
        )}
        <Text className="font-bold">
          Tổng thanh toán: {total.toLocaleString()}₫
        </Text>
      </Box>
    </Box>
  );
};
