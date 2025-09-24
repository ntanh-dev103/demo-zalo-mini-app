import React, { FC, Suspense, useState } from "react";
import { Box, Icon, Text } from "zmp-ui";
import { ElasticTextarea } from "components/elastic-textarea";
import { ListRenderer } from "components/list-renderer";
import { CouponPicker } from "./coupon-picker";
import { Transportation } from "./transportation";
import { TimePicker } from "./time-picker";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  orderNoteState,
  shippingMethodState,
  couponState,
  selectedFinalTotalState,
} from "state";
import { ErrorBoundary } from "components/error-boundary";

type DeliveryItem = {
  left: React.ReactNode;
  right: React.ReactNode;
};

const DeliveryContent: FC = () => {
  const [note, setNote] = useRecoilState(orderNoteState);
  const [shipping] = useRecoilState(shippingMethodState);
  const totals = useRecoilValue(selectedFinalTotalState);
  const coupon = useRecoilValue(couponState);

  const items: DeliveryItem[] = [
    {
      left: <Icon icon="zi-clock-1" className="my-auto text-blue-600" />,
      right: (
        <Box flex className="justify-between flex-none w-full">
          <Box className="flex-1 space-y-1">
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
  ];

  return (
    <Box className="px-4 pt-4 pb-24 space-y-6 border-t border-primary min-h-fit">
      {/* Delivery list */}
      <Box className="bg-white rounded-xl shadow-sm border border-primary">
        <Text.Header className="px-4 py-3 border-b border-primary text-primary font-semibold">
          Hình thức nhận hàng
        </Text.Header>
        <ListRenderer<DeliveryItem>
          items={items}
          limit={6}
          itemClassName="w-full p-6 mb-4 bg-white rounded-xl shadow hover:shadow-md hover:bg-gray-50 transition-all duration-200"
          renderLeft={(item) => item.left}
          renderRight={(item) => item.right}
        />
      </Box>

      {/* Totals */}
      <Box className="bg-white rounded-xl shadow-sm border border-primary p-6 space-y-2">
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
        <Text className="font-bold text-lg mt-2 pt-2 border-t border-gray-200 text-primary">
          Tổng thanh toán: {totals.total.toLocaleString()}₫
        </Text>
      </Box>
    </Box>
  );
};

export const Delivery: FC = () => (
  <ErrorBoundary>
    <Suspense
      fallback={
        <Box className="p-4">
          <Text>Loading...</Text>
        </Box>
      }
    >
      <DeliveryContent />
    </Suspense>
  </ErrorBoundary>
);
