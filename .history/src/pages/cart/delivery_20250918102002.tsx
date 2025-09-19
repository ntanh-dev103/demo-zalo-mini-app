import { ElasticTextarea } from "components/elastic-textarea";
import { ListRenderer } from "components/list-renderer";
import React, { FC, Suspense, useState } from "react";
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
  const [locationVisible, setLocationVisible] = useState(false);
  const [timeVisible, setTimeVisible] = useState(false);
  const [personVisible, setPersonVisible] = useState(false);
  const [couponVisible, setCouponVisible] = useState(false);

  console.log("Delivery rendered"); // Debug log for white screen

  return (
    <Box className="px-4 pt-4 pb-24 space-y-6 border-t border-primary overflow-y-auto">
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
                  <Box className="flex-1 w-full">
                    <LocationPicker />
                  </Box>
                  <Icon icon="zi-chevron-right" className="my-auto text-gray-500" />
                </Box>
              ),
            },
            {
              left: <Icon icon="zi-clock-1" className="my-auto" />,
              right: (
                <Box flex className="justify-between space-x-2 flex-none">
                  <Box className="flex-1 w-full space-y-[2px]">
                    <TimePicker />
                    {console.log("TimePicker rendered")}
                    <Text size="xSmall" className="text-gray">
                      Thời gian nhận hàng
                    </Text>
                  </Box>
                  <Icon icon="zi-chevron-right" className="my-auto text-gray-500" />
                </Box>
              ),
            },
            {
              left: <Icon icon="zi-user" className="my-auto" />,
              right: (
                <Box flex className="justify-between space-x-2 flex-none">
                  <Box className="flex-1 w-full">
                    <RequestPersonPickerPhone />
                    {console.log("RequestPersonPickerPhone rendered")}
                  </Box>
                  <Icon icon="zi-chevron-right" className="my-auto text-gray-500" />
                </Box>
              ),
            },
            {
              left: <Icon icon="zi-exclamation" className="my-auto" />,
              right: (
                <Box flex className="justify-between space-x-2 flex-none">
                  <Box className="flex-1 w-full">
                    <CouponPicker />
                    {console.log("CouponPicker rendered")}
                  </Box>
                  <Icon icon="zi-chevron-right" className="my-auto text-gray-500" />
                </Box>
              ),
            },
            {
              left: <Icon icon="zi-location" className="my-auto" />,
              right: (
                <Box flex className="justify-between space-x-2 flex-none">
                  <Box className="flex-1 w-full">
                    <Transportation />
                    {console.log("Transportation rendered")}
                  </Box>
                  <Icon icon="zi-chevron-right" className="my-auto text-gray-500" />
                </Box>
              ),
            },
            {
              left: <Icon icon="zi-note" className="my-auto" />,
              right: (
                <Box flex className="justify-between space-x-2 flex-none">
                  <Box className="flex-1 w-full">
                    <ElasticTextarea
                      placeholder="Nhập ghi chú..."
                      className="border-none px-0 w-full focus:outline-none max-h-[100px] overflow-auto"
                      maxRows={4}
                      value={note}
                      onChange={(e) => setNote(e.currentTarget.value)}
                    />
                    {console.log("ElasticTextarea rendered")}
                  </Box>
                  <Icon icon="zi-chevron-right" className="my-auto text-gray-500" />
                </Box>
              ),
            },
          ]}
          limit={6}
          itemClassName="w-full min-h-[60px] p-5 mb-3 bg-white rounded-lg shadow-sm hover:bg-blue-100 hover:shadow-md z-10 transition-all duration-200"
          renderLeft={(item) => item.left}
          renderRight={(item) => item.right}
          onClick={(item, index) => {
            console.log(`Item ${index} clicked`); // Debug log
            switch (index) {
              case 0:
                setLocationVisible(true);
                break;
              case 1:
                setTimeVisible(true);
                break;
              case 2:
                setPersonVisible(true);
                break;
              case 3:
                setCouponVisible(true);
                break;
              case 4:
                // Transportation already handles its ActionSheet
                break;
              case 5:
                // ElasticTextarea doesn't need a picker
                break;
            }
          }}
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