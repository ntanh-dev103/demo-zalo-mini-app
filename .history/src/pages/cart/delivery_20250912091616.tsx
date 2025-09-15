import { ElasticTextarea } from "components/elastic-textarea";
import { ListRenderer } from "components/list-renderer";
import React, { FC, Suspense } from "react";
import { Box, Icon, Text } from "zmp-ui";
import { PersonPicker, RequestPersonPickerPhone } from "./person-picker";
import Transportation from "./transportation";
// import { RequestStorePickerLocation, StorePicker } from "./store-picker";
import { TimePicker } from "./time-picker";
import { useRecoilState } from "recoil";
import { orderNoteState, shippingMethodState } from "state";

export const Delivery: FC = () => {
  const [note, setNote] = useRecoilState(orderNoteState);
  const [shipping, setShipping] = useRecoilState(shippingMethodState);

  const items = [
  {
    left: <Icon icon="zi-pin" className="my-auto" />,
    right: (
      <Box flex className="space-x-2">
        <Box className="flex-1 space-y-[2px]">
          <Text size="small" className="text-blue-500">
            Chọn cửa hàng
          </Text>
          <Text size="xSmall" className="text-gray">
            Yêu cầu truy cập vị trí
          </Text>
        </Box>
        <Icon icon="zi-chevron-right" />
      </Box>
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
    left: <Icon icon="zi-truck" className="my-auto" />,
    right: <Transportation />,   // 👈 plugged in here
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
];

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
