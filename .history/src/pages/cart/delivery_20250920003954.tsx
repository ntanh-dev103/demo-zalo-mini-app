import { ElasticTextarea } from "components/elastic-textarea";
import { ListRenderer } from "components/list-renderer";
import React, { FC, Suspense, useState } from "react";
import { Box, Icon, Text } from "zmp-ui";
import { RequestPersonPickerPhone } from "./person-picker";
import { Transportation } from "./transportation";
import { TimePicker } from "./time-picker";
import { useRecoilState, useRecoilValue } from "recoil";
import { LocationPicker } from "./location-picker";
import { FinalPrice } from "untils/pr";
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
  const [timeVisible, setTimeVisible] = useState(false);
  const [couponVisible, setCouponVisible] = useState(false);
  const [noteVisible, setNoteVisible] = useState(false);

  console.log("Delivery rendered"); // Debug log for white screen

  return (
    <Box className="px-4 pt-4 pb-24 space-y-6 border-t border-primary min-h-fit">
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
                  <Box
                    className="cursor-pointer"
                    onClick={() => {
                      console.log("LocationPicker chevron clicked");
                      // Handled by LocationPicker's internal ListItem onClick
                    }}
                  >
                  </Box>
                </Box>
              ),
            },
            {
              left: <Icon icon="zi-clock-1" className="my-auto" />,
              right: (
                <Box flex className="justify-between space-x-2 flex-none">
                  <Box className="flex-1 w-full space-y-[2px]">
                    <TimePicker />
                    <Text size="xSmall" className="text-gray">
                      Thời gian nhận hàng
                    </Text>
                  </Box>
                  <Box
                    className="cursor-pointer"
                    onClick={() => {
                      console.log("TimePicker chevron clicked");
                      setTimeVisible(true);
                    }}
                  >
                  </Box>
                </Box>
              ),
            },
            {
              left: <Icon icon="zi-user" className="my-auto" />,
              right: (
                <Box flex className="justify-between space-x-2 flex-none">
                  <Box className="flex-1 w-full">
                    <RequestPersonPickerPhone />
                  </Box>
                  <Box
                    className="cursor-pointer"
                    onClick={() => {
                      console.log("RequestPersonPickerPhone chevron clicked");
                      // Handled by RequestPersonPickerPhone's internal ListItem onClick
                    }}
                  >
                  </Box>
                </Box>
              ),
            },
            {
              left: <Icon icon="zi-exclamation" className="my-auto" />,
              right: (
                <Box flex className="justify-between space-x-2 flex-none">
                  <Box className="flex-1 w-full">
                    <CouponPicker />
                  </Box>
                  <Box
                    className="cursor-pointer"
                    onClick={() => {
                      console.log("CouponPicker chevron clicked");
                      setCouponVisible(true);
                    }}
                  >
                  </Box>
                </Box>
              ),
            },
            {
              left: <Icon icon="zi-location" className="my-auto" />,
              right: (
                <Box flex className="justify-between space-x-2 flex-none">
                  <Box className="flex-1 w-full">
                    <Transportation />
                  </Box>
                  <Box
                    className="cursor-pointer"
                    onClick={() => {
                      console.log("Transportation chevron clicked");
                      // Handled by Transportation's internal ListItem onClick
                    }}
                  >
                  </Box>
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
                  </Box>
                  <Box
                    className="cursor-pointer"
                    onClick={() => {
                      console.log("ElasticTextarea chevron clicked");
                      setNoteVisible(true);
                    }}
                  >
                  </Box>
                </Box>
              ),
            },
          ]}
          limit={6}
          itemClassName="w-full min-h-[60px] overflow-hidden p-5 mb-3 bg-white rounded-lg shadow-sm hover:bg-blue-100 hover:shadow-md z-10 transition-all duration-200"
          renderLeft={(item) => item.left}
          renderRight={(item) => item.right}
        />
      </Box>

      <Box className="bg-white rounded-lg shadow-sm border border-primary p-5 space-y-2">
  <Text className="font-bold text-primary">
    Thành tiền: <FinalPrice>{totals.subtotal}</FinalPrice>
  </Text>
  {coupon && (
    <Text className="text-green">
      Giảm giá ({coupon.code}):{" "}
      {coupon.discountType === "percent"
        ? `${coupon.value}%`
        : <>-<FinalPrice>{totals.discount}</FinalPrice></>}
    </Text>
  )}
  <Text className="font-bold text-red-500">
    Phí vận chuyển: <FinalPrice>{totals.shippingFee}</FinalPrice>
  </Text>
  <Text className="font-bold text-lg mt-2 pt-2 border-t border-gray text-primary">
    Tổng thanh toán: <FinalPrice>{totals.total}</FinalPrice>
  </Text>
</Box>

    </Box>
  );
};