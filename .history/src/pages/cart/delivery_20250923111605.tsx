import { ElasticTextarea } from "components/elastic-textarea";
import { ListRenderer } from "components/list-renderer";
import React, { FC } from "react";
import { Box, Icon, Text } from "zmp-ui";
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
  const [shipping] = useRecoilState(shippingMethodState); // unused setter, you can remove if not needed
  const totals = useRecoilValue(selectedFinalTotalState);
  const coupon = useRecoilValue(couponState);

  return (
    <Box className="px-4 pt-4 pb-24 space-y-6 border-t border-gray-200">
      {/* Delivery method section */}
      <Box className="bg-white rounded-lg shadow-sm border border-gray-200">
        <Text.Header className="px-4 py-3 border-b border-gray-200">
          Hình thức nhận hàng
        </Text.Header>
        <ListRenderer
          items={[
            {
              key: "location",
              left: <Icon icon="zi-pin" className="my-auto" />,
              right: <LocationPicker />,
            },
            {
              key: "time",
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
              key: "coupon",
              left: <Icon icon="zi-exclamation" className="my-auto" />,
              right: <CouponPicker />,
            },
            {
              key: "transportation",
              left: <Icon icon="zi-location" className="my-auto" />,
              right: <Transportation />,
            },
            {
              key: "note",
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
          renderKey={(item) => item.key}
          renderLeft={(item) => item.left}
          renderRight={(item) => item.right}
        />
      </Box>

      {/* Totals section */}
      <Box className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 space-y-2">
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
