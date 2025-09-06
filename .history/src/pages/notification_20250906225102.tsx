import React, { FC } from "react";
import { ListRenderer } from "components/list-renderer";
import { useRecoilValue } from "recoil";
import { notificationsState } from "state";
import { Box, Header, Page, Text } from "zmp-ui";
import { Divider } from "components/divider";

const NotificationList: FC = () => {
  const notifications = useRecoilValue(notificationsState);
  return (
    <Box className="">
  <ListRenderer
    noDivider
    items={notifications}
    renderLeft={(item) => (
      <Box
        className="flex items-left space-x-3 p-3 rounded-sm shadow-md transform transition-transform duration-300 hover:shadow-blue-500/40 hover:scale-105"
      >
        <img className="w-10 h-10 rounded-full" src={item.image} />
        <Box className="flex-1">
          <Text.Header className="text-blue-700">{item.title}</Text.Header>
          <Text
            size="small"
            className="text-gray overflow-hidden whitespace-nowrap text-ellipsis"
          >
            {item.content}
          </Text>
        </Box>
      </Box>
    )}
    renderRight={() => null} 
  />
</Box>


  );
};

const NotificationPage: FC = () => {
  return (
    <Page>
      <Header title="Thông báo" showBackIcon={false} />
      <Divider />
      <NotificationList />
    </Page>
  );
};

export default NotificationPage;
