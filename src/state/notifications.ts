import { atom } from "recoil";
import { Notification } from "types/notification";
import logo from "static/logo.png";

export const notificationsState = atom<Notification[]>({
  key: "notifications",
  default: [
    {
      id: 1,
      image: logo,
      title: "Chào mừng bạn đến với Zalo Shop",
      content: "Cảm ơn bạn đã sử dụng ứng dụng của chúng tôi",
      timestamp: new Date().toISOString(),
      type: "system",
      read: false
    },
    {
      id: 2,
      image: logo,
      title: "🎉 Khuyến mãi đặc biệt",
      content: "Giảm 50% cho đơn hàng đầu tiên khi nhập mã WELCOME",
      timestamp: new Date().toISOString(),
      type: "promotion",
      read: false
    },
    {
      id: 3,
      image: logo,
      title: "🎁 Tích điểm nhận quà",
      content: "Tích điểm với mỗi đơn hàng để nhận những phần quà hấp dẫn",
      timestamp: new Date().toISOString(),
      type: "promotion",
      read: false
    }
  ]
});