import { Product } from "./product";

export type SelectedOptions = Record<string, string | string[]>;

import { CartItem } from "types/cart";

export interface CartItem {
  product: Product;
  options: SelectedOptions;
  quantity: number;
}

export type Cart = CartItem[];
