export type OrderStatus = "pending" | "confirmed" | "shipping" | "delivered" | "cancelled";

export interface Order {
  id: string;
  date: string;
  status: OrderStatus;
  total: number;
  items: Array<{
    productId: string;
    quantity: number;
    price: number;
  }>;
  shipping?: {
    address: string;
    phone: string;
  };
}

export type OrderHistory = Order[];