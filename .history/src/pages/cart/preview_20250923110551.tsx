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
      className="sticky bottom-0 bg-background p-4 space-x-4 border-t border-gray-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]"
    >
      <Box
        flex
        flexDirection="column"
        justifyContent="space-between"
        className="min-w-[120px] flex-none"
      >
        <Text className="text-gray" size="xSmall">
          {quantity} sản phẩm
        </Text>
        <Text.Title size="large" className="font-semibold text-primary">
          <DisplayPrice>{total}</DisplayPrice>
        </Text.Title>
      </Box>

      <Button
        type="highlight"
        disabled={!quantity}
        fullWidth
        onClick={() => pay(total)}
        className="rounded-xl bg-blue-500 text-white py-4 text-lg font-semibold shadow-lg 
          active:scale-95 transition flex items-center justify-center
          hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        Đặt hàng
      </Button>
    </Box>
  );
};
