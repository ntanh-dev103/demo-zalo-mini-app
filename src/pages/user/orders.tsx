import React, { FC } from "react";
import { Box, Header, Page, Text } from "zmp-ui";
import { useNavigate } from "react-router";
import Card from "components/Card"; // 👉 dùng Card custom

// Mock data đơn hàng
const orders = [
  { id: "DH001", date: "2025-09-01", total: "250,000đ", status: "Hoàn tất" },
  { id: "DH002", date: "2025-09-05", total: "120,000đ", status: "Đang giao" },
];

const OrdersPage: FC = () => {
  const navigate = useNavigate();

  return (
    <Page>
      <Header title="Lịch sử đơn hàng" onBackClick={() => navigate(-1)} />
      <Box className="p-4 space-y-4">
        {orders.map((order) => (
          <Card key={order.id}>
            <Text.Title className="font-bold">Mã: {order.id}</Text.Title>
            <Text>Ngày: {order.date}</Text>
            <Text>Tổng: {order.total}</Text>
            <Text>Trạng thái: {order.status}</Text>
          </Card>
        ))}
        {orders.length === 0 && <Text>Chưa có đơn hàng nào</Text>}
      </Box>
    </Page>
  );
};

export default OrdersPage;
