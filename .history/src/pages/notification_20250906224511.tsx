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
        className="flex items-center space-x- p-3 rounded-lg shadow-md bg-white transform transition-transform duration-300 hover:scale-105 hover:shadow-lg"
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
    renderRight={() => null} // we merge both sides into renderLeft
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
