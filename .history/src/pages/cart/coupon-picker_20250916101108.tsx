import React, { FC, useState } from "react";
import { Box, Input, List, Sheet, Text } from "zmp-ui";

interface Coupon {
  code: string;
  description: string;
}

const coupons: Coupon[] = [
  { code: "SALE10", description: "Giảm 10% cho đơn hàng" },
  { code: "FREESHIP", description: "Miễn phí vận chuyển" },
  { code: "VIP50", description: "Giảm 50% cho khách VIP" },
];

export const CouponPicker: FC = () => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Coupon | null>(null);

  const filteredCoupons = coupons.filter(
    (coupon) =>
      coupon.code.toLowerCase().includes(search.toLowerCase()) ||
      coupon.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      {/* One-line display in main list */}
      <Box flex className="items-center justify-between py-2" onClick={() => setOpen(true)}>
  <span className="text-base ">{selected ? selected.code : "Chọn mã khuyến mãi"}</span>
  <span className="text-gray-500 text-lg">›</span>
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
                    <span className="block font-semibold text-primary">
                      {coupon.code}
                    </span>
                    <span className="block text-sm text-gray">
                      {coupon.description}
                    </span>
                  </Box>

                  {selected?.code === coupon.code && (
                    <span className="text-primary font-bold">✓</span>
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
