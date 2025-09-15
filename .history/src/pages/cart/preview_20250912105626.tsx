import { DisplayPrice } from "components/display/price";
import React, { FC } from "react";
import { useRecoilValue } from "recoil";
import { totalPriceState, totalQuantityState, shippingMethodState } from "state";
import pay from "utils/product";
import { Box, Button, Text } from "zmp-ui";

export const CartPreview: FC = () => {
  const quantity = useRecoilValue(totalQuantityState);
  const totalPrice = useRecoilValue(totalPriceState);
  const shipping = useRecoilValue(shippingMethodState);

  const shippingFee = shipping === "express" ? 30000 : 0;
  const finalPrice = totalPrice + shippingFee;

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
        <Text.Title size="large" color="red" className="font-semibold">
          <DisplayPrice>{finalPrice}</DisplayPrice>
        </Text.Title>
      </Box>

      <Button
        type="highlight"
        disabled={!quantity}
        fullWidth
        onClick={() => pay(finalPrice)}
        className="rounded-xl bg-blue-400 text-white py-4 text-lg font-semibold shadow-lg active:scale-95 transition flex items-center justify-center"
      >
        Đặt hàng
      </Button>
    </Box>
  );
};
