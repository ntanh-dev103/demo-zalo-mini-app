import { atom, selector, selectorFamily } from "recoil";
import { getLocation, getPhoneNumber, getUserInfo } from "zmp-sdk";
import logo from "static/logo.png";
import { Category } from "types/category";
import { Product, Variant } from "types/product";
import { Cart, CartItem, getItemKey } from "types/cart"; // ✅ import key + types
import { Notification } from "types/notification";
import { calculateDistance } from "utils/location";
import { Store } from "types/delivery";
import { calcFinalPrice } from "utils/product";
import { wait } from "utils/async";
import categories from "../mock/categories.json";

/* ------------------- Categories ------------------- */
export const categoriesState = atom<Category[]>({
  key: "categories",
  default: categories,
});

/* ------------------- User ------------------- */
export const userState = atom({
  key: "user",
  default: selector({
    key: "user/default",
    get: async () => {
      try {
        const { userInfo } = await getUserInfo({});
        return userInfo;
      } catch {
        return {
          id: "1",
          name: "Guest",
          avatar: logo,
        };
      }
    },
  }),
});

/* ------------------- Location ------------------- */
export const locationState = atom({
  key: "location",
  default: selector({
    key: "location/default",
    get: async () => {
      try {
        const { latitude, longitude } = (await getLocation({})).coords;
        return { latitude, longitude };
      } catch {
        return null;
      }
    },
  }),
});

/* ------------------- Phone ------------------- */
export const phoneState = atom({
  key: "phone",
  default: selector({
    key: "phone/default",
    get: async () => {
      try {
        const { number } = await getPhoneNumber({});
        return number;
      } catch {
        return null;
      }
    },
  }),
});

/* ------------------- Notifications ------------------- */
export const notificationsState = atom<Notification[]>({
  key: "notifications",
  default: [],
});

/* ------------------- Cart ------------------- */
export const cartState = atom<Cart>({
  key: "cart",
  default: [],
});

export const cartItemCountState = selectorFamily<number, CartItem>({
  key: "cartItemCount",
  get:
    (item) =>
    ({ get }) => {
      const cart = get(cartState);
      const key = getItemKey(item); // ✅ use helper
      return cart.find((i) => getItemKey(i) === key)?.quantity || 0;
    },
});

export const totalQuantityState = selector({
  key: "totalQuantity",
  get: ({ get }) => {
    const cart = get(cartState);
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  },
});

export const subtotalState = selector({
  key: "subtotal",
  get: ({ get }) => {
    const cart = get(cartState);
    return cart.reduce(
      (sum, item) =>
        sum + item.quantity * calcFinalPrice(item.product, item.options),
      0
    );
  },
});

export const shippingMethodState = atom({
  key: "shippingMethod",
  default: "standard",
});

export const couponState = atom<string | null>({
  key: "coupon",
  default: null,
});

export const totalPriceState = selector({
  key: "totalPrice",
  get: ({ get }) => {
    const subtotal = get(subtotalState);
    const shippingMethod = get(shippingMethodState);
    const coupon = get(couponState);

    let shipping = shippingMethod === "express" ? 20000 : 10000;
    let discount = coupon === "DISCOUNT10" ? 0.1 : 0;

    return subtotal * (1 - discount) + shipping;
  },
});

export const finalTotalState = selector({
  key: "finalTotal",
  get: ({ get }) => {
    const subtotal = get(subtotalState);
    const shippingMethod = get(shippingMethodState);
    const coupon = get(couponState);

    let shipping = shippingMethod === "express" ? 20000 : 10000;
    let discount = coupon === "DISCOUNT10" ? 0.1 : 0;

    return subtotal * (1 - discount) + shipping;
  },
});

/* ------------------- Selected Cart Items ------------------- */
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
      const key = getItemKey(item); // ✅
      if (selectedIds.includes(key)) {
        return total + item.quantity * calcFinalPrice(item.product, item.options);
      }
      return total;
    }, 0);
  },
});

export const selectedFinalTotalState = selector({
  key: "selectedFinalTotal",
  get: ({ get }) => {
    const cart = get(cartState);
    const selectedIds = get(selectedCartItemsState);
    const shippingMethod = get(shippingMethodState);
    const coupon = get(couponState);

    let subtotal = cart.reduce((total, item) => {
      const key = getItemKey(item); // ✅
      if (selectedIds.includes(key)) {
        return total + item.quantity * calcFinalPrice(item.product, item.options);
      }
      return total;
    }, 0);

    let shipping = shippingMethod === "express" ? 20000 : 10000;
    let discount = coupon === "DISCOUNT10" ? 0.1 : 0;

    return subtotal * (1 - discount) + shipping;
  },
});
