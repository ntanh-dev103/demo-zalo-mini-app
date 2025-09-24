import React, { FC } from "react";
import { Box, Header, Icon, Page, Text, Avatar, Button } from "zmp-ui"; 
import subscriptionDecor from "static/subscription-decor.svg";
import { ListRenderer } from "components/list-renderer";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { userState } from "state";
import { normalizeTier, tierColors, tierLabels, User } from "types/user";

/* ====== User Info ====== */
const UserInfo: FC = () => {
  const user = useRecoilValue<User | null>(userState);
  const tierKey = normalizeTier(user?.tier);

  if (!user) {
    return (
      <Box className="flex flex-col items-center p-6">
        <Avatar src="https://via.placeholder.com/100" size={80} />
        <Text.Title className="mt-3">Khách hàng</Text.Title>
        <Button
  className="mt-3"
  type="highlight"
  onClick={() => console.log("Đi đến đăng nhập")}
>
  Đăng nhập
</Button>

      </Box>
    );
  }

  return (
    <Box className="flex flex-col items-center p-6">
      <Avatar
        src={user.avatar ?? "https://via.placeholder.com/100"}
        size={80}
      />
      <Text.Title className="mt-3">{user.name}</Text.Title>
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
  const items = [
    {
      key: "account",
      left: <Icon icon="zi-user" />,
      right: (
        <Box flex>
          <Text.Header className="flex-1 font-normal">
            Thông tin tài khoản
          </Text.Header>
          <Icon icon="zi-chevron-right" />
        </Box>
      ),
    },
    {
      key: "orders",
      left: <Icon icon="zi-clock-2" />,
      right: (
        <Box flex>
          <Text.Header className="flex-1 font-normal">
            Lịch sử đơn hàng
          </Text.Header>
          <Icon icon="zi-chevron-right" />
        </Box>
      ),
    },
    {
      key: "upgrade",
      left: <Icon icon="zi-star" />,
      right: (
        <Box flex>
          <Text.Header className="flex-1 font-normal">
            Nâng hạng thành viên
          </Text.Header>
          <Icon icon="zi-chevron-right" />
        </Box>
      ),
    },
  ];

  return (
    <Box className="m-4">
      <ListRenderer
        title="Cá nhân"
        items={items}
        renderKey={(item) => item.key}
        renderLeft={(item) => item.left}
        renderRight={(item) => item.right}
        onClick={(item) => {
          if (item.key === "account") navigate("/account");
          if (item.key === "orders") navigate("/orders");
          if (item.key === "upgrade") navigate("/upgrade");
        }}
      />
    </Box>
  );
};

/* ====== Other Section ====== */
const Other: FC = () => {
  const navigate = useNavigate();
  const items = [
    {
      key: "contact",
      left: <Icon icon="zi-call" />,
      right: (
        <Box flex>
          <Text.Header className="flex-1 font-normal">
            Liên hệ & góp ý
          </Text.Header>
          <Icon icon="zi-chevron-right" />
        </Box>
      ),
    },
  ];

  return (
    <Box className="m-4">
      <ListRenderer
        title="Khác"
        items={items}
        renderKey={(item) => item.key}
        renderLeft={(item) => item.left}
        renderRight={(item) => item.right}
        onClick={(item) => {
          if (item.key === "reviews") navigate("/reviews");
          if (item.key === "contact") navigate("/contact");
        }}
      />
    </Box>
  );
};

/* ====== Profile Page ====== */
const ProfilePage: FC = () => {
  const navigate = useNavigate();
  const user = useRecoilValue<User | null>(userState);

  const handleLogout = () => {
    console.log("User logged out");
    // TODO: setUser(null) bằng useSetRecoilState để reset userState
    navigate("/");
  };

  return (
    <Page className="bg-blue-50">
      <Header showBackIcon={false} title="Trang cá nhân" />
      <UserInfo />

      {/* Nếu chưa đăng nhập → hiển thị nút đăng nhập */}
      {!user && (
        <Box className="m-4">
          <Button
            fullWidth
            type="highlight"
            onClick={() => navigate("/login")}
          >
            Đăng nhập
          </Button>
        </Box>
      )}

      {/* Nếu đã đăng nhập → chia role */}
      {user && (
        <>
          <Subscription />
          <Personal />
          <Other />

          {/* Quyền theo role */}
          {user.role === "admin" && (
            <Box className="m-4">
              <Button fullWidth type="highlight" onClick={() => navigate("/admin")}>
                Quản trị hệ thống
              </Button>
            </Box>
          )}

          {user.role === "staff" && (
            <Box className="m-4">
              <Button fullWidth type="highlight" onClick={() => navigate("/staff")}>
                Quản lý nhân viên
              </Button>
            </Box>
          )}

          {user.role === "member" && (
            <Box className="m-4">
              <Button fullWidth type="highlight" onClick={() => navigate("/member")}>
                Quyền lợi thành viên
              </Button>
            </Box>
          )}

          {user.role === "customer" && (
            <Box className="m-4">
              <Text className="text-center text-gray-500">
                Bạn đang đăng nhập với tư cách Khách hàng
              </Text>
            </Box>
          )}

          {/* Nút đăng xuất luôn hiện khi có user */}
          <Box className="m-4">
            <Button fullWidth type="danger" onClick={handleLogout}>
              Đăng xuất
            </Button>
          </Box>
        </>
      )}
    </Page>
  );
};



export default ProfilePage;
