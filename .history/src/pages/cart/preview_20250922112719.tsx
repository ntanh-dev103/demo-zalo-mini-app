import { DisplayPrice } from "components/display/price";
import React, { FC } from "react";
import { useRecoilValue } from "recoil";
import { selectedFinalTotalState, selectedCartItemsState } from "state";
import pay from "utils/product";
import { Box, Button, Text } from "zmp-ui";

export const CartPreview: FC = () => {
  const totals = useRecoilValue(selectedFinalTotalState);
  const selectedItems = useRecoilValue(selectedCartItemsState);

  const quantity = selectedItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Box className="fixed bottom-0 left-0 right-0 bg-background border-t border-primary w-full">
      <Box
        flex
        className="px-4 py-3 mx-auto flex items-center justify-between gap-4 max-w-[600px]"
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
            <DisplayPrice>{totals.total}</DisplayPrice>
          </Text.Title>
        </Box>

        <Button
          type="highlight"
          disabled={!quantity}
          onClick={() => pay(totals.total)}
          className="flex-1 rounded-xl bg-blue-400 text-white py-4 text-lg font-semibold shadow-lg active:scale-95 transition flex items-center justify-center"
        >
          Đặt hàng
        </Button>
      </Box>
    </Box>
  );
};
