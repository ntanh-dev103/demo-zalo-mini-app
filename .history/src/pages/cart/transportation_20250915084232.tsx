import React, { FC, useState } from "react";
import { ListItem } from "components/list-item";
import { Box, Text, Icon} from "zmp-ui";
import { useRecoilState } from "recoil";
import { ActionSheet } from "components/fullscreen-sheet";
import { shippingMethodState } from "state";

export const Transportation: FC = () => {
  const [shipping, setShipping] = useRecoilState(shippingMethodState);
  const [visible, setVisible] = useState(false);

  const options = [
    { key: "standard", label: "Giao hàng tiêu chuẩn", price: "Miễn phí" },
    { key: "express", label: "Giao hàng nhanh", price: "30.000đ" },
  ] as const;

  const selected = options.find((o) => o.key === shipping);

  return (
    <>
      <ListItem
        onClick={() => setVisible(true)}
        title={selected ? selected.label : "Chọn phương thức vận chuyển"}
        subtitle={selected ? selected.price : "Chưa chọn"}
      />

      <ActionSheet
        title="Chọn phương thức vận chuyển"
        visible={visible}
        onClose={() => setVisible(false)}
        actions={[
  options.map((o) => ({
    text: o.label, // required string (for type safety)
    render: (
      <Box className="flex justify-between items-center w-full">
        <Box>
          <Text size="small" color="" className="font-medium text-primary">
            {o.label}
          </Text>
          <Text size="xSmall" className="text-gray">{o.price}</Text>
        </Box>
        {shipping === o.key && (
          <Icon icon="zi-check" className="text-blue-500" />
        )}
      </Box>
    ),
    close: true,
    onClick: () => setShipping(o.key as "standard" | "express"),
  })),
  [{ text: "Đóng", close: true, danger: true }],
]}

      />
    </>
  );
};
