import React, { FC } from "react";
import { Box, Header, Page, Text } from "zmp-ui";
import { ListRenderer } from "components/list-renderer";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { orderHistoryState } from "state";
import { notificationsState } from "state/notifications";
import { Order, OrderStatus } from "types/order";
import logo from "static/logo.png";

const OrderHistory: FC = () => {
  const orders = useRecoilValue(orderHistoryState);
  const setNotifications = useSetRecoilState(notificationsState);

  // Type guard for Order array
  if (!Array.isArray(orders)) return null;

  const handleCancelOrder = (orderId: string, event: React.MouseEvent) => {
    event.stopPropagation(); // Prevent triggering the parent click event
    
    // Update order status in state
    const updatedOrders = orders.map(order => 
      order.id === orderId ? { ...order, status: 'cancelled' as OrderStatus } : order
    );
    
    // Send notification about cancellation
    setNotifications((prev) => [
      {
        id: Date.now(),
        image: logo,
        title: `Đơn hàng #${orderId} đã bị hủy`,
        content: `Đơn hàng của bạn đã được hủy thành công`,
        timestamp: new Date().toISOString(),
        type: "order",
        orderId,
      },
      ...prev,
    ]);
  };

  const handleOrderClick = (orderId: string, status: OrderStatus) => {
    // Add notification when viewing order details
    setNotifications((prev) => [
      {
        id: Date.now(),
        image: logo,
        title: `Đơn hàng #${orderId}`,
        content: `Trạng thái: ${getStatusText(status)}`,
        timestamp: new Date().toISOString(),
        type: "order",
        orderId,
      },
      ...prev,
    ]);
  };

  const getStatusText = (status: OrderStatus) => {
    switch (status) {
      case "pending":
        return "Đang chờ xác nhận";
      case "confirmed":
        return "Đã xác nhận";
      case "shipping":
        return "Đang giao hàng";
      case "delivered":
        return "Đã giao hàng";
      case "cancelled":
        return "Đã hủy";
      default:
        return "Không xác định";
    }
  };

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case "pending":
        return "text-yellow-600";
      case "confirmed":
        return "text-blue-600";
      case "shipping":
        return "text-purple-600";
      case "delivered":
        return "text-green-600";
      case "cancelled":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <Page>
      <Header title="Lịch sử đơn hàng" />
      <Box className="p-4">
        <ListRenderer
          items={orders}
          renderLeft={(order: Order) => (
            <Box
              className="w-full p-4 border rounded-lg shadow-sm cursor-pointer hover:border-primary"
              onClick={() => handleOrderClick(order.id, order.status)}
            >
              <Box className="flex justify-between items-center mb-2">
                <Text.Header className="text-lg">
                  Đơn hàng #{order.id}
                </Text.Header>
                <Text className={getStatusColor(order.status)}>
                  {getStatusText(order.status)}
                </Text>
              </Box>
              <Text className="text-gray-600">
                Ngày đặt: {new Date(order.date).toLocaleDateString("vi-VN", {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </Text>
              <Box className="flex justify-between items-center mt-2">
                <Text className="font-medium">
                  Tổng tiền: {order.total.toLocaleString()}đ
                </Text>
                {order.status !== 'cancelled' && order.status !== 'delivered' && (
                  <button
                    onClick={(e) => handleCancelOrder(order.id, e)}
                    className="px-3 py-1 text-sm text-red-600 border border-red-600 rounded-lg hover:bg-red-50"
                  >
                    Hủy đơn
                  </button>
                )}
              </Box>
            </Box>
          )}
          renderRight={() => null}
        />
      </Box>
    </Page>
  );
};

export default OrderHistory;