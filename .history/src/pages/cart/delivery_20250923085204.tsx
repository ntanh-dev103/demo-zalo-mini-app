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
      {/* Delivery method section */}
      <Box className="mx-4">
        <Box className="bg-white rounded-lg shadow-sm border border-primary w-full">
          <Text.Header className="px-4 py-3 border-b border-primary text-primary">
            Hình thức nhận hàng
          </Text.Header>
          <ListRenderer
            items={[
              {
                left: <Icon icon="zi-clock-1" className="my-auto" />,
                right: <TimePicker />,
              },
              {
                left: <Icon icon="zi-exclamation" className="my-auto" />,
                right: <CouponPicker />,
              },
              {
                left: <Icon icon="zi-location" className="my-auto" />,
                right: <Transportation />,
              },
              {
                left: <Icon icon="zi-note" className="my-auto" />,
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
            itemClassName="w-full min-h-[60px] overflow-hidden p-5 mb-3 bg-white rounded-lg shadow-sm hover:bg-blue-100 hover:shadow-md z-10 transition-all duration-200"
            renderLeft={(item) => item.left}
            renderRight={(item) => item.right}
          />
        </Box>

        {/* Totals section */}
        <Box className="bg-white rounded-lg shadow-sm border border-primary p-5 space-y-2 overflow-x-hidden">
          <Text className="font-bold text-primary">
            Thành tiền: <DisplayPrice>{totals.subtotal}</DisplayPrice>
          </Text>
          {coupon && (
            <Text className="text-green">
              Giảm giá ({coupon.code}):{" "}
              {coupon.discountType === "percent"
                ? `${coupon.value}%`
                : `- ${totals.discount.toLocaleString()}₫`}
            </Text>
          )}
          <Text className="font-bold text-red-500">
            Phí vận chuyển: <DisplayPrice>{totals.shippingFee}</DisplayPrice>
          </Text>
          <Text className="font-bold text-lg mt-2 pt-2 border-t border-gray text-primary">
            Tổng thanh toán: <DisplayPrice>{finalTotals.total}</DisplayPrice>
          </Text>
        </Box>
      </Box>
    </Box>
  );
};
