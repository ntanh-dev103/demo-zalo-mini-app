import React, { FC, useState } from "react";
import { Box, Input, Icon, List, Sheet, Text } from "zmp-ui";
import { Coupon } from "state"; // make sure Coupon includes description, discountType, value
import { useRecoilState } from "recoil";
import { couponState } from "state"; 


const coupons: Coupon[] = [
  {
    code: "SALE10",
    description: "Giảm 10% cho đơn hàng",
    discountType: "percent",
    value: 10,
  },
  {
    code: "FREESHIP",
    description: "Miễn phí vận chuyển",
    discountType: "fixed",
    value: 20000,
  },
  {
    code: "VIP50",
    description: "Giảm 50% cho khách VIP",
    discountType: "percent",
    value: 50,
  },
];

export const CouponPicker: FC = () => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useRecoilState(couponState);

  const filteredCoupons = coupons.filter(
    (c) =>
      c.code.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      {/* One-line display */}
      <Box
        flex
        className="items-center justify-between py-2 cursor-pointer"
        onClick={() => setOpen(true)}
      >
        <Text className="text-primary font-medium">{selected ? selected.code : "Chọn mã khuyến mãi"}</Text>
        <Icon icon="zi-chevron-right" className="text-gray-500" />
      </Box>

      <Sheet
        visible={open}
        onClose={() => setOpen(false)}
        mask={false} 
      >
        <Box className="p-4 space-y-3">
          <Text.Title>Chọn mã khuyến mãi</Text.Title>

          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm kiếm mã khuyến mãi..."
          />

          <List>
            {filteredCoupons.map((coupon) => (
              <List.Item
                key={coupon.code}
                onClick={() => {
                  setSelected(coupon);
                  setOpen(false);
                }}
              >
                <Box className="flex justify-between items-center w-full">
                  <Box>
                    <Text className="font-semibold text-primary">{coupon.code}</Text>
                    <Text className="text-gray text-sm">
                      {coupon.description}
                    </Text>
                  </Box>
                  {selected?.code === coupon.code && (
                    <Text className="text-blue-500 font-bold">✓</Text>
                  )}
                </Box>
              </List.Item>
            ))}
          </List>
        </Box>
      </Sheet>
    </>
  );
};
