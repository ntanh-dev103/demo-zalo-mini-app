import React, { FC, useState } from "react";
import { Box, Input, List, Sheet, Text, Icon } from "zmp-ui";
import { useRecoilState } from "recoil";
import { couponState } from "state";

interface Coupon {
  code: string;
  description: string;
  discount: number; // percentage
}

const coupons: Coupon[] = [
  { code: "SALE10", description: "Giảm 10% cho đơn hàng", discount: 10 },
  { code: "FREESHIP", description: "Miễn phí vận chuyển", discount: 0 },
  { code: "VIP50", description: "Giảm 50% cho khách VIP", discount: 50 },
];

export const CouponPicker: FC = () => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useRecoilState(couponState);

  const filteredCoupons = coupons.filter(
    (coupon) =>
      coupon.code.toLowerCase().includes(search.toLowerCase()) ||
      coupon.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      {/* One-line display in main list */}
      <Box
        flex
        className="items-center justify-between py-2"
        onClick={() => setOpen(true)}
      >
        <Text>
  {selected ? `${selected.code} - ${selected.description}` : "Chọn mã khuyến mãi"}
</Text>
        <Icon icon="zi-chevron-right" className="text-gray-500" />
      </Box>

      {/* Popup sheet */}
      <Sheet visible={open} onClose={() => setOpen(false)}>
        <Box className="p-4 space-y-3">
          <Text.Title>Chọn mã khuyến mãi</Text.Title>

          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm kiếm mã khuyến mãi..."
          />

          {filteredCoupons.map((coupon) => (
            <List.Item
              key={coupon.code}
              onClick={() => {
                setSelected(coupon.code);
                setOpen(false);
              }}
            >
              <Box className="flex justify-between items-center w-full">
                <Box>
                  <Text className="font-semibold">{coupon.code}</Text>
                  <Text className="text-gray-500 text-sm">
                    {coupon.description}
                  </Text>
                </Box>
                {selected === coupon.code && (
                  <Text className="text-blue-500 font-bold">✓</Text>
                )}
              </Box>
            </List.Item>
          ))}
        </Box>
      </Sheet>
    </>
  );
};
