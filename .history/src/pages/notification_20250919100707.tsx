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
      className="
        flex items-center w-full space-x-3 p-3 
        rounded-md shadow-sm border border-gray-200 
        hover:bg-blue-200 hover:shadow-md hover:border-primary transition-all duration-200
      "
    >
      <img
        className="w-10 h-10 rounded-full flex-shrink-0"
        src={item.image}a
        alt={item.title}
      />
      <Box className="flex-1 min-w-0">
        <Text.Header
          size="small"
          className="text-blue-600 truncate"
        >
          {item.title}
        </Text.Header>
        <Text
          size="xxSmall"
          className="text-gray-600 truncate"
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
    <Page className="bg-white">
      <Header title="Thông báo" showBackIcon={false} />
      <Divider />
      <NotificationList />
    </Page>
  );
};

export default NotificationPage;
