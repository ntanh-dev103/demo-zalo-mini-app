import { ElasticTextarea } from "components/elastic-textarea";
import { ListRenderer } from "components/list-renderer";
import React, { FC, useMemo } from "react";
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

export const Delivery: FC = () => {
  const [note, setNote] = useRecoilState(orderNoteState);
  const [shipping, setShipping] = useRecoilState(shippingMethodState);
  const totals = useRecoilValue(selectedFinalTotalState);
  const coupon = useRecoilValue(couponState);

  const finalTotals = useMemo(
    () => ({
      ...totals,
      total: Math.max(0, totals.total),
    }),
    [totals]
  );

  return (
    <Box className="px-4 pt-4 pb-24 space-y-6 border-t border-primary w-full">
  {/* Delivery method */}
  <Box className="bg-white rounded-xl shadow-md border border-primary w-full">
    <Text.Header className="px-4 py-3 border-b border-primary text-primary font-semibold">
      Hình thức nhận hàng
    </Text.Header>
    <ListRenderer
      items={[
        {
          left: <Icon icon="zi-clock-1" />,
          right: <TimePicker />,
        },
        {
          left: <Icon icon="zi-exclamation" />,
          right: <CouponPicker />,
        },
        {
          left: <Icon icon="zi-location" />,
          right: <Transportation />,
        },
        {
          left: <Icon icon="zi-note" />,
          right: (
            <ElasticTextarea
              placeholder="Nhập ghi chú..."
              className="w-full border-none px-0 focus:outline-none max-h-[100px] overflow-auto"
              maxRows={4}
              value={note}
              onChange={(e) => setNote(e.currentTarget.value)}
            />
          ),
        },
      ]}
      limit={6}
      itemClassName="flex items-center justify-between gap-3 w-full min-h-[60px] px-4 py-3 bg-white rounded-lg hover:bg-blue-50 transition"
      renderLeft={(item) => (
        <Box className="flex items-center justify-center w-8 text-primary shrink-0">
          {item.left}
        </Box>
      )}
      renderRight={(item) => (
        <Box className="flex-1 flex justify-end">{item.right}</Box>
      )}
    />
  </Box>

  {/* Totals */}
  <Box className="bg-white rounded-xl shadow-md border border-primary w-full p-5 space-y-4">
    <Box className="flex justify-between items-center">
      <Text className="font-medium text-gray-600">Thành tiền</Text>
      <Text className="font-semibold text-primary">
        <DisplayPrice>{totals.subtotal}</DisplayPrice>
      </Text>
    </Box>

    {coupon && (
      <Box className="flex justify-between items-center">
        <Text className="font-medium text-gray-600">
          Giảm giá ({coupon.code})
        </Text>
        <Text className="text-green-600 font-medium">
          {coupon.discountType === "percent"
            ? `${coupon.value}%`
            : `- ${totals.discount.toLocaleString()}₫`}
        </Text>
      </Box>
    )}

    <Box className="flex justify-between items-center">
      <Text className="font-medium text-gray-600">Phí vận chuyển</Text>
      <Text className="font-semibold text-red-500">
        <DisplayPrice>{totals.shippingFee}</DisplayPrice>
      </Text>
    </Box>

    <Box className="flex justify-between items-center border-t border-gray-200 pt-3 mt-2">
      <Text className="font-bold text-lg text-primary">Tổng thanh toán</Text>
      <Text className="font-bold text-lg text-primary">
        <DisplayPrice>{finalTotals.total}</DisplayPrice>
      </Text>
    </Box>
  </Box>
</Box>

    </Box>
  );
};
