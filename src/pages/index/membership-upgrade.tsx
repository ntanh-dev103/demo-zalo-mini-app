import React from "react";
import { Box, Button, Text } from "zmp-ui";
import { useNavigate } from "react-router";

const MembershipUpgrade: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box className="relative p-6 rounded-2xl mt-6 mx-3 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white shadow-lg overflow-hidden">
      {/* Emoji vương miện */}
      <div className="absolute top-3 right-3 opacity-30 text-5xl">👑</div>

      <Text className="text-xl font-bold mb-2">Nâng hạng thành viên</Text>
      <Text className="text-sm opacity-90 mb-4">
        Trở thành <span className="font-semibold">VIP</span> để nhận voucher độc quyền,
        ưu đãi miễn phí vận chuyển và nhiều quà tặng hấp dẫn.
      </Text>

      <Button
        type="highlight"
        className="w-full rounded-full font-semibold shadow-md"
        onClick={() => navigate("/user/upgrade")}
      >
        Nâng cấp ngay 🚀
      </Button>
    </Box>
  );
};

export default MembershipUpgrade;
