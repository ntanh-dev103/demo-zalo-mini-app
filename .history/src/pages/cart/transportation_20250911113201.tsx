import { ElasticTextarea } from "components/elastic-textarea";
import { ListRenderer } from "components/list-renderer";
import React, { FC, Suspense, useState } from "react";
import { Box, Icon, Text } from "zmp-ui";
import { PersonPicker, RequestPersonPickerPhone } from "./person-picker";
import { RequestStorePickerLocation, StorePicker } from "./store-picker";
import { TimePicker } from "./time-picker";
import { useRecoilState } from "recoil";
import { orderNoteState } from "state";

export const Delivery: FC = () => {
  const [note, setNote] = useRecoilState(orderNoteState);
  const [shipping, setShipping] = useState<"standard" | "express">("standard");

  return (
    <Box className="space-y-3 px-4 pt-4 pb-20">
      <Text.Header>Hình thức nhận hàng</Text.Header>
      <ListRenderer
        items={[
          {
            left: <Icon icon="zi-location" className="my-auto" />,
            right: (
              <Suspense fallback={<RequestStorePickerLocation />}>
                <StorePicker />
              </Suspense>
            ),
          },
          {
            left: <Icon icon="zi-clock-1" className="my-auto" />,
            right: (
              <Box flex className="space-x-2">
                <Box className="flex-1 space-y-[2px]">
                  <TimePicker />
                  <Text size="xSmall" className="text-gray">
                    Thời gian nhận hàng
                  </Text>
                </Box>
                <Icon icon="zi-chevron-right" />
              </Box>
            ),
          },
          {
            left: <Icon icon="zi-user" className="my-auto" />,
            right: <RequestPersonPickerPhone />,
          },
          {
            left: <Icon icon="zi-location" className="my-auto text-blue-500" />,
            right: (
              <Box className="flex flex-col space-y-2 w-full">
                <Box
                  className={`flex justify-between items-center p-3 rounded-lg border ${
                    shipping === "standard"
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200"
                  }`}
                  onClick={() => setShipping("standard")}
                >
                  <Text size="small" className="font-medium">
                    Giao hàng tiêu chuẩn
                  </Text>
                  <Text size="xSmall" className="text-gray">Miễn phí</Text>
                </Box>
                <Box
                  className={`flex justify-between items-center p-3 rounded-lg border ${
                    shipping === "express"
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200"
                  }`}
                  onClick={() => setShipping("express")}
                >
                  <Text size="small" className="font-medium">
                    Giao hàng nhanh
                  </Text>
                  <Text size="xSmall" className="text-green-600">30.000đ</Text>
                </Box>
              </Box>
            ),
          },
          {
            left: <Icon icon="zi-note" className="my-auto" />,
            right: (
              <Box flex>
                <ElasticTextarea
                  placeholder="Nhập ghi chú..."
                  className="border-none px-0 w-full focus:outline-none"
                  maxRows={4}
                  value={note}
                  onChange={(e) => setNote(e.currentTarget.value)}
                />
              </Box>
            ),
          },
        ]}
        limit={5}
        renderLeft={(item) => item.left}
        renderRight={(item) => item.right}
      />
    </Box>
  );
};
