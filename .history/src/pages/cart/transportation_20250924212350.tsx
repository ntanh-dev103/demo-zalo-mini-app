import React, { FC, useState } from "react";
import { ListItem } from "components/list-item";
import { Box, Text, Icon } from "zmp-ui";
import { useRecoilState } from "recoil";
import { ActionSheet } from "components/fullscreen-sheet";
import { shippingMethodState } from "state";

interface TransportationProps {
  onChevronClick?: () => void;
}

export const Transportation: FC<TransportationProps> = ({ onChevronClick }) => {
  const [shipping, setShipping] = useRecoilState(shippingMethodState);
  const [visible, setVisible] = useState(false);

  const options = [
    {
      key: "standard",
      label: "Giao hàng tiêu chuẩn",
      price: "Miễn phí",
      priceClass: "text-green-600 font-semibold",
    },
    {
      key: "express",
      label: "Giao hàng nhanh",
      price: "30.000đ",
      priceClass: "text-blue-600 font-semibold",
    },
  ] as const;

  const selected = options.find((o) => o.key === shipping);

  return (
    <>
      <ListItem
        onClick={() => setVisible(true)}
        title={selected ? selected.label : "Chọn phương thức vận chuyển"}
        subtitle={selected ? selected.price : "Chưa chọn"}
      />

      {onChevronClick && (
        <Box
          className="cursor-pointer absolute right-0 top-1/2 -translate-y-1/2"
          onClick={onChevronClick}
        />
      )}

      <ActionSheet
        title="Chọn phương thức vận chuyển"
        visible={visible}
        onClose={() => setVisible(false)}
        actions={[
          options.map((o) => ({
            text: o.label,
            render: (
              <Box
                key={o.key}
                className="flex justify-between items-center w-full"
              >
                <Box>
                  <Text size="small" className="font-medium text-primary">
                    {o.label}
                  </Text>
                  <Text size="xSmall" className={o.priceClass}>
                    {o.price}
                  </Text>
                </Box>
                {shipping === o.key && (
                  <Icon icon="zi-check" className="text-blue-500" />
                )}
              </Box>
            ),
            close: true,
            onClick: () => setShipping(o.key),
          })),
          [{ text: "Đóng", close: true, danger: true }],
        ]}
      />
    </>
  );
};
