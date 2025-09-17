import { Product } from "./product";

export const getItemKey = (item: CartItem) =>
  JSON.stringify({
    product: item.product.id,
    options: item.options,
    quantity: item.quantity,
  });

export type SelectedOptions = Record<string, string | string[]>;


export interface CartItem {
  product: Product;
  options: SelectedOptions;
  quantity: number;
}

export type Cart = CartItem[];
