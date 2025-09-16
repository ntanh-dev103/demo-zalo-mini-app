import React, { useState } from "react";
import { Box, Button, Input, List, Text } from "zmp-ui";
import { Sheet } from "components/fullscreen-sheet";
import { useRecoilState } from "recoil";
import { couponState } from "state";

const availableCoupons = [
  { code: "SALE10", description: "Giảm 10% cho đơn hàng" },
  { code: "FREESHIP", description: "Miễn phí vận chuyển" },
  { code: "NEWUSER", description: "Giảm 50k cho khách hàng mới" },
];

export const CouponPicker: React.FC = () => {
  const [coupon, setCoupon] = useRecoilState(couponState);
  const [visible, setVisible] = useState(false);
  const [search, setSearch] = useState("");

  const applyCoupon = (code: string) => {
    setCoupon(code);
    setVisible(false);
  };

  return (
    <>
      {/* Row in Delivery page */}
      <Box
        className="flex justify-between items-center cursor-pointer py-2"
        onClick={() => setVisible(true)}
      >
        <Text className="text-primary font-medium">
          {coupon ? `Mã: ${coupon}` : "Chọn mã giảm giá"}
        </Text>
        <Text className="text-blue-500 text-sm">Chọn</Text>
      </Box>

      {/* Popup for coupons */}
      <Sheet visible={visible} onClose={() => setVisible(false)}>
        <Box className="p-4 space-y-4 max-h-[80vh] overflow-y-auto">
          <Text.Title>Chọn mã giảm giá</Text.Title>

          {/* Search / Enter coupon */}
          <Box className="flex space-x-2">
            <Input.Text
              placeholder="Nhập mã giảm giá..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button
              onClick={() => applyCoupon(search)}
              disabled={!search.trim()}
            >
              Áp dụng
            </Button>
          </Box>

          {/* Available coupons list */}
          <List>
            {availableCoupons.map((c) => (
              <List.Item
                key={c.code}
                title={c.code}
                subtitle={c.description}
                suffix={
                  <Button
                    size="small"
                    onClick={() => applyCoupon(c.code)}
                    className="text-blue-500"
                  >
                    Chọn
                  </Button>
                }
              />
            ))}
          </List>
        </Box>
      </Sheet>
    </>
  );
};
