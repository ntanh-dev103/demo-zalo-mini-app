import { useVirtualKeyboardVisible } from "hooks";
import React, { FC, useMemo } from "react";
import { useLocation, useNavigate } from "react-router";
import { MenuItem } from "types/menu";
import { BottomNavigation, Icon } from "zmp-ui";
import { CartIcon } from "./cart-icon";
import { NotificationIcon } from "./notification-icon";

const tabs: Record<string, MenuItem> = {
  "/": {
    label: "Trang chủ",
    icon: <Icon icon="zi-home" />,
  },
  "/notification": {
    label: "Thông báo",
    icon: <NotificationIcon />,
    activeIcon: <NotificationIcon active />,
  },
  "/cart": {
    label: "Giỏ hàng",
    icon: <CartIcon />,
    activeIcon: <CartIcon active />,
  },
  "/profile": {
    label: "Cá nhân",
    icon: <Icon icon="zi-user" />,
  },
};

export type TabKeys = keyof typeof tabs;

export const NO_BOTTOM_NAVIGATION_PAGES = ["/search", "/category", "/result"];

export const Navigation: FC = () => {
  const keyboardVisible = useVirtualKeyboardVisible();
  const navigate = useNavigate();
  const location = useLocation();

  const noBottomNav = useMemo(() => {
    return NO_BOTTOM_NAVIGATION_PAGES.includes(location.pathname);
  }, [location]);

  if (noBottomNav || keyboardVisible) {
    return null;
  }

  return (
    <BottomNavigation
  id="footer"
  activeKey={
    location.pathname.startsWith("/profile") ||
    location.pathname.startsWith("/account") ||
    location.pathname.startsWith("/orders") ||
    location.pathname.startsWith("/reviews") ||
    location.pathname.startsWith("/contact") ||
    location.pathname.startsWith("/upgrade")
      ? "/profile" // ✅ gom tất cả route con vào tab Cá nhân
      : location.pathname
  }
  onChange={(key) => {
    console.log('Navigation changed to:', key);
    navigate(key);
  }}
  className="z-50"
>
  {Object.keys(tabs).map((path: TabKeys) => (
    <BottomNavigation.Item
      key={path}
      label={tabs[path].label}
      icon={tabs[path].icon}
      activeIcon={tabs[path].activeIcon}
      onClick={() => console.log('Clicked on:', path)}
    />
  ))}
</BottomNavigation>

  );
};
