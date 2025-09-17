import React, { FC } from "react";
import { Box, Text, Icon, Button } from "zmp-ui";

// Example mock data, you can replace with API call or recoil state
const order = {
  id: "DH123456",
  date: "17/09/2025",
  status: "Đang vận chuyển", // or "Đã giao", "Chờ xử lý"
  total: 450000,
  steps: ["Đã đặt hàng", "Đang chuẩn bị", "Đang vận chuyển", "Đã giao"],
  currentStep: 2, // index of steps
  items: [
    {
      name: "Tshirt Graphic Rainbow",
      quantity: 1,
      price: 239000,
      image: "https://via.placeholder.com/80",
    },
    {
      name: "Quần short thể thao",
      quantity: 2,
      price: 105000,
      image: "https://via.placeholder.com/80",
    },
  ],
};

export const OrderTracking: FC = () => {
  return (
    <Box className="p-4 space-y-6">
      {/* Order Info */}
      <Box className="p-4 rounded-xl border space-y-2 bg-white">
        <Text className="font-semibold">Mã đơn: {order.id}</Text>
        <Text size="xSmall" className="text-gray">
          Ngày đặt: {order.date}
        </Text>
        <Text size="small" className="text-blue-600 font-medium">
          Trạng thái: {order.status}
        </Text>
        <Text className="font-bold">
          Tổng: {order.total.toLocaleString()}₫
        </Text>
      </Box>

      {/* Tracking Steps */}
      <Box className="p-4 rounded-xl border bg-white">
        <Text className="font-semibold mb-3">Tiến trình đơn hàng</Text>
        <Box className="flex justify-between">
          {order.steps.map((step, index) => (
            <Box
              key={step}
              className="flex flex-col items-center flex-1"
            >
              <Box
                className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 
                  ${
                    index <= order.currentStep
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
              >
                <Icon
                  icon={index <= order.currentStep ? "zi-add-photo" : "zi-circle"}
                  size={16}
                />
              </Box>
              <Text
                size="xSmall"
                className={index <= order.currentStep ? "text-blue-600" : "text-gray-500"}
              >
                {step}
              </Text>
            </Box>
          ))}
        </Box>
      </Box>

      {/* Order Items */}
      <Box className="p-4 rounded-xl border bg-white space-y-3">
        <Text className="font-semibold">Chi tiết đơn hàng</Text>
        {order.items.map((item) => (
          <Box key={item.name} flex className="items-center space-x-3">
            <img
              src={item.image}
              alt={item.name}
              className="w-16 h-16 rounded-lg object-cover"
            />
            <Box className="flex-1">
              <Text className="font-medium">{item.name}</Text>
              <Text size="xSmall" className="text-gray">
                Số lượng: {item.quantity}
              </Text>
            </Box>
            <Text className="font-semibold">
              {(item.price * item.quantity).toLocaleString()}₫
            </Text>
          </Box>
        ))}
      </Box>

      {/* Actions */}
      <Box flex className="space-x-3">
        <Button
          fullWidth
          className="bg-gray-200 text-gray-700 rounded-xl"
        >
          Hủy đơn
        </Button>
        <Button
          type="highlight"
          fullWidth
          className="rounded-xl"
        >
          Liên hệ hỗ trợ
        </Button>
      </Box>
    </Box>
  );
};
