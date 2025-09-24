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
    { key: "standard", label: "Giao hàng tiêu chuẩn", price: "Miễn phí" },
    { key: "express", label: "Giao hàng nhanh", price: "30.000đ" },
  ] as const;

  const selected = options.find((o) => o.key === shipping);

  const handleClick = () => {
    console.log("Transportation name clicked");
    setVisible(true);
  };

  return (
    <>
      <ListItem
        onClick={handleClick}
        title={selected ? selected.label : "Chọn phương thức vận chuyển"}
        subtitle={selected ? selected.price : "Chưa chọn"}
      />
      {onChevronClick && (
        <Box
          className="cursor-pointer absolute right-0 top-1/2 transform -translate-y-1/2"
          onClick={() => {
            console.log("Transportation chevron clicked (via prop)");
            onChevronClick();
          }}
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
              <Box className="flex justify-between items-center w-full">
                <Box>
                  <Text
                    size="small"
                    className={
                      shipping === o.key
                        ? "font-medium text-blue-500" // highlight selected label
                        : "font-medium text-gray-800" // default label
                    }
                  >
                    {o.label}
                  </Text>
                  <Text size="xSmall" className="text-gray-500">
                    {o.price}
                  </Text>
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
