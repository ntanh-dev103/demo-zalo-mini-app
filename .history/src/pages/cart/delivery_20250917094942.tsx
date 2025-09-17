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

// Mock components (replace with actual implementations)
const MockElasticTextarea: FC<{
  placeholder: string;
  className: string;
  maxRows: number;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}> = ({ placeholder, className, maxRows, value, onChange }) => (
  <textarea
    placeholder={placeholder}
    className={className}
    maxLength={maxRows * 100}
    value={value}
    onChange={onChange}
  />
);

const MockLocationPicker: FC = () => <Text>Location Picker</Text>;
const MockTimePicker: FC = () => <Text>Time Picker</Text>;
const MockRequestPersonPickerPhone: FC = () => <Text>Person Picker</Text>;
const MockTransportation: FC = () => <Text>Transportation</Text>;
const MockCouponPicker: FC = () => <Text>Coupon Picker</Text>;

// Define list items for clarity
const deliveryOptions = [
  {
    icon: "zi-pin",
    component: <MockLocationPicker />,
  },
  {
    icon: "zi-clock-1",
    component: (
      <Box flex className="space-x-2">
        <Box className="flex-1 space-y-[2px]">
          <MockTimePicker />
          <Text size="xSmall" className="text-gray">
            Thời gian nhận hàng
          </Text>
        </Box>
        <Icon icon="zi-chevron-right" />
      </Box>
    ),
  },
  {
    icon: "zi-user",
    component: <MockRequestPersonPickerPhone />,
  },
  {
    icon: "zi-exclamation",
    component: <MockCouponPicker />,
  },
  {
    icon: "zi-location",
    component: <MockTransportation />,
  },
  {
    icon: "zi-note",
    component: (
      <MockElasticTextarea
        placeholder="Nhập ghi chú..."
        className="border-none px-0 w-full focus:outline-none"
        maxRows={4}
        value={useRecoilValue(orderNoteState)}
        onChange={(e) => useRecoilState(orderNoteState)[1](e.currentTarget.value)}
      />
    ),
  },
];

export const Delivery: FC = () => {
  const { subtotal, shippingFee, discount, total } = useRecoilValue(finalTotalState);
  const [note, setNote] = useRecoilState(orderNoteState);
  const coupon = useRecoilValue(couponState);

  return (
    <Box className="space-y-3 px-4 pt-4 pb-20 border-t border-gray-200">
      <Text.Header>Hình thức nhận hàng</Text.Header>
      <ListRenderer
        items={deliveryOptions}
        limit={6}
        renderLeft={(item) => <Icon icon={item.icon} className="my-auto" />}
        renderRight={(item) => <Box flex>{item.component}</Box>}
      />
      <Box className="p-4 space-y-2 border-t border-gray-200">
        <Text>Thành tiền: {subtotal.toLocaleString("vi-VN", { currency: "VND" })}₫</Text>
        {coupon && (
          <Text className="text-green-600">
            Giảm giá ({coupon.code || "Coupon"}):{" "}
            {coupon.discountType === "percent"
              ? `${coupon.value}%`
              : `-${discount.toLocaleString("vi-VN", { currency: "VND" })}₫`}
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

// State definitions
import { atom } from "recoil";

export const orderNoteState = atom<string>({
  key: "orderNoteState",
  default: "",
});

// Update couponState to include code
export interface Coupon {
  code: string;
  discountType: "percent" | "fixed";
  value: number;
}

export const couponState = atom<Coupon | null>({
  key: "couponState",
  default: null,
});