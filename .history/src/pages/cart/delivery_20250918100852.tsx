import { ElasticTextarea } from "components/elastic-textarea";
import { ListRenderer } from "components/list-renderer";
import React, { FC, Suspense } from "react";
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

  console.log("Delivery rendered"); // Debug log for white screen

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
                <Box flex className="justify-between space-x-2 flex-none">
                  <Box className="flex-1">
                    <LocationPicker />
                  </Box>
                  <Icon icon="zi-chevron-right" className="my-auto" />
                </Box>
              ),
            },
            {
              left: <Icon icon="zi-clock-1" className="my-auto" />,
              right: (
                <Box flex className="justify-between space-x-2 flex-none">
                  <Box className="flex-1 space-y-[2px]">
                    <TimePicker />
                    <Text size="xSmall" className="text-gray">
                      Thời gian nhận hàng
                    </Text>
                  </Box>
                  <Icon icon="zi-chevron-right" className="my-auto" />
                </Box>
              ),
            },
            {
              left: <Icon icon="zi-user" className="my-auto" />,
              right: (
                <Box flex className="justify-between space-x-2 flex-none">
                  <Box className="flex-1">
                    <RequestPersonPickerPhone />
                  </Box>
                  <Icon icon="zi-chevron-right" className="my-auto" />
                </Box>
              ),
            },
            {
              left: <Icon icon="zi-exclamation" className="my-auto" />,
              right: (
                <Box flex className="justify-between space-x-2 flex-none">
                  <Box className="flex-1">
                    <CouponPicker />
                  </Box>
                  <Icon icon="zi-chevron-right" className="my-auto" />
                </Box>
              ),
            },
            {
              left: <Icon icon="zi-location" className="my-auto" />,
              right: (
                <Box flex className="justify-between space-x-2 flex-none">
                  <Box className="flex-1">
                    <Transportation />
                  </Box>
                  <Icon icon="zi-chevron-right" className="my-auto" />
                </Box>
              ),
            },
            {
              left: <Icon icon="zi-note" className="my-auto" />,
              right: (
                <Box flex className="justify-between space-x-2 flex-none">
                  <Box className="flex-1">
                    <ElasticTextarea
                      placeholder="Nhập ghi chú..."
                      className="border-none px-0 w-full focus:outline-none max-h-[100px] overflow-auto"
                      maxRows={4}
                      value={note}
                      onChange={(e) => setNote(e.currentTarget.value)}
                    />
                  </Box>
                  <Icon icon="zi-chevron-right" className="my-auto" />
                </Box>
              ),
            },
          ]}
          limit={6}
          itemClassName="w-full min-h-[60px] overflow-hidden p-5 mb-3 bg-white rounded-lg shadow-sm hover:shadow-md z-10 transition-all duration-200"
          renderLeft={(item) => item.left}
          renderRight={(item) => item.right}
        />
      </Box>

      {/* Totals section */}
      <Box className="bg-white rounded-lg shadow-sm border border-primary p-5 space-y-2">
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
