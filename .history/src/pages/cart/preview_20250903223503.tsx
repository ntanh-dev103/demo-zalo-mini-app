import { DisplayPrice } from "components/display/price";
import React, { FC } from "react";
import { useRecoilValue } from "recoil";
import { totalPriceState, totalQuantityState } from "state";
import pay from "utils/product";
import { Box, Button, Text } from "zmp-ui";

export const CartPreview: FC = () => {
  const quantity = useRecoilValue(totalQuantityState);
  const totalPrice = useRecoilValue(totalPriceState);

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
        <Text.Title size="large">
          <DisplayPrice>{totalPrice}</DisplayPrice>
        </Text.Title>
      </Box>

      import { Button } from "zmp-ui";
import { ShoppingCart } from "react-feather"; // or lucide-react if installed

<Button
  type="primary"
  fullWidth
  size="large"
  disabled={!quantity}
  className="rounded-xl shadow-md bg-blue-600 text-white hover:bg-blue-700 transition-colors"
  onClick={() => pay(totalPrice)}
>
  <div className="flex items-center justify-center space-x-2">
    <ShoppingCart className="w-5 h-5" />
    <span>Đặt hàng</span>
  </div>
</Button>
      <Button
        type="highlight"
        disabled={!quantity}
        fullWidth
        onClick={() => pay(totalPrice)}
      >
        Đặt hàng
      </Button>
    </Box>
  );
};
