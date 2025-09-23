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
  const [, setShipping] = useRecoilState(shippingMethodState);
  const totals = useRecoilValue(selectedFinalTotalState);
  const coupon = useRecoilValue(couponState);

  const finalTotals = useMemo(
    () => ({ ...totals, total: Math.max(0, totals.total) }),
    [totals]
  );

  return (
    <Box className="px-4 pt-4 pb-24 space-y-6 border-t border-primary w-full">
      {/* Delivery method */}
      <Box className="bg-white rounded-xl shadow-md border border-primary">
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
          itemClassName="flex items-center w-full min-h-[60px] p-4 bg-white rounded-lg shadow-sm hover:bg-blue-50 hover:shadow transition duration-150"
          renderLeft={(item) => (
            <Box className="text-primary flex items-center">{item.left}</Box>
          )}
          renderRight={(item) => (
            <Box className="flex-1 flex justify-end">{item.right}</Box>
          )}
        />
      </Box>

      {/* Totals */}
      <Box className="bg-white rounded-xl shadow-md border border-primary p-5 space-y-2">
        <Text className="font-semibold text-primary">
          Thành tiền: <DisplayPrice>{totals.subtotal}</DisplayPrice>
        </Text>

        {coupon && (
          <Text className="text-green-600">
            Giảm giá ({coupon.code}):{" "}
            {coupon.discountType === "percent"
              ? `${coupon.value}%`
              : `- ${totals.discount.toLocaleString()}₫`}
          </Text>
        )}

        <Text className="font-semibold text-red-500">
          Phí vận chuyển: <DisplayPrice>{totals.shippingFee}</DisplayPrice>
        </Text>

        <Text className="font-bold text-lg pt-3 border-t border-gray-200 text-primary">
          Tổng thanh toán: <DisplayPrice>{finalTotals.total}</DisplayPrice>
        </Text>
      </Box>
    </Box>
  );
};
