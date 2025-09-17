import React, { FC } from "react";
import { ListRenderer } from "components/list-renderer";
import { useRecoilValue } from "recoil";
import { notificationsState } from "state";
import { Box, Header, Page, Text } from "zmp-ui";
import { Divider } from "components/divider";

const NotificationList: FC = () => {
  const notifications = useRecoilValue(notificationsState);
  return (
    <Box className="p-4 space-y-4"> 
      {notifications.map((item) => (
        <Box
          key={item.id}
          className="
            flex items-center space-x-3 p-4 rounded-xl 
            bg-white shadow-md
            transition transform
            hover:shadow-xl hover:-translate-y-1
          "
        >
          <img className="w-12 h-12 rounded-full" src={item.image} />
          <Box className="flex-1">
            <Text.Header className="text-blue-700 font-semibold">{item.title}</Text.Header>
            <Text
              size="small"
              className="text-gray-600 overflow-hidden text-ellipsis line-clamp-2 break-words"
            >
              {item.content}
            </Text>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

const NotificationPage: FC = () => {
  return (
    <Page className="bg-blue-200 min-h-screen">
      <Header title="Thông báo" showBackIcon={false} />
      <Divider />
      <NotificationList />
    </Page>
  );
};

export default NotificationPage;
