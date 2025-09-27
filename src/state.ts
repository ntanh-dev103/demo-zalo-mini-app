import { atom, selector, selectorFamily } from "recoil";
import { getLocation, getPhoneNumber, getUserInfo } from "zmp-sdk";
import logo from "static/logo.png";
import { Category } from "types/category";
import { Product, Variant } from "types/product";
import { Cart } from "types/cart";
// Already imported calcFinalPrice
import { calculateDistance } from "utils/location";
import { Store } from "types/delivery";
import { calcFinalPrice } from "utils/product";
import { wait } from "utils/async";
import { getItemKey } from "types/cart";
import { User } from "types/user";
import { Order } from "types/order";
import categories from "../mock/categories.json";

/**
 * Helper: tạo user an toàn (đảm bảo id + role)
 */

/* ========== Helper: tạo user an toàn ========== */
const createUserSafe = (data: Partial<User>): User => {
  return {
    id: data.id ?? `guest_${Math.random().toString(36).slice(2, 9)}`,
    name: data.name ?? "Khách hàng",
    avatar: data.avatar ?? "https://via.placeholder.com/100",
    tier: (data.tier as any) ?? ("bronze" as any),
    role: data.role ?? "customer",
    ...(data as any), // giữ các field khác nếu có (phone, email,...)
  } as User;
};

/* ========== Lấy user từ SDK Zalo ========== */
export const userInfoQuery = selector<User | null>({
  key: "userInfo",
  get: async () => {
    try {
      const { userInfo } = await getUserInfo({ autoRequestPermission: true });

      return createUserSafe({
        id: userInfo?.id,
        name: userInfo?.name,
        avatar: userInfo?.avatar,
        phone: (userInfo as any)?.phone ?? "",
        email: (userInfo as any)?.email ?? "",
        tier: "bronze",
        role: "customer",
      });
    } catch (e) {
      console.error("Error getting user info:", e);
      return null;
    }
  },
});

/* ========== userState chính ========== */
export const userState = atom<User | null>({
  key: "user",
  default: null,
  effects: [
    ({ setSelf, getPromise }) => {
      getPromise(userInfoQuery).then((userInfo) => {
        if (userInfo) {
          setSelf(userInfo);
        }
      });
    },
  ],
});


/* ---------------- rest of your states (unchanged logic) ---------------- */

export const orderHistoryState = atom<Order[]>({
  key: "orderHistory",
  default: [
    {
      id: "ORD001",
      date: "2025-09-19T10:00:00Z",
      status: "delivered",
      total: 250000,
      items: [
        {
          productId: "P1",
          quantity: 2,
          price: 125000,
        },
      ],
      shipping: {
        address: "123 Đường ABC, Quận 1, TP.HCM",
        phone: "0123456789",
      },
    },
    {
      id: "ORD002",
      date: "2025-09-18T15:30:00Z",
      status: "shipping",
      total: 180000,
      items: [
        {
          productId: "P2",
          quantity: 1,
          price: 180000,
        },
      ],
      shipping: {
        address: "456 Đường XYZ, Quận 2, TP.HCM",
        phone: "0987654321",
      },
    },
  ],
});

export const categoriesState = selector<Category[]>({
  key: "categories",
  get: () => categories,
});

export const productsState = selector<Product[]>({
  key: "products",
  get: async () => {
    await wait(2000);
    const products = (await import("../mock/products.json")).default;
    const variants = (await import("../mock/variants.json")).default as Variant[];
    return products.map(
      (product) =>
        ({
          ...product,
          variants: variants.filter((variant) =>
            product.variantId.includes(variant.id)
          ),
        } as Product)
    );
  },
});

export const recommendProductsState = selector<Product[]>({
  key: "recommendProducts",
  get: ({ get }) => {
    const products = get(productsState);
    return products.filter((p) => p.sale);
  },
});

export const selectedCategoryIdState = atom({
  key: "selectedCategoryId",
  default: "coffee",
});

export const productsByCategoryState = selectorFamily<Product[], string>({
  key: "productsByCategory",
  get:
    (categoryId) =>
    ({ get }) => {
      const allProducts = get(productsState);
      return allProducts.filter((product) =>
        product.categoryId.includes(categoryId)
      );
    },
});

export const cartState = atom<Cart>({
  key: "cart",
  default: [],
});

export const addToCartState = selector({
  key: "addToCart",
  get: ({ get }) => get(cartState),
  set: ({ get, set }, newValue: any) => {
    const cart = get(cartState);
    const item = newValue as Cart[0];

    // Add to cart
    set(cartState, [...cart, item]);
  },
});

export type Coupon = {
  code: string;
  description: string;
  discountType: "percent" | "fixed";
  value: number;
};

export const couponState = atom<Coupon | null>({
  key: "coupon",
  default: null,
});

export const totalQuantityState = selector({
  key: "totalQuantity",
  get: ({ get }) => {
    const cart = get(cartState);
    return cart.reduce((total, item) => total + item.quantity, 0);
  },
});

export const totalPriceState = selector({
  key: "totalPrice",
  get: ({ get }) => {
    const cart = get(cartState);
    return cart.reduce(
      (total, item) =>
        total + item.quantity * calcFinalPrice(item.product, item.options),
      0
    );
  },
});

export const totalPriceWithShippingState = selector({
  key: "totalPriceWithShipping",
  get: ({ get }) => {
    const total = get(totalPriceState); // cart total
    const shipping = get(shippingMethodState);

    let shippingFee = 0;
    if (shipping === "express") shippingFee = 30000;

    return total + shippingFee;
  },
});

export const totalPriceWithCouponState = selector<number>({
  key: "totalPriceWithCoupon",
  get: ({ get }) => {
    const subtotal = get(totalPriceState);
    const coupon = get(couponState);

    if (!coupon) return subtotal;

    if (coupon.discountType === "percent") {
      return Math.max(0, subtotal - (subtotal * coupon.value) / 100);
    }

    if (coupon.discountType === "fixed") {
      return Math.max(0, subtotal - coupon.value);
    }

    return subtotal;
  },
});

export const finalTotalState = selector({
  key: "finalTotal",
  get: ({ get }) => {
    const subtotal = get(totalPriceState);
    const shipping = get(shippingMethodState);
    const coupon = get(couponState);

    // shipping fee
    let shippingFee = 0;
    if (shipping === "express") shippingFee = 30000;

    // discount
    let discount = 0;
    if (coupon) {
      if (coupon.discountType === "percent") {
        discount = (subtotal * coupon.value) / 100;
      } else {
        discount = coupon.value;
      }
    }

    return {
      subtotal,
      shippingFee,
      discount,
      total: subtotal + shippingFee - discount,
    };
  },
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
      const key = getItemKey(item);
      if (selectedIds.includes(key)) {
        return total + item.quantity * calcFinalPrice(item.product, item.options);
      }
      return total;
    }, 0);
  },
});

export const selectedDiscountState = selector({
  key: "selectedDiscount",
  get: ({ get }) => {
    const subtotal = get(selectedSubtotalState);
    const coupon = get(couponState);

    if (!coupon) return 0;

    if (coupon.discountType === "percent") {
      return (subtotal * coupon.value) / 100;
    }
    return coupon.value;
  },
});

export const selectedTotalPriceState = selector({
  key: "selectedTotalPrice",
  get: ({ get }) => {
    const cart = get(cartState);
    const selectedIds = get(selectedCartItemsState);

    return cart.reduce((total, item) => {
      const key = getItemKey(item);
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
    const shipping = get(shippingMethodState);
    const coupon = get(couponState);

    // subtotal (only selected items)
    const subtotal = cart.reduce((total, item) => {
      const key = getItemKey(item);

      if (selectedIds.includes(key)) {
        return (
          total +
          item.quantity * calcFinalPrice(item.product, item.options)
        );
      }
      return total;
    }, 0);

    // shipping fee
    const shippingFee = shipping === "express" ? 30000 : 0;
    let discount = 0;
    if (coupon && subtotal > 0) {
      discount = coupon.discountType === "percent"
        ? (subtotal * coupon.value) / 100
        : coupon.value;
    }

    const total = Math.max(0, subtotal + shippingFee - discount);

    return {
      subtotal,
      shippingFee,
      discount,
      total
    };
  },
});

export const shippingMethodState = atom<"standard" | "express">({
  key: "shippingMethod",
  default: "standard",
});

// Notification state moved to state/notifications.ts

export const keywordState = atom({
  key: "keyword",
  default: "",
});

export const resultState = selector<Product[]>({
  key: "result",
  get: async ({ get }) => {
    const keyword = get(keywordState);
    if (!keyword.trim()) {
      return [];
    }
    const products = get(productsState);
    await wait(500);
    return products.filter((product) =>
      product.name.trim().toLowerCase().includes(keyword.trim().toLowerCase())
    );
  },
});

export const storesState = atom<Store[]>({
  key: "stores",
  default: [
    {
      id: 1,
      name: "VNG Campus Store",
      address:
        "Khu chế xuất Tân Thuận, Z06, Số 13, Tân Thuận Đông, Quận 7, Thành phố Hồ Chí Minh, Việt Nam",
      lat: 10.741639,
      long: 106.714632,
    },
    {
      id: 2,
      name: "The Independence Palace",
      address:
        "135 Nam Kỳ Khởi Nghĩa, Bến Thành, Quận 1, Thành phố Hồ Chí Minh, Việt Nam",
      lat: 10.779159,
      long: 106.695271,
    },
    {
      id: 3,
      name: "Saigon Notre-Dame Cathedral Basilica",
      address:
        "1 Công xã Paris, Bến Nghé, Quận 1, Thành phố Hồ Chí Minh, Việt Nam",
      lat: 10.779738,
      long: 106.699092,
    },
    {
      id: 4,
      name: "Bình Quới Tourist Village",
      address:
        "1147 Bình Quới, phường 28, Bình Thạnh, Thành phố Hồ Chí Minh, Việt Nam",
      lat: 10.831098,
      long: 106.733128,
    },
    {
      id: 5,
      name: "Củ Chi Tunnels",
      address: "Phú Hiệp, Củ Chi, Thành phố Hồ Chí Minh, Việt Nam",
      lat: 11.051655,
      long: 106.494249,
    },
  ],
});

export const nearbyStoresState = selector({
  key: "nearbyStores",
  get: ({ get }) => {
    // Get the current location from the locationState atom
    const location = get(locationState);

    // Get the list of stores from the storesState atom
    const stores = get(storesState);

    // Calculate the distance of each store from the current location
    if (location) {
      const storesWithDistance = stores.map((store) => ({
        ...store,
        distance: calculateDistance(
          location.latitude,
          location.longitude,
          store.lat,
          store.long
        ),
      }));

      // Sort the stores by distance from the current location
      const nearbyStores = storesWithDistance.sort(
        (a, b) => a.distance - b.distance
      );

      return nearbyStores;
    }
    return [];
  },
});

export const selectedStoreIndexState = atom({
  key: "selectedStoreIndex",
  default: 0,
});

export const selectedStoreState = selector({
  key: "selectedStore",
  get: ({ get }) => {
    const index = get(selectedStoreIndexState);
    const stores = get(nearbyStoresState);
    return stores[index];
  },
});

export const selectedDeliveryTimeState = atom({
  key: "selectedDeliveryTime",
  default: +new Date(),
});

export const requestLocationTriesState = atom({
  key: "requestLocationTries",
  default: 0,
});

export const requestPhoneTriesState = atom({
  key: "requestPhoneTries",
  default: 0,
});

export const locationState = selector<
  { latitude: string; longitude: string } | false
>({
  key: "location",
  get: async ({ get }) => {
    const requested = get(requestLocationTriesState);
    if (requested) {
      const { latitude, longitude, token } = await getLocation({
        fail: console.warn,
      });
      if (latitude && longitude) {
        return { latitude, longitude };
      }
      if (token) {
        console.warn(
          "Sử dụng token này để truy xuất vị trí chính xác của người dùng",
          token
        );
        console.warn(
          "Chi tiết tham khảo: ",
          "https://mini.zalo.me/blog/thong-bao-thay-doi-luong-truy-xuat-thong-tin-nguoi-dung-tren-zalo-mini-app"
        );
        console.warn("Giả lập vị trí mặc định: VNG Campus");
        return {
          latitude: "10.7287",
          longitude: "106.7317",
        };
      }
    }
    return false;
  },
});

export const phoneState = selector<string | boolean>({
  key: "phone",
  get: async ({ get }) => {
    const requested = get(requestPhoneTriesState);
    if (requested) {
      try {
        const { number, token } = await getPhoneNumber({ fail: console.warn });
        if (number) {
          return number;
        }
        console.warn(
          "Sử dụng token này để truy xuất số điện thoại của người dùng",
          token
        );
        console.warn(
          "Chi tiết tham khảo: ",
          "https://mini.zalo.me/blog/thong-bao-thay-doi-luong-truy-xuat-thong-tin-nguoi-dung-tren-zalo-mini-app"
        );
        console.warn("Giả lập số điện thoại mặc định: 0337076898");
        return "0337076898";
      } catch (error) {
        // Xử lý exception
        console.error(error);
        return false;
      }
    }

    return false;
  },
});

export const orderNoteState = atom({
  key: "orderNote",
  default: "",
});

// Notification state moved to state/notifications.ts
