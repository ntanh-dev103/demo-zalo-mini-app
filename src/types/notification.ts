export type NotificationType = "order" | "system" | "promotion";

export interface Notification {
  id: number;
  image: string;
  title: string;
  content?: string;
  timestamp: string;
  type: NotificationType;
  orderId?: string;
  read?: boolean;
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
}
