import { DisplayPrice } from "components/display/price";
import React, { FC } from "react";
import { useRecoilValue } from "recoil";
import {
  selectedFinalTotalState,
  selectedCartItemsState,
} from "state";
import pay from "utils/product";
import { Box, Button, Text } from "zmp-ui";

export const CartPreview: FC = () => {
  const { subtotal, shippingFee, discount, total } = useRecoilValue(selectedFinalTotalState);
  const selectedItems = useRecoilValue(selectedCartItemsState);

  const quantity = selectedItems.length; // number of checked items

  return (
    <Box
      flex
      className="sticky bottom-0 bg-white border-t border-gray-200 p-4 shadow-lg z-50"
    >
      {/* Left: quantity + total */}
      <Box
        flex
        flexDirection="column"
        justifyContent="center"
        className="min-w-[120px] flex-none"
      >
        <Text className="text-gray-500" size="xSmall">
          {quantity} sản phẩm
        </Text>
        <Text.Title size="large" className="font-bold text-primary">
          <DisplayPrice>{total}</DisplayPrice>
        </Text.Title>
      </Box>

      {/* Right: button */}
      <Box className="flex-1 flex items-center justify-end">
        <Button
          type="highlight"
          disabled={!quantity}
          fullWidth
          onClick={() => pay(total)}
          className="rounded-lg bg-blue-500 hover:bg-blue-600 text-white py-4 text-lg font-semibold shadow-md active:scale-95 transition"
        >
          Đặt hàng
        </Button>
      </Box>
    </Box>
  );
};
