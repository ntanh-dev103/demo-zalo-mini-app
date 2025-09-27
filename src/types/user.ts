// ================== Định nghĩa Tier ==================
export type Tier = "bronze" | "silver" | "gold" | "diamond";

export const tierOrder: Tier[] = ["bronze", "silver", "gold", "diamond"];

export const tierLabels: Record<Tier, string> = {
  bronze: "Đồng",
  silver: "Bạc",
  gold: "Vàng",
  diamond: "Kim Cương",
};

export const tierColors: Record<Tier, string> = {
  bronze: "text-amber-700",
  silver: "text-gray-400",
  gold: "text-yellow-500",
  diamond: "text-blue-400",
};

// Chuẩn hoá tier từ string → Tier
export const normalizeTier = (raw?: string): Tier | null => {
  if (!raw) return null;
  const key = raw.trim().toLowerCase();
  if (["đồng", "dong", "bronze"].includes(key)) return "bronze";
  if (["bạc", "bac", "silver"].includes(key)) return "silver";
  if (["vàng", "vang", "gold"].includes(key)) return "gold";
  if (["kim cương", "kimcuong", "kim_cuong", "diamond"].includes(key))
    return "diamond";
  return null;
};

// ================== Định nghĩa Role ==================
export type Role = "admin" | "member" | "staff" | "customer";

// ================== Định nghĩa User ==================
export type User = {
  id: string;
  name: string;
  avatar?: string;
  tier: Tier; // luôn có tier
  role: Role;
  phone?: string;
  email?: string;
};

// ================== Factory tạo User ==================
export const createUser = (data: Partial<User>): User => {
  return {
    id: data.id ?? `u_${Math.random().toString(36).slice(2, 9)}`, // sinh id ngẫu nhiên
    name: data.name ?? "Người dùng mới",
    avatar: data.avatar,
    tier: data.tier ?? "bronze", // mặc định bronze
    role: data.role ?? "customer", // mặc định customer
    phone: data.phone,
    email: data.email,
  };
};

// ================== Helper nâng / hạ cấp tier ==================
export const upgradeUserTier = (user: User): User => {
  const currentIndex = tierOrder.indexOf(user.tier);
  if (currentIndex === -1 || currentIndex === tierOrder.length - 1) {
    return user; // đã ở hạng cao nhất
  }
  return { ...user, tier: tierOrder[currentIndex + 1] };
};

export const downgradeUserTier = (user: User): User => {
  const currentIndex = tierOrder.indexOf(user.tier);
  if (currentIndex <= 0) {
    return user; // đã ở hạng thấp nhất
  }
  return { ...user, tier: tierOrder[currentIndex - 1] };
};

// ================== Ví dụ dùng ==================
const userInfo = createUser({
  name: "Nguyễn Tuấn Anh",
  avatar: "https://example.com/avatar.png",
  tier: "bronze",
  email: "example@gmail.com",
});

console.log("👉 User:", userInfo);
console.log("👉 Upgrade:", upgradeUserTier(userInfo));
