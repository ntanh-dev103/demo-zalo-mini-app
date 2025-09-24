import React, { FC } from "react";
import { Box, Button, Header, Page, Text } from "zmp-ui";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userState } from "state";
import { Tier, User, tierLabels } from "types/user";

/* ====== Thứ tự nâng hạng ====== */
const upgradeOrder: Record<Tier, Tier | null> = {
  bronze: "silver",
  silver: "gold",
  gold: "diamond",
  diamond: null,
};

/* ====== Quyền lợi mỗi hạng ====== */
const tierBenefits: Record<Tier, string[]> = {
  bronze: ["Tham gia chương trình tích điểm cơ bản"],
  silver: [
    "Tích điểm nhanh hơn 1.2x",
    "Ưu đãi vận chuyển 5%",
    "Tham gia ưu đãi thành viên Bạc",
  ],
  gold: [
    "Tích điểm nhanh hơn 1.5x",
    "Ưu đãi vận chuyển 10%",
    "Voucher giảm giá sinh nhật",
  ],
  diamond: [
    "Tích điểm nhanh hơn 2x",
    "Ưu đãi vận chuyển 20%",
    "Ưu tiên hỗ trợ 24/7",
    "Quà tặng đặc biệt hàng tháng",
  ],
};

const tiers: Tier[] = ["bronze", "silver", "gold", "diamond"];

const UpgradePage: FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useRecoilState<User | null>(userState);

  // Ép kiểu Tier cho currentTier (nếu user?.tier undefined thì mặc định bronze)
  const currentTier = (user?.tier ?? "bronze") as Tier;
  const nextTier = upgradeOrder[currentTier];

  // Index để tính progress
  const currentIndex = Math.max(0, tiers.indexOf(currentTier));
  const progress = ((currentIndex + 1) / tiers.length) * 100;

  const handleUpgrade = () => {
    if (!nextTier) {
      alert("🎉 Bạn đã ở hạng cao nhất!");
      return;
    }

    // Nếu chưa có user thì tạo guest user tạm và gán tier mới
    if (!user) {
      const guestUser: User = {
        id: `guest_${Math.random().toString(36).slice(2, 9)}`,
        name: "Khách hàng",
        avatar: "https://via.placeholder.com/100",
        tier: nextTier,
        role: "customer",
      };
      setUser(guestUser);
    } else {
      // Dùng updater để an toàn (tránh race condition)
      setUser((prev) => (prev ? { ...prev, tier: nextTier } : prev));
    }

    alert(`🎉 Chúc mừng! Bạn đã được nâng lên hạng ${tierLabels[nextTier]}`);
    navigate("/profile");
  };

  return (
    <Page>
      <Header title="Nâng hạng thành viên" onBackClick={() => navigate(-1)} />

      <Box className="p-4 space-y-6">
        {/* Thanh tiến trình */}
        <Box className="bg-white rounded-lg p-4 shadow">
          <Text.Title className="font-bold mb-3">Tiến trình hạng</Text.Title>
          <Box className="w-full bg-gray-100 rounded-full h-4 overflow-hidden">
            <Box
              className="bg-primary h-full rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </Box>
          <Box flex className="justify-between items-center mt-3">
            <Text className="font-medium text-primary">
              {tierLabels[currentTier]}
            </Text>
            <Text className="text-gray">
              {nextTier ? `→ ${tierLabels[nextTier]}` : "🌟 Đã đạt hạng cao nhất"}
            </Text>
          </Box>
        </Box>

        {/* Danh sách quyền lợi các hạng */}
        <Box className="space-y-4">
          {tiers.map((tier) => (
            <Box
              key={tier}
              className={`p-4 rounded-xl shadow ${
                currentTier === tier ? "border-2 border-blue-500" : "border"
              }`}
            >
              <Text.Title className="font-bold">{tierLabels[tier]}</Text.Title>
              <ul className="list-disc ml-5 mt-2 space-y-1">
                {tierBenefits[tier].map((benefit, i) => (
                  <li key={i}>
                    <Text size="small">{benefit}</Text>
                  </li>
                ))}
              </ul>
            </Box>
          ))}
        </Box>

        {/* Nút nâng hạng */}
        <Button
          fullWidth
          onClick={handleUpgrade}
          type={nextTier ? "highlight" : "neutral"}
          disabled={!nextTier}
        >
          {nextTier ? "🚀 Nâng hạng ngay" : "✅ Đã đạt hạng cao nhất"}
        </Button>
      </Box>
    </Page>
  );
};

export default UpgradePage;
