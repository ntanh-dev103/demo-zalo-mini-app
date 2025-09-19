import React, { FC, useState } from "react";
import { Box, Button, Header, Input, Page, Text } from "zmp-ui";
import { useNavigate } from "react-router";

const ContactPage: FC = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState<string>("");

  const handleSend = () => {
    console.log("Góp ý:", message);
    alert("Cảm ơn bạn đã góp ý!");
    navigate("/profile");
  };

 return (
  <Page>
    <Header title="Liên hệ & Góp ý" onBackClick={() => navigate(-1)} />
    <Box className="p-4 space-y-4">
      <Text.Title className="font-bold">Góp ý của bạn</Text.Title>

      {/* Thay Input multiline bằng textarea thuần */}
      <Box className="space-y-2">
        <Text size="small" className="font-medium">Ghi chú</Text>
        <textarea
          placeholder="Nhập ghi chú"
          rows={3}
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
