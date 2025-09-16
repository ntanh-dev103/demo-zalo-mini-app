import React, { FC, useState } from "react";
import { Box, List, Text } from "zmp-ui";
import { useRecoilState } from "recoil";
import { couponState, Coupon } from "state";

export const CouponPicker: FC = () => {
  const [selectedCoupon, setSelectedCoupon] = useRecoilState(couponState);
  const [open, setOpen] = useState(false);

  // Example coupons
  const coupons: Coupon[] = [
    { code: "SALE10", description: "Giảm 10% tổng đơn", discountType: "percent", value: 10 },
    { code: "SHIPFREE", description: "Miễn phí vận chuyển", discountType: "fixed", value: 30000 },
  ];

  const handleSelect = (coupon: Coupon) => {
    setSelectedCoupon(coupon);
    setOpen(false);
  };

  return (
    <Box>
      {/* Trigger */}
      <List.Item
        title={selectedCoupon ? selectedCoupon.code : "Chọn mã khuyến mãi"}
        subTitle={selectedCoupon ? selectedCoupon.description : "Không có mã"}
        suffix={<Text className="text-gray-500 text-lg">›</Text>}
        onClick={() => setOpen(true)}
      />

      {/* Popup sheet */}
      {open && (
        <Box className="fixed inset-0 bg-black/40 flex items-end">
          <Box className="bg-white rounded-t-2xl w-full p-4 max-h-[70%] overflow-y-auto">
            <Text className="font-semibold text-lg mb-3">Chọn mã khuyến mãi</Text>
            <List>
              {coupons.map((c) => (
                <List.Item
                  key={c.code}
                  title={c.code}
                  subTitle={c.description}
                  onClick={() => handleSelect(c)}
                  suffix={selectedCoupon?.code === c.code ? "✓" : undefined}
                />
              ))}
            </List>
            <Box className="mt-3 text-center">
              <Text className="text-blue-500" onClick={() => setOpen(false)}>
                Đóng
              </Text>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};
