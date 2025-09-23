import React, { FC } from "react";
import { Icon } from "zmp-ui";
import { useRecoilValue } from "recoil";
import { notificationsState } from "state/notifications";

interface NotificationIconProps {
  active?: boolean;
}

export const NotificationIcon: FC<NotificationIconProps> = ({ active }) => {
  const notifications = useRecoilValue(notificationsState);
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="relative">
      <Icon icon="zi-notif" className={active ? "text-primary" : ""} />
      {unreadCount > 0 && (
        <div className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
          {unreadCount}
        </div>
      )}
    </div>
  );
};