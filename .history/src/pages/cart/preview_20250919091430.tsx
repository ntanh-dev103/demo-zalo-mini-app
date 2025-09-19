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

  const quantity = selectedItems.length; 

  return (
    <Box flex className="sticky bottom-0 bg-background p-4 space-x-4">
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
        className="rounded-xl bg-blue-400 text-white py-4 text-lg font-semibold shadow-lg active:scale-95 transition flex items-center justify-center"
      >
        Đặt hàng
      </Button>
    </Box>
  );
};
