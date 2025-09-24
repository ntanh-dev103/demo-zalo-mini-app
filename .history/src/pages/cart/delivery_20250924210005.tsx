import { ElasticTextarea } from "components/elastic-textarea";
import { ListRenderer } from "components/list-renderer";
import React, { FC, Suspense, useState } from "react";
import { Box, Icon, Text } from "zmp-ui";
import { Transportation } from "./transportation";
import { TimePicker } from "./time-picker";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  orderNoteState,
  shippingMethodState,
  couponState,
  selectedFinalTotalState,
} from "state";
import { CouponPicker } from "./coupon-picker";
import { DisplayPrice } from "components/display/price";

interface DeliveryItem {
  left: JSX.Element;
  right: JSX.Element;
}

import { ErrorBoundary } from "components/error-boundary";

const DeliveryContent: FC = () => {
  console.log("DeliveryContent starting render");
  
  const [note, setNote] = useRecoilState(orderNoteState);
  console.log("Note state loaded:", note);
  
  const [shipping, setShipping] = useRecoilState(shippingMethodState);
  console.log("Shipping state loaded:", shipping);
  
  const totals = useRecoilValue(selectedFinalTotalState);
  console.log("Totals loaded:", totals);
  
  const coupon = useRecoilValue(couponState);
  console.log("Coupon loaded:", coupon);
  
  const [timeVisible, setTimeVisible] = useState(false);
  const [couponVisible, setCouponVisible] = useState(false);
  const [noteVisible, setNoteVisible] = useState(false);

  console.log("Delivery rendered with state:", {
    note,
    shipping,
    totals,
    coupon,
    timeVisible,
    couponVisible,
    noteVisible
  });

  console.log("DeliveryContent about to render JSX");
  
  return (
    <Box className="px-4 pt-4 pb-24 space-y-6 border-t border-primary min-h-fit">
      {/* Delivery method section */}
      <Box className="bg-white rounded-lg shadow-sm border border-primary">
        <Text.Header className="px-4 py-3 border-b border-primary text-primary">
          Hình thức nhận hàng
        </Text.Header>
        <ListRenderer<DeliveryItem>
  items={[
    {
      left: <Icon icon="zi-clock-1" className="my-auto text-blue-600" />,
      right: (
        <Box flex className="justify-between space-x-2 flex-none">
          <Box className="flex-1 w-full space-y-1">
            <TimePicker />
            <Text size="xSmall" className="text-gray-500">
              Thời gian nhận hàng
            </Text>
          </Box>
        </Box>
      ),
    },
    {
      left: <Icon icon="zi-exclamation" className="my-auto text-orange-500" />,
      right: <CouponPicker />,
    },
    {
      left: <Icon icon="zi-location" className="my-auto text-green-600" />,
      right: <Transportation />,
    },
    {
      left: <Icon icon="zi-note" className="my-auto text-gray-500" />,
      right: (
        <ElasticTextarea
          placeholder="Nhập ghi chú..."
          className="border-none px-0 w-full focus:outline-none max-h-[100px] overflow-auto"
          maxRows={4}
          value={note}
          onChange={(e) => setNote(e.currentTarget.value)}
        />
      ),
    },
  ]}
  limit={6}
  itemClassName="w-full p-6 mb-4 bg-white rounded-xl shadow hover:shadow-md hover:bg-gray-50 transition-all duration-200"
/>

      </Box>

      {/* Totals section */}
      <Box className="bg-white rounded-lg shadow-sm border border-primary p-5 space-y-2">
        <Text className="font-bold text-primary">
          Thành tiền: {totals.subtotal.toLocaleString()}₫
        </Text>
        {coupon && (
          <Text className="text-green">
            Giảm giá ({coupon.code}):{" "}
            {coupon.discountType === "percent"
              ? `${coupon.value}%`
              : `-${totals.discount.toLocaleString()}₫`}
          </Text>
        )}
        <Text className="font-bold text-red-500">
          Phí vận chuyển: {totals.shippingFee.toLocaleString()}₫
        </Text>
        <Text className="font-bold text-lg mt-2 pt-2 border-t border-gray text-primary">
          Tổng thanh toán: {totals.total.toLocaleString()}₫
        </Text>
      </Box>
    </Box>
  );
};

export const Delivery: FC = () => {
  return (
    <ErrorBoundary>
      <Suspense fallback={
        <Box className="p-4">
          <Text>Loading...</Text>
        </Box>
      }>
        <DeliveryContent />
      </Suspense>
    </ErrorBoundary>
  );
};
