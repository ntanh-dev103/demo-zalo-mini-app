import React, { FC, useState } from "react";
import { Box, Button, Header, Input, Page, Text, Avatar } from "zmp-ui";
import { useNavigate } from "react-router";
import { useRecoilState } from "recoil";
import { userState } from "state";
import { User } from "types/user";

const AccountPage: FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useRecoilState<User | null>(userState);

  // 👉 local state để chỉnh sửa
  const [name, setName] = useState(user?.name ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [phone, setPhone] = useState(user?.phone ?? "");

  const handleSave = () => {
    if (!user) return;

    // 👉 Cập nhật lại userState
    setUser({
      ...user,
      name,
      email,
      phone,
    });

    alert("Thông tin tài khoản đã được cập nhật!");
    navigate("/profile");
  };

  return (
    <Page>
      <Header title="Thông tin tài khoản" onBackClick={() => navigate(-1)} />
      <Box className="p-4 space-y-4">
        <Box className="flex flex-col items-center">
          <Avatar
            src={user?.avatar ?? "https://via.placeholder.com/100"}
            size={100}
          />
          <Text className="mt-2 font-bold">{user?.name ?? "Khách hàng"}</Text>
        </Box>

        <Input
          label="Họ và tên"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
   <Input
  label="Email"
  type="text"
  inputMode="email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>
<Input
  label="Số điện thoại"
  type="text"
  inputMode="tel"
  value={phone}
  onChange={(e) => setPhone(e.target.value)}
/>



        <Button fullWidth onClick={handleSave} className="mt-4">
          Lưu thay đổi
        </Button>
      </Box>
    </Page>
  );
};

export default AccountPage;
