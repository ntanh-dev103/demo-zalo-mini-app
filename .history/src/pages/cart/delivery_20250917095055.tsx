import React, { FC } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { Box, Icon, Text } from "zmp-ui";
import { ListRenderer } from "components/list-renderer";
import { ElasticTextarea } from "components/elastic-textarea";
import { LocationPicker } from "./location-picker";
import { TimePicker } from "./time-picker";
import { RequestPersonPickerPhone } from "./person-picker";
import { Transportation } from "./transportation";
import { CouponPicker } from "./coupon-picker";
import {
  orderNoteState,
  shippingMethodState,
  couponState,
  finalTotalState,
} from "state";

export const Delivery: FC = () => {
  const [note, setNote] = useRecoilState(orderNoteState);
  const [shipping, setShipping] = useRecoilState(shippingMethodState);
  const coupon = useRecoilValue(couponState);
  const { subtotal, shippingFee, discount, total } = useRecoilValue(finalTotalState);

  return (
    <Box className="space-y-3 px-4 pt-4 pb-20 border-t border-gray-200">
      <Text.Header>Hình thức nhận hàng</Text.Header>
      <ListRenderer
        items={[
          { left: <Icon icon="zi-pin" className="my-auto" />, right: <LocationPicker /> },
          {
            left: <Icon icon="zi-clock-1" className="my-auto" />,
            right: (
              <Box flex className="space-x-2">
                <Box className="flex-1 space-y-0.5">
                  <TimePicker />
                  <Text size="xSmall" className="text-gray">
                    Thời gian nhận hàng
                  </Text>
                </Box>
                <Icon icon="zi-chevron-right" />
              </Box>
            ),
          },
          { left: <Icon icon="zi-user" className="my-auto" />, right: <RequestPersonPickerPhone /> },
          { left: <Icon icon="zi-exclamation" className="my-auto" />, right: <CouponPicker /> },
          { left: <Icon icon="zi-location" className="my-auto" />, right: <Transportation /> },
          {
            left: <Icon icon="zi-note" className="my-auto" />,
            right: (
              <Box flex>
                <ElasticTextarea
                  placeholder="Nhập ghi chú..."
                  className="w-full border-none px-0 focus:outline-none"
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
      <Box className="space-y-2 border-t border-gray-200 p-4">
        <Text>Thành tiền: {subtotal.toLocaleString("vi-VN", { currency: "VND" })}₫</Text>
        {coupon && (
          <Text className="text-green-600">
            Giảm giá: {coupon.discountType === "percent" ? `${coupon.value}%` : `-${discount.toLocaleString("vi-VN", { currency: "VND" })}₫`}
          </Text>
        )}
        <Text>Phí vận chuyển: {shippingFee.toLocaleString("vi-VN", { currency: "VND" })}₫</Text>
        <Text className="font-bold">
          Tổng thanh toán: {total.toLocaleString("vi-VN", { currency: "VND" })}₫
        </Text>
      </Box>
    </Box>
  );
};