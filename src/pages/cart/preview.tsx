import { DisplayPrice } from "components/display/price";
import React, { FC } from "react";
import { useRecoilValue } from "recoil";
import {
  selectedFinalTotalState,
  selectedCartItemsState,
  cartState,
} from "state";
import { Box, Button, Text } from "zmp-ui";
import * as zmp from "zmp-sdk"; // Import toàn bộ module như zmp
import { getItemKey } from "types/cart";

// 📢 FIX: Khai báo một hằng số mới và gán zmp đã import vào đó với type 'any'
const zmpSdk: any = zmp;


// Hàm xử lý đặt hàng và hiển thị Toast
const handlePlaceOrder = (totalAmount: number, quantity: number) => {
    if (quantity === 0) {
        // Sử dụng showToast an toàn
        zmpSdk.showToast({
            message: "Giỏ hàng trống. Vui lòng thêm sản phẩm.",
            type: "fail", 
            duration: 2000,
        });
        return;
    }

    // 1. Hiển thị thông báo đang xử lý
    zmpSdk.showToast({
        message: "Đang xử lý đơn hàng của bạn...",
        type: "loading", 
        duration: 2000,
    });
    
    // 2. Mô phỏng quá trình xử lý (ví dụ: gọi API)
    setTimeout(() => {
        // 3. Ẩn thông báo đang xử lý
        zmpSdk.hideToast(); // 📢 FIX: Gọi hàm qua zmpSdk (đã được định kiểu là any)

        // 4. Hiển thị thông báo thành công
        zmpSdk.showToast({
            message: `🎉 Đặt hàng thành công! Tổng: ${totalAmount.toLocaleString()}₫`,
            type: "success", 
            duration: 3000,
        });

        // 5. (Mô phỏng) Chuyển hướng hoặc xử lý tiếp theo
        setTimeout(() => {
            console.log("Đã hoàn tất thông báo. Tiến hành chuyển hướng...");
        }, 1000);
        
    }, 2500); 
};

export const CartPreview: FC = () => {
  const totals = useRecoilValue(selectedFinalTotalState); 
  const selectedKeys = useRecoilValue(selectedCartItemsState);
  const cart = useRecoilValue(cartState);

  const quantity = cart.reduce(
    (sum, item) =>
      selectedKeys.includes(getItemKey(item)) ? sum + item.quantity : sum,
    0
  );

  return (
    <Box className="sticky bottom-0 left-0 right-0 bg-background border-t border-primary w-screen z-50">
      <Box flex className="w-full px-4 py-3 flex items-center gap-4">
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
          onClick={() => handlePlaceOrder(totals.total, quantity)}
          className="flex-1 rounded-xl bg-blue-400 text-white py-4 text-lg font-semibold shadow-lg active:scale-95 transition flex items-center justify-center"
        >
          Đặt hàng
        </Button>
      </Box>
    </Box>
  );
};