
export type Tier = "bronze" | "silver" | "gold" | "diamond";

export interface User {
  name?: string;
  avatar?: string;
  tier: Tier;
  phone?: string;
  email?: string;
}


// chuẩn hoá tier từ string → Tier
export const normalizeTier = (raw?: string): Tier | null => {
  if (!raw) return null;
  const key = raw.trim().toLowerCase();
  if (["đồng", "dong", "bronze"].includes(key)) return "bronze";
  if (["bạc", "bac", "silver"].includes(key)) return "silver";
  if (["vàng", "vang", "gold"].includes(key)) return "gold";
  if (["kim cương", "kimcuong", "kim_cuong", "diamond"].includes(key)) return "diamond";
  return null;
};

// màu hiển thị cho tier
export const tierColors: Record<Tier, string> = {
  bronze: "text-amber-700",
  silver: "text-gray-400",
  gold: "text-yellow-500",
  diamond: "text-blue-400",
};

// nhãn hiển thị cho tier
export const tierLabels: Record<Tier, string> = {
  bronze: "Đồng",
  silver: "Bạc",
  gold: "Vàng",
  diamond: "Kim Cương",
};
