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
      left: <Icon icon="zi-pin" className="text-primary" />,
      right: (
        <Box className="flex-1 flex justify-between items-center">
          <Box>
            <LocationPicker />
            <Text size="xSmall" className="text-gray">
              Nhấn để mở bản đồ
            </Text>
          </Box>
          <Icon icon="zi-chevron-right" className="text-gray flex-none" />
        </Box>
      ),
    },
    {
      left: <Icon icon="zi-clock-1" className="text-primary" />,
      right: (
        <Box className="flex-1 flex justify-between items-center">
          <Box>
            <TimePicker />
            <Text size="xSmall" className="text-gray">
              Thời gian nhận hàng
            </Text>
          </Box>
          <Icon icon="zi-chevron-right" className="text-gray flex-none" />
        </Box>
      ),
    },
    // ... repeat for người nhận, mã khuyến mãi, giao hàng
    {
      left: <Icon icon="zi-note" className="text-primary" />,
      right: (
        <ElasticTextarea
          placeholder="Nhập ghi chú..."
          className="border-none px-0 w-full focus:outline-none"
        />
      ),
    },
  ]}
  renderLeft={(item) => (
    <Box className="flex items-center px-4 py-3">{item.left}</Box>
  )}
  renderRight={(item) => (
    <Box className="flex-1 px-4 py-3 border-b last:border-b-0">
      {item.right}
    </Box>
  )}
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
