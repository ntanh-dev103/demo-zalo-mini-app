import React, { FC } from "react";
import { Box, Header, Icon, Page, Text, Avatar, Button } from "zmp-ui"; // ❌ bỏ IconString
import subscriptionDecor from "static/subscription-decor.svg";
import { ListRenderer } from "components/list-renderer";
import { useNavigate } from "react-router";
import { useRecoilValue } from "recoil";
import { userState } from "state";
import { normalizeTier, tierColors, tierLabels, User } from "types/user";

/* ====== User Info ====== */
const UserInfo: FC = () => {
  const user = useRecoilValue<User | null>(userState);
  const tierKey = normalizeTier(user?.tier);

  return (
    <Box className="flex flex-col items-center p-6">
      <Avatar
        src={user?.avatar ?? "https://via.placeholder.com/100"}
        size={80}
      />
      <Text.Title className="mt-3">{user?.name ?? "Khách hàng"}</Text.Title>
      {tierKey && (
        <Text className={`mt-1 font-medium ${tierColors[tierKey]}`}>
          Hạng: {tierLabels[tierKey]}
        </Text>
      )}
    </Box>
  );
};

/* ====== Subscription Banner ====== */
const Subscription: FC = () => {
  const navigate = useNavigate();
  return (
    <Box className="m-4">
      <Box
        className="bg-primary text-white rounded-xl p-4 space-y-2 cursor-pointer"
        style={{
          backgroundImage: `url(${subscriptionDecor})`,
          backgroundPosition: "right 8px center",
          backgroundRepeat: "no-repeat",
        }}
        onClick={() => navigate("/subscription")}
      >
        <Text.Title className="font-bold">Đăng ký thành viên</Text.Title>
        <Text size="xxSmall">Tích điểm đổi thưởng, mở rộng tiện ích</Text>
      </Box>
    </Box>
  );
};

/* ====== Personal Section ====== */
const Personal: FC = () => {
  const navigate = useNavigate();
  return (
    <Box className="m-4">
      <ListRenderer
        title="Cá nhân"
        items={[
          {
            left: <Icon icon="zi-user" />, // ✅ dùng trực tiếp string
            right: (
              <Box flex>
                <Text.Header className="flex-1 font-normal">
                  Thông tin tài khoản
                </Text.Header>
                <Icon icon="zi-chevron-right" />
              </Box>
            ),
            onClick: () => navigate("/account"),
          },
          {
            left: <Icon icon="zi-clock-2" />,
            right: (
              <Box flex>
                <Text.Header className="flex-1 font-normal">
                  Lịch sử đơn hàng
                </Text.Header>
                <Icon icon="zi-chevron-right" />
              </Box>
            ),
            onClick: () => navigate("/orders"),
          },
          {
            left: <Icon icon="zi-star" />, // ✅ thay icon hợp lệ
            right: (
              <Box flex>
                <Text.Header className="flex-1 font-normal">
                  Nâng hạng thành viên
                </Text.Header>
                <Icon icon="zi-chevron-right" />
              </Box>
            ),
            onClick: () => navigate("/upgrade"),
          },
        ]}
        renderLeft={(item) => item.left}
        renderRight={(item) => item.right}
      />
    </Box>
  );
};

/* ====== Other Section ====== */
const Other: FC = () => {
  const navigate = useNavigate();
  return (
    <Box className="m-4">
      <ListRenderer
        title="Khác"
        items={[
          {
            left: <Icon icon="zi-star" />,
            right: (
              <Box flex>
                <Text.Header className="flex-1 font-normal">
                  Đánh giá đơn hàng
                </Text.Header>
                <Icon icon="zi-chevron-right" />
              </Box>
            ),
            onClick: () => navigate("/reviews"),
          },
          {
            left: <Icon icon="zi-call" />,
            right: (
              <Box flex>
                <Text.Header className="flex-1 font-normal">
                  Liên hệ & góp ý
                </Text.Header>
                <Icon icon="zi-chevron-right" />
              </Box>
            ),
            onClick: () => navigate("/contact"),
          },
        ]}
        renderLeft={(item) => item.left}
        renderRight={(item) => item.right}
      />
    </Box>
  );
};

/* ====== Profile Page ====== */
const ProfilePage: FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("User logged out");
    navigate("/");
  };

  return (
    <Page className="bg-blue-50">
      <Header showBackIcon={false} title="Trang cá nhân" />
      <UserInfo />
      <Subscription />
      <Personal />
      <Other />
      <Box className="m-4">
        <Button fullWidth type="danger" onClick={handleLogout}>
          Đăng xuất
        </Button>
      </Box>
    </Page>
  );
};

export default ProfilePage;
