import React, { FC, useState } from "react";
import { Box, Input, List, ListItem, Sheet, Text } from "zmp-ui";

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
      <Box
        flex
        className="items-center justify-between py-2"
        onClick={() => setOpen(true)}
      >
        <Text>{selected ? selected.code : "Chọn mã khuyến mãi"}</Text>
        <Text className="text-gray-500">›</Text>
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
            {filteredCoupons.length > 0 ? (
              filteredCoupons.map((coupon) => (
                <ListItem
                  key={coupon.code}
                  title={coupon.code}
                  subTitle={coupon.description}
                  suffix={
                    selected?.code === coupon.code ? (
                      <Text className="text-blue-500 font-bold">✓</Text>
                    ) : null
                  }
                  onClick={() => {
                    setSelected(coupon);
                    setOpen(false);
                  }}
                />
              ))
            ) : (
              <Text className="text-gray">Không tìm thấy mã khuyến mãi nào</Text>
            )}
          </List>
        </Box>
      </Sheet>
    </>
  );
};
