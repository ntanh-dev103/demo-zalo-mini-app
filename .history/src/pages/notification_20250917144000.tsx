import React, { FC } from "react";
import { ListRenderer } from "components/list-renderer";
import { useRecoilValue } from "recoil";
import { notificationsState } from "state";
import { Box, Header, Page, Text } from "zmp-ui";
import { Divider } from "components/divider";

const NotificationList: FC = () => {
  const notifications = useRecoilValue(notificationsState);
  return (
  <ListRenderer
    noDivider
    items={notifications}
    renderLeft={(item) => (
      <Box
  className="
    flex items-center space-x-2 p-3 rounded-md 
    bg-blue-50 
    shadow-sm 
    hover:bg-blue-100 
    transition
  "
>
  <img className="w-10 h-10 rounded-full" src={item.image} />
  <Box className="flex-1">
    <Text.Header className="text-blue-600">{item.title}</Text.Header>
    <Text
      size="small"
      className="text-gray overflow-hidden text-ellipsis line-clamp-2 break-words"
    >
      {item.content}
    </Text>
  </Box>
</Box>
    )}
    renderRight={() => null} 
  />


  );
};

const NotificationPage: FC = () => {
  return (
    <Page className="bg-blue-50">
      <Header title="Thông báo" showBackIcon={false} />
      <Divider />
      <NotificationList />
    </Page>
  );
};

export default NotificationPage;
