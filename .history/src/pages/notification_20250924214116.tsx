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

const NotificationList: FC = () => {
  const navigate = useNavigate();
  const notifications = useRecoilValue(notificationsState);
  const setNotifications = useSetRecoilState(notificationsState);
  const setCart = useSetRecoilState(cartState);
  const [selectedNotification, setSelectedNotification] = React.useState<null | {
    id: number;
    title: string;
    orderDetails?: {
      products: Array<{
        name: string;
        price: string;
        image: string;
      }>;
      total: string;
      shop: string;
      status: string;
    };
  }>(null);
  const setOrders = useSetRecoilState(orderHistoryState);
  const phone = useRecoilValue(phoneState);
  const { openSnackbar } = useSnackbar();

  const handleBuyAction = (productInfo: { name: string; price: string; image: string }, buyNow: boolean = false) => {
    try {
      // Convert string price to number by removing currency symbol and commas
      const price = parseInt(productInfo.price.replace(/[^\d]/g, ''));
      
      const product: Product = {
        id: Date.now(), // Generate temporary id
        name: productInfo.name,
        image: productInfo.image,
        price: price,
        categoryId: [] // Default empty category
      };

      if (buyNow) {
        const newOrder: Order = {
          id: getRandomId(),
          date: new Date().toISOString(),
          status: "pending",
          total: price,
          items: [{
            productId: product.id.toString(),
            quantity: 1,
            price: price
          }],
          shipping: {
            address: "",
            phone: typeof phone === 'string' ? phone : ""
          }
        };

        setOrders(prev => [newOrder, ...prev]);
        
        setNotifications(prev => [{
          id: Date.now(),
          type: "order",
          title: "Đặt hàng thành công",
          content: `Đơn hàng ${newOrder.id} đã được tạo thành công`,
          timestamp: new Date().toISOString(),
          image: product.image,
          orderId: newOrder.id,
          read: false,
          orderDetails: {
            products: [{
              name: product.name,
              price: `${price.toLocaleString()}đ`,
              image: product.image
            }],
            total: `${price.toLocaleString()}đ`,
            shop: "Shop Online",
            status: "Đang chờ xác nhận"
          }
        }, ...prev]);

        openSnackbar({
          text: "Đặt hàng thành công!",
          duration: 1500
        });

        setSelectedNotification(null);
        navigate("/orders");
      } else {
        const cartItem: CartItem = {
          product: product,
          options: {},
          quantity: 1
        };

        setCart(prev => [...prev, cartItem]);
        openSnackbar({
          text: "Đã thêm vào giỏ hàng",
          duration: 1500
        });
        setSelectedNotification(null);
        navigate("/cart");
      }
    } catch (error) {
      console.error('Error:', error);
      openSnackbar({
        text: "Có lỗi xảy ra, vui lòng thử lại",
        duration: 1500
      });
    }
  };
  if (!notifications) {
    return (
      <Box className="flex-1 flex items-center justify-center">
        <Text className="text-gray-500">Không có thông báo</Text>
      </Box>
    );
  }

  return (
    <Box className="flex-1 overflow-auto">
      {/* Order Details Modal */}
      <Modal
        visible={selectedNotification !== null}
        title={selectedNotification?.title || "Chi tiết đơn hàng"}
        onClose={() => setSelectedNotification(null)}
        actions={[
          {
            text: "Đóng",
            close: true
          }
        ]}
      >
        {selectedNotification?.orderDetails && (
          <Box className="space-y-4">
            <Box className="space-y-2">
              <Text.Header size="small" className="text-gray-600">
                Thông tin cửa hàng
              </Text.Header>
              <Text>{selectedNotification.orderDetails.shop}</Text>
            </Box>
            
            <Box className="space-y-2">
              <Text.Header size="small" className="text-gray-600">
                Trạng thái
              </Text.Header>
              <Text>{selectedNotification.orderDetails.status}</Text>
            </Box>

            <Box className="space-y-2">
              <Text.Header size="small" className="text-gray-600">
                Sản phẩm
              </Text.Header>
              {selectedNotification.orderDetails.products.map((product, index) => (
                <Box key={index} className="flex flex-col space-y-2 p-2 border rounded">
                  <Box className="flex items-center space-x-3">
                    <img src={product.image} alt={product.name} className="w-16 h-16 rounded object-cover" />
                    <Box className="flex-1">
                      <Text size="small" className="font-medium">{product.name}</Text>
                      <Text size="xSmall" className="text-gray-500">{product.price}</Text>
                    </Box>
                  </Box>
                  <Box className="flex space-x-2 pt-2 border-t">
                    <Button 
                      size="small"
                      onClick={() => handleBuyAction(product)}
                      className="flex-1"
                      variant="secondary"
                    >
                      Thêm vào giỏ
                    </Button>
                    <Button 
                      size="small"
                      onClick={() => handleBuyAction(product, true)}
                      className="flex-1"
                      variant="primary"
                    >
                      Mua ngay
                    </Button>
                  </Box>
                </Box>
              ))}
            </Box>

            <Box className="pt-2 border-t">
              <Text.Header className="text-primary">
                Tổng cộng: {selectedNotification.orderDetails.total}
              </Text.Header>
            </Box>
          </Box>
        )}
      </Modal>

      {/* Notifications List */}
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

</Box>


  );
};

const NotificationPage: FC = () => {
  return (
    <Page className="bg-white min-h-screen flex flex-col">
      <Header title="Thông báo" showBackIcon={false} />
      <Divider />
      <Box className="flex-1 flex flex-col overflow-hidden">
        <NotificationList />
      </Box>
    </Page>
  );
};

export default NotificationPage;
