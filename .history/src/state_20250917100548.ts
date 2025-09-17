import { atom, selector, selectorFamily } from "recoil";
import { getLocation, getPhoneNumber, getUserInfo } from "zmp-sdk";
import logo from "static/logo.png";
import { debounce } from "lodash";
import categories from "../mock/categories.json";

// Type Definitions
export interface Category {
  id: string;
  name: string;
}

export interface Variant {
  id: string;
  name: string;
  price: number;
}

export interface Product {
  id: string;
  name: string;
  categoryId: string[];
  variantId: string[];
  variants: Variant[];
  sale?: boolean;
  image: string;
  price: number;
}

export interface CartItem {
  product: Product;
  options: Record<string, any>;
  quantity: number;
}

export interface Cart extends Array<CartItem> {}

export interface Notification {
  id: number;
  image: string;
  title: string;
  content: string;
}

export interface Store {
  id: number;
  name: string;
  address: string;
  lat: number;
  long: number;
}

export interface Coupon {
  code: string;
  description: string;
  discountType: "percent" | "fixed";
  value: number;
}

export enum ShippingMethod {
  Standard = "standard",
  Express = "express",
}

export type Location = { latitude: string; longitude: string } | { error: string } | null;

// Utility Functions
export const formatCurrency = (amount: number, currency: string = "VND"): string => {
  return amount.toLocaleString("vi-VN", { style: "currency", currency });
};

export const generateCartItemKey = (item: CartItem): string => {
  const optionsStr = Object.entries(item.options)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, value]) => `${key}:${value}`)
    .join("|");
  return `${item.product.id}_${optionsStr}_${item.quantity}`;
};

// Mock async wait function (replace with actual implementation if needed)
const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Placeholder for external utilities (implement as needed)
const calculateDistance = (
  lat1: string,
  lon1: string,
  lat2: number,
  lon2: number
): number => {
  // Implement actual distance calculation
  return Math.sqrt(
    Math.pow(Number(lat1) - lat2, 2) + Math.pow(Number(lon1) - lon2, 2)
  );
};

const calcFinalPrice = (product: Product, options: Record<string, any>): number => {
  // Implement actual price calculation
  return product.price; // Placeholder
};

// State Definitions
export const userState = selector({
  key: "user",
  get: async () => {
    try {
      const { userInfo } = await getUserInfo({ autoRequestPermission: true });
      return userInfo;
    } catch (error) {
      console.error("Failed to fetch user info:", error);
      return null;
    }
  },
});

export const categoriesState = selector<Category[]>({
  key: "categories",
  get: () => categories,
});

export const productsState = selector<Product[]>({
  key: "products",
  get: async () => {
    try {
      await wait(2000);
      const products = (await import("../mock/products.json")).default;
      const variants = (await import("../mock/variants.json")).default as Variant[];
      return products.map((product: any) => {
        if (!Array.isArray(product.variantId)) {
          console.warn(`Invalid variantId for product ${product.id}`);
          return { ...product, variants: [] } as Product;
        }
        return {
          ...product,
          variants: variants.filter((variant) =>
            product.variantId.includes(variant.id)
          ),
        } as Product;
      });
    } catch (error) {
      console.error("Failed to load products or variants:", error);
      return [];
    }
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
  default: selector({
    key: "selectedCategoryId/default",
    get: ({ get }) => {
      const categories = get(categoriesState);
      return categories[0]?.id || "coffee";
    },
  }),
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
      const key = generateCartItemKey(item);
      if (selectedIds.includes(key)) {
        return total + item.quantity * calcFinalPrice(item.product, item.options);
      }
      return total;
    }, 0);
  },
});

export const selectedTotalPriceState = selector({
  key: "selectedTotalPrice",
  get: ({ get }) => get(selectedSubtotalState),
});

export const shippingMethodState = atom<ShippingMethod>({
  key: "shippingMethod",
  default: ShippingMethod.Standard,
});

export const shippingFeeState = selector({
  key: "shippingFee",
  get: ({ get }) => {
    const shipping = get(shippingMethodState);
    return shipping === ShippingMethod.Express ? 30000 : 0;
  },
});

export const discountState = selector({
  key: "discount",
  get: ({ get }) => {
    const subtotal = get(selectedSubtotalState);
    const coupon = get(couponState);
    if (!coupon) return 0;
    if (coupon.discountType === "percent") {
      return Math.min(subtotal, (subtotal * coupon.value) / 100);
    }
    return Math.min(subtotal, coupon.value);
  },
});

export const finalTotalState = selector({
  key: "finalTotal",
  get: ({ get }) => {
    const subtotal = get(selectedSubtotalState);
    const shippingFee = get(shippingFeeState);
    const discount = get(discountState);
    return {
      subtotal,
      shippingFee,
      discount,
      total: Math.max(0, subtotal + shippingFee - discount),
    };
  },
});

export const notificationsState = atom<Notification[]>({
  key: "notifications",
  default: [
    {
      id: 1,
      image: logo,
      title: "Chào bạn mới",
      content:
        "Cảm ơn đã sử dụng ZaUI Coffee, bạn có thể dùng ứng dụng này để tiết kiệm thời gian xây dựng",
    },
    {
      id: 2,
      image: logo,
      title: "Giảm 50% lần đầu mua hàng",
      content: "Nhập WELCOME để được giảm 50% giá trị đơn hàng đầu tiên order",
    },
  ],
});

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
    try {
      await wait(500);
      return products.filter((product) =>
        product.name.trim().toLowerCase().includes(keyword.trim().toLowerCase())
      );
    } catch (error) {
      console.error("Failed to search products:", error);
      return [];
    }
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
    const location = get(locationState);
    const stores = get(storesState);
    if (!location || "error" in location) return [];
    return stores
      .map((store) => ({
        ...store,
        distance: calculateDistance(
          location.latitude,
          location.longitude,
          store.lat,
          store.long
        ),
      }))
      .sort((a, b) => a.distance - b.distance);
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
    return stores[index] || null;
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

export const locationState = selector<Location>({
  key: "location",
  get: async ({ get }) => {
    const requested = get(requestLocationTriesState);
    if (requested) {
      try {
        const { latitude, longitude, token } = await getLocation({
          fail: console.warn,
        });
        if (latitude && longitude) {
          return { latitude, longitude };
        }
        if (token) {
          console.warn("Using token for location access:", token);
          return { latitude: "10.7287", longitude: "106.7317" };
        }
        return { error: "Unable to retrieve location" };
      } catch (error) {
        console.error("Location fetch error:", error);
        return { error: "Failed to fetch location" };
      }
    }
    return null;
  },
});

export const phoneState = selector<string | { error: string } | null>({
  key: "phone",
  get: async ({ get }) => {
    const requested = get(requestPhoneTriesState);
    if (requested) {
      try {
        const { number, token } = await getPhoneNumber({ fail: console.warn });
        if (number) {
          return number;
        }
        console.warn("Using token for phone access:", token);
        return "0337076898";
      } catch (error) {
        console.error("Phone fetch error:", error);
        return { error: "Failed to fetch phone number" };
      }
    }
    return null;
  },
});

export const orderNoteState = atom({
  key: "orderNote",
  default: "",
});
