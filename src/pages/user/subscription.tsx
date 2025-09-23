import React, { FC } from "react";
import { Box, Button, Header, Input, Page, Text } from "zmp-ui";
import { useNavigate } from "react-router";

const SubscriptionRegisterPage: FC = () => {
  const navigate = useNavigate();

  const handleRegister = () => {
    // 👉 Ở đây bạn có thể call API hoặc update recoil state
    console.log("Đã đăng ký thành viên!");
    navigate("/profile"); // quay lại trang cá nhân
  };

  return (
    <Page className="bg-white">
      <Header title="Đăng ký thành viên" onBackClick={() => navigate(-1)} />
      <Box className="p-4 space-y-4">
        <Text.Title className="font-bold">Thông tin đăng ký</Text.Title>
        <Input label="Họ và tên" placeholder="Nhập họ và tên" />
        <Input label="Số điện thoại" placeholder="Nhập số điện thoại" />
        <Input label="Email" placeholder="Nhập email" />
        <Button fullWidth onClick={handleRegister} className="mt-4">
          Xác nhận đăng ký
        </Button>
      </Box>
    </Page>
  );
};

export default SubscriptionRegisterPage;
