import React, { FC, useState } from "react";
import { Box, Input, List, Text } from "zmp-ui";

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
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<string | null>(null);

  // 🔎 Filter coupons based on search keyword
  const filteredCoupons = coupons.filter(
    (coupon) =>
      coupon.code.toLowerCase().includes(search.toLowerCase()) ||
      coupon.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box className="space-y-3">
      <Text.Title>Chọn mã khuyến mãi</Text.Title>

      {/* Search input */}
      <Input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Tìm kiếm mã khuyến mãi..."
      />

      {/* Coupon list */}
      <List>
        {filteredCoupons.length > 0 ? (
          filteredCoupons.map((coupon) => (
            <List.Item
              key={coupon.code}
              title={coupon.code}
              subTitle={coupon.description}
              suffix={
                selected === coupon.code ? (
                  <Text className="text-blue-500 font-bold">✓</Text>
                ) : null
              }
              onClick={() => setSelected(coupon.code)}
            />
          ))
        ) : (
          <Text className="text-gray">Không tìm thấy mã khuyến mãi nào</Text>
        )}
      </List>
    </Box>
  );
};
