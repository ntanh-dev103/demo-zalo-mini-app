import React, { FC, useState } from "react";
import { Box, Button, Header, Input, Page, Text } from "zmp-ui";
import { useNavigate } from "react-router";

const ContactPage: FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const handleSend = () => {
    console.log("Email:", email);
    console.log("Góp ý:", message);

    alert("Cảm ơn bạn đã góp ý!");
    navigate("/profile");
  };

  return (
    <Page>
      <Header title="Liên hệ & Góp ý" onBackClick={() => navigate(-1)} />
      <Box className="p-4 space-y-4">
        <Text.Title className="font-bold">Thông tin góp ý</Text.Title>

        {/* Nhập email */}
        <Box className="space-y-2">
          <Text size="small" className="font-medium">
            Email 
          </Text>
          <Input
            placeholder="Nhập email của bạn"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Box>

        {/* Nhập ghi chú */}
        <Box className="space-y-2">
          <Text size="small" className="font-medium">Nội dung góp ý</Text>
          <textarea
            placeholder="Nhập góp ý của bạn"
            rows={3}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full border rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </Box>

        <Button fullWidth onClick={handleSend}>
          Gửi góp ý
        </Button>
      </Box>
    </Page>
  );
};

export default ContactPage;
