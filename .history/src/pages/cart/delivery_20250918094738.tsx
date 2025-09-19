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
  couponState,
  selectedFinalTotalState,
} from "state";
import { CouponPicker } from "./coupon-picker";

export const Delivery: FC = () => {
  const [note, setNote] = useRecoilState(orderNoteState);
  const [shipping, setShipping] = useRecoilState(shippingMethodState);
  const totals = useRecoilValue(selectedFinalTotalState);
  const coupon = useRecoilValue(couponState);

  return (
    <Box className="px-4 pt-4 pb-24 space-y-6 border-t border-primary">
      {/* Delivery method section */}
      <Box className="bg-white rounded-lg shadow-sm border border-primary">
        <Text.Header className="px-4 py-3 border-b border-primary text-primary">
          Hình thức nhận hàng
        </Text.Header>
        <ListRenderer
          items={[
            {
              left: <Icon icon="zi-pin" className="my-auto" />,
              right: (
                <Box flex items-center justify-between className="w-full">
                  <LocationPicker />
                  <Icon icon="zi-chevron-right" className="ml-2 flex-none" />
                </Box>
              ),
            },
            {
              left: <Icon icon="zi-clock-1" className="my-auto" />,
              right: (
                <Box flex items-center justify-between className="w-full">
                  <Box className="flex-1 overflow-hidden">
                    <TimePicker />
                    <Text size="xSmall" className="text-gray truncate">
                      Thời gian nhận hàng
                    </Text>
                  </Box>
                  <Icon icon="zi-chevron-right" className="ml-2 flex-none" />
                </Box>
              ),
            },
            {
              left: <Icon icon="zi-user" className="my-auto" />,
              right: (
                <Box flex items-center justify-between className="w-full">
                  <RequestPersonPickerPhone />
                  <Icon icon="zi-chevron-right" className="ml-2 flex-none" />
                </Box>
              ),
            },
            {
              left: <Icon icon="zi-exclamation" className="my-auto" />,
              right: (
                <Box flex items-center justify-between className="w-full">
                  <CouponPicker />
                  <Icon icon="zi-chevron-right" className="ml-2 flex-none" />
                </Box>
              ),
            },
            {
              left: <Icon icon="zi-location" className="my-auto" />,
              right: (
                <Box flex items-center justify-between className="w-full">
                  <Transportation />
                  <Icon icon="zi-chevron-right" className="ml-2 flex-none" />
                </Box>
              ),
            },
            {
              left: <Icon icon="zi-note" className="my-auto" />,
              right: (
                <Box flex className="w-full">
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
      </Box>

      {/* Totals section */}
      <Box className="bg-white rounded-lg shadow-sm border border-primary p-4 space-y-2">
        <Text className="font-bold text-primary">
          Thành tiền: {totals.subtotal.toLocaleString()}₫
        </Text>
        {coupon && (
          <Text className="text-green-600">
            Giảm giá ({coupon.code}):{" "}
            {coupon.discountType === "percent"
              ? `${coupon.value}%`
              : `-${totals.discount.toLocaleString()}₫`}
          </Text>
        )}
        <Text className="text-red-500 font-bold">
          Phí vận chuyển: {totals.shippingFee.toLocaleString()}₫
        </Text>
        <Text className="font-bold text-lg mt-2 pt-2 border-t border-gray text-primary">
          Tổng thanh toán: {totals.total.toLocaleString()}₫
        </Text>
      </Box>
    </Box>
  );
};
