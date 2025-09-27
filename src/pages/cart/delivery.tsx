import React, { FC, Suspense, useState } from "react";
import { Box, Icon, Text, Radio } from "zmp-ui";
import { ElasticTextarea } from "components/elastic-textarea";
import { ListRenderer } from "components/list-renderer";
import { CouponPicker } from "./coupon-picker";
import { Transportation } from "./transportation";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  orderNoteState,
  shippingMethodState,
  couponState,
  selectedFinalTotalState,
} from "state";
import { ErrorBoundary } from "components/error-boundary";
import { LocationPicker } from "./location-picker";

type DeliveryItem = {
  left: React.ReactNode;
  right: React.ReactNode;
};

const DeliveryContent: FC = () => {
  const [note, setNote] = useRecoilState(orderNoteState);
  const [shipping] = useRecoilState(shippingMethodState);
  const totals = useRecoilValue(selectedFinalTotalState);
  const coupon = useRecoilValue(couponState);

  // state cho phương thức thanh toán
  const [paymentMethod, setPaymentMethod] = useState<"visa" | "atm" | "cod">(
    "cod"
  );

  const items: DeliveryItem[] = [
    {
      left: <Icon icon="zi-location-solid" className="my-auto text-red-500" />,
      right: <LocationPicker />,
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
    // 📌 Payment Method
    {
      left: <div className="my-auto text-blue-600">💳</div>,
      right: (
        <Box className="space-y-4">
          <Radio.Group
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e as "visa" | "atm" | "cod")}
          >
            {/* Visa */}
            <Box>
              <Radio value="visa">💳 Thẻ Visa</Radio>
              {paymentMethod === "visa" && (
                <Box className="ml-6 mt-2 p-3 border rounded-lg bg-gray-50 space-y-2">
                  <Text className="text-sm text-gray-600 font-medium">
                    Nhập thông tin thẻ Visa:
                  </Text>
                  <input
                    type="text"
                    placeholder="Số thẻ Visa"
                    className="w-full border p-2 rounded mb-2"
                  />
                  <input
                    type="text"
                    placeholder="Tên chủ thẻ"
                    className="w-full border p-2 rounded mb-2"
                  />
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      placeholder="MM/YY"
                      className="w-1/2 border p-2 rounded"
                    />
                    <input
                      type="text"
                      placeholder="CVV"
                      className="w-1/2 border p-2 rounded"
                    />
                  </div>
                </Box>
              )}
            </Box>

            {/* ATM */}
            <Box>
              <Radio value="atm">🏦 Thẻ ATM</Radio>
              {paymentMethod === "atm" && (
                <Box className="ml-6 mt-2 p-3 border rounded-lg bg-gray-50">
                  <Text className="text-sm text-gray-600 font-medium">
                    Chọn ngân hàng liên kết:
                  </Text>
                  <select className="w-full border p-2 rounded mt-2">
                    <option>Vietcombank</option>
                    <option>Techcombank</option>
                    <option>ACB</option>
                  </select>
                </Box>
              )}
            </Box>

            {/* COD */}
            <Box>
              <Radio value="cod">📦 Thanh toán khi nhận hàng (COD)</Radio>
              {paymentMethod === "cod" && (
                <Box className="ml-6 mt-2 p-3 border rounded-lg bg-gray-50">
                  <Text className="text-sm text-gray-600">
                    Bạn sẽ thanh toán trực tiếp cho nhân viên giao hàng khi
                    nhận sản phẩm.
                  </Text>
                </Box>
              )}
            </Box>
          </Radio.Group>
        </Box>
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
          itemClassName="w-full px-4 py-3 border-b last:border-b-0 bg-white"
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

        {/* Hiển thị phương thức thanh toán đã chọn */}
        <Text className="text-sm text-gray-600">
          Phương thức thanh toán:{" "}
          {paymentMethod === "visa"
            ? "Thẻ Visa"
            : paymentMethod === "atm"
            ? "Thẻ ATM"
            : "Thanh toán khi nhận hàng (COD)"}
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
