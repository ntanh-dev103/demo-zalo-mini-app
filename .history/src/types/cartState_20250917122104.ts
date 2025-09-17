import { atom, selector } from "recoil";
import { CartItem, getItemKey } from "./cart";
import { calcFinalPrice } from "utils/";
import { shippingMethodState, couponState } from "./checkout"; // adjust path

export const cartState = atom<CartItem[]>({
  key: "cart",
  default: [],
});

export const selectedCartItemsState = atom<string[]>({
  key: "selectedCartItems",
  default: [],
});

export const selectedSubtotalState = selector({
  key: "selectedSubtotal",
  get: ({ get }) => {
    const cart = get(cartState);
    const selectedIds = get(selectedCartItemsState);
    return cart.reduce((total, item) => {
      if (selectedIds.includes(getItemKey(item))) {
        return total + item.quantity * calcFinalPrice(item.product, item.options);
      }
      return total;
    }, 0);
  },
});

// … same for selectedTotalPriceState, selectedFinalTotalState
