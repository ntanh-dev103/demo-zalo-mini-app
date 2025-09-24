import React, { FC, useState } from "react";
import { Box, Icon, Text } from "zmp-ui";
import { ElasticTextarea } from "components/elastic-textarea";
import { CouponPicker } from "./coupon-picker";
import { Transportation } from "./transportation";
import { TimePicker } from "./time-picker";
import { ListRenderer } from "components/list-renderer";

type DeliveryItem = {
  left: React.ReactNode;
  right: React.ReactNode;
};

const Delivery: FC = () => {
  const [note, setNote] = useState("");

  return (
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
  );
};

export default Delivery;
