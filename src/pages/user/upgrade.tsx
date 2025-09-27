import React, { FC } from "react";
import { Box, Button, Header, Page, Text } from "zmp-ui";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userState } from "state";
import {
  Tier,
  User,
  tierLabels,
  upgradeUserTier,
  tierOrder,
} from "types/user";

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

/* ====== Icon & màu cho từng hạng ====== */
const tierStyles: Record<Tier, { icon: string; color: string }> = {
  bronze: { icon: "🥉", color: "text-amber-700" },
  silver: { icon: "🥈", color: "text-gray-400" },
  gold: { icon: "🥇", color: "text-yellow-500" },
  diamond: { icon: "💎", color: "text-blue-400" },
};

const UpgradePage: FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useRecoilState<User | null>(userState);

  const currentTier = (user?.tier ?? "bronze") as Tier;
  const currentIndex = Math.max(0, tierOrder.indexOf(currentTier));
  const nextTier =
    currentIndex < tierOrder.length - 1 ? tierOrder[currentIndex + 1] : null;

  // Progress theo cấp độ
  const progress = ((currentIndex + 1) / tierOrder.length) * 100;

  const handleUpgrade = () => {
    if (!nextTier) {
      alert("🎉 Bạn đã ở hạng cao nhất!");
      return;
    }

    setUser((prev) => (prev ? upgradeUserTier(prev) : null));
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
          <Box className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
            <Box
              className="bg-primary h-full rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </Box>
          <Box flex className="justify-between items-center mt-3">
            <Text className="font-medium flex items-center gap-1">
              <span className={tierStyles[currentTier].color}>
                {tierStyles[currentTier].icon}
              </span>
              {tierLabels[currentTier]}
            </Text>
            <Text className="text-gray-500 text-sm">
              {nextTier ? `→ ${tierLabels[nextTier]}` : "🌟 Hạng cao nhất"}
            </Text>
          </Box>
        </Box>

        {/* Danh sách quyền lợi */}
        <Box className="space-y-4">
          {tierOrder.map((tier) => {
            const isActive = currentTier === tier;
            return (
              <Box
                key={tier}
                className={`p-4 rounded-xl shadow transition ${
                  isActive ? "border-2 border-primary bg-blue-50" : "border"
                }`}
              >
                <Text.Title className="font-bold flex items-center gap-2">
                  <span className={tierStyles[tier].color}>
                    {tierStyles[tier].icon}
                  </span>
                  {tierLabels[tier]}
                  {isActive && (
                    <span className="text-xs text-primary">(Hiện tại)</span>
                  )}
                </Text.Title>

                <ul className="list-disc ml-5 mt-2 space-y-1">
                  {tierBenefits[tier].map((benefit, i) => (
                    <li key={i}>
                      <Text size="small">{benefit}</Text>
                    </li>
                  ))}
                </ul>
              </Box>
            );
          })}
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
