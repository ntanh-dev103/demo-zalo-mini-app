import React, { FC } from "react";
import { ListRenderer } from "components/list-renderer";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { cartState, orderHistoryState, phoneState } from "state";
import { notificationsState } from "state/notifications";
import { Box, Header, Page, Text, Modal, Button, useSnackbar } from "zmp-ui";
import { CartItem } from "types/cart";
import { getRandomId } from "utils/product";
import { Product } from "types/product";
import { Order } from "types/order";
import { Divider } from "components/divider";
import { useNavigate } from "react-router-dom";
import { Notification } from "types/notification"; // <- make sure you have this type

<ListRenderer<Notification>
  noDivider
  items={notifications}
  renderKey={(item) => item.id.toString()}   // ✅ provide unique key as string
  renderLeft={(item) => (
    <Box
      className="
        flex items-center w-full space-x-3 p-3 
        rounded-md shadow-sm border border-gray-200 
        hover:bg-blue-200 hover:shadow-md hover:border-primary transition-all duration-200
        cursor-pointer
      "
      onClick={() => {
        // Mark notification as read
        setNotifications(notifications.map(n => 
          n.id === item.id ? { ...n, read: true } : n
        ));
        
        // Show modal if it has order details
        if (item.orderDetails) {
          setSelectedNotification(item);
        }
      }}
    >
      <img
        className="w-10 h-10 rounded-full flex-shrink-0"
        src={item.image}
        alt={item.title}
      />
      <Box className="flex-1 min-w-0">
        <Box className="flex justify-between items-center mb-1">
          <Text.Header
            size="small"
            className={`${
              item.type === "order"
                ? "text-primary"
                : item.type === "promotion"
                  ? "text-green-600"
                  : "text-blue-600"
            } truncate`}
          >
            {item.title}
          </Text.Header>
          <Text size="xxSmall" className="text-gray-500">
            {(() => {
              try {
                return new Date(item.timestamp).toLocaleDateString("vi-VN");
              } catch {
                return "";
              }
            })()}
          </Text>
        </Box>
        <Text size="xxSmall" className="text-gray-600 truncate">
          {item.content || "Không có nội dung"}
        </Text>
      </Box>
    </Box>
  )}
  renderRight={() => null}
/>
