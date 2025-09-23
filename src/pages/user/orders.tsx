import React, { FC, useState } from "react";
import { Box, Header, Page, Tabs, Text, Button, Modal } from "zmp-ui";
import { useNavigate } from "react-router";

// ==== Types ====
type OrderStatus =
  | "cho_xac_nhan"
  | "cho_lay_hang"
  | "dang_giao"
  | "da_giao"
  | "da_huy"
  | "tra_hang";

type Product = {
  name: string;
  price: string;
  image: string;
};

type Order = {
  id: string;
  shop: string;
  date: string;
  products: Product[];
  total: string;
  status: OrderStatus;
};

// ==== Mock data ====
const initialOrders: Order[] = [
  {
    id: "DH001",
    shop: "Star Shop",
    date: "2025-09-01",
    products: [
      { name: "Quấn cán vợt cầu lông", price: "16.000đ", image: "https://via.placeholder.com/80" },
      { name: "Vợt Yonex Carbon", price: "450.000đ", image: "https://via.placeholder.com/80" },
    ],
    total: "466.000đ",
    status: "cho_xac_nhan",
  },
  {
    id: "DH002",
    shop: "GloShop",
    date: "2025-09-02",
    products: [
      { name: "Bàn cờ vua nam châm", price: "26.000đ", image: "https://via.placeholder.com/80" },
    ],
    total: "26.000đ",
    status: "da_giao",
  },
];

// ==== Tabs ====
const statusTabs: { key: OrderStatus; label: string }[] = [
  { key: "cho_xac_nhan", label: "Chờ xác nhận" },
  { key: "cho_lay_hang", label: "Chờ lấy hàng" },
  { key: "dang_giao", label: "Đang giao" },
  { key: "da_giao", label: "Đã giao" },
  { key: "da_huy", label: "Đã hủy" },
  { key: "tra_hang", label: "Trả hàng" },
];

const BadgeSmall: FC<{ text: string }> = ({ text }) => (
  <span className="ml-1 inline-flex items-center justify-center px-2 py-0.5 text-xs font-semibold rounded-full bg-blue-500 text-white">
    {text}
  </span>
);

const statusColors: Record<OrderStatus, string> = {
  cho_xac_nhan: "text-yellow-600",
  cho_lay_hang: "text-blue-600",
  dang_giao: "text-indigo-600",
  da_giao: "text-green-600",
  da_huy: "text-red-600",
  tra_hang: "text-orange-600",
};

// ==== OrderCard component ====
const OrderCard: FC<{ order: Order; onCancel: (id: string) => void }> = ({
  order,
  onCancel,
}) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <Box className="bg-white rounded-lg shadow-md border overflow-hidden">
      {/* Header */}
      <Box className="flex justify-between items-center px-4 py-2 border-b bg-gray-50">
        <Text className="font-medium">{order.shop}</Text>
        <Text className={`text-sm font-semibold ${statusColors[order.status]}`}>
          {statusTabs.find((s) => s.key === order.status)?.label}
        </Text>
      </Box>

      {/* Products */}
      <Box className="divide-y">
        {order.products.map((p, i) => (
          <Box key={i} className="flex items-center space-x-3 px-4 py-3">
            <img
              src={p.image}
              alt={p.name}
              className="w-16 h-16 rounded object-cover"
            />
            <Box className="flex-1 min-w-0">
              <Text className="text-sm font-medium truncate">{p.name}</Text>
              <Text className="text-xs text-gray-500">{p.price}</Text>
            </Box>
          </Box>
        ))}
      </Box>

      {/* Footer */}
      <Box className="flex justify-between items-center px-4 py-2 border-t bg-gray-50">
        <Text className="font-semibold">Tổng: {order.total}</Text>
        {order.status === "cho_xac_nhan" && (
          <>
            <Button size="small" type="danger" onClick={() => setShowModal(true)}>
              Hủy đơn
            </Button>
            <Modal
              visible={showModal}
              title="Xác nhận hủy đơn"
              onClose={() => setShowModal(false)}
              actions={[
                { text: "Quay lại", close: true },
                {
                  text: "Có, hủy ngay",
                  danger: true,
                  onClick: () => {
                    onCancel(order.id);
                    setShowModal(false);
                  },
                },
              ]}
            >
              <Text>
                Bạn có chắc muốn hủy đơn <strong>{order.id}</strong> không?
              </Text>
              <Box className="mt-3 space-y-2">
                {order.products.slice(0, 3).map((p, i) => (
                  <Box key={i} className="flex items-center space-x-3">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-10 h-10 rounded object-cover"
                    />
                    <Text className="text-sm truncate">{p.name}</Text>
                  </Box>
                ))}
              </Box>
            </Modal>
          </>
        )}
        {order.status === "da_giao" && (
          <Button size="small" type="highlight">
            Viết đánh giá
          </Button>
        )}
      </Box>
    </Box>
  );
};

// ==== OrdersPage ====
const OrdersPage: FC = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [activeStatus, setActiveStatus] = useState<OrderStatus>("cho_xac_nhan");

  const countByStatus = (status: OrderStatus) =>
    orders.filter((o) => o.status === status).length;

  const handleCancel = (orderId: string) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: "da_huy" } : o))
    );
    setActiveStatus("da_huy");
  };

  const visibleOrders = orders.filter((o) => o.status === activeStatus);

  return (
    <Page>
      <Header title="Lịch sử đơn hàng" onBackClick={() => navigate(-1)} />

      {/* Tabs */}
      <Tabs
        activeKey={activeStatus}
        onChange={(k) => setActiveStatus(k as OrderStatus)}
        scrollable
        className="border-b"
      >
        {statusTabs.map((tab) => (
          <Tabs.Tab
            key={tab.key}
            label={
              <Box className="flex items-center">
                <Text
                  className={`text-sm font-medium ${
                    activeStatus === tab.key ? "text-blue-600" : "text-gray-600"
                  }`}
                >
                  {tab.label}
                </Text>
                {countByStatus(tab.key) > 0 && (
                  <BadgeSmall text={String(countByStatus(tab.key))} />
                )}
              </Box>
            }
          />
        ))}
      </Tabs>

      {/* Orders List */}
      <Box className="p-4 space-y-4">
        {visibleOrders.length > 0 ? (
          visibleOrders.map((order) => (
            <OrderCard key={order.id} order={order} onCancel={handleCancel} />
          ))
        ) : (
          <Text className="text-center text-gray-500">Không có đơn hàng</Text>
        )}
      </Box>
    </Page>
  );
};

export default OrdersPage;
