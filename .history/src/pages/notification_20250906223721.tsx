import React, { FC } from "react";
import { ListRenderer } from "components/list-renderer";
import { useRecoilValue } from "recoil";
import { notificationsState } from "state";
import { Box, Header, Page, Text } from "zmp-ui";
import { Divider } from "components/divider";

const NotificationList: FC = () => {
  const notifications = useRecoilValue(notificationsState);
  return (
    <Box className="bg-background text-blue-700 p-4 space-y-4">
      <ListRenderer
    noDivider
    items={notifications}
    renderLeft={(item) => (
      <img className="w-10 h-10 rounded-full" src={item.image} />
    )}
    renderRight={(item) => (
      <Box
        key={item.id}
        className="p-3 rounded-lg shadow-md bg-white hover:transform transition"
      >
        <Text.Header className="text-blue-700">{item.title}</Text.Header>
        <Text
          size="small"
          className="text-gray overflow-hidden whitespace-nowrap text-ellipsis"
        >
          {item.content}
        </Text>
      </Box>
    )}
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
