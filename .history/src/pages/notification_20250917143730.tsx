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
      <Box className="bg-primary p-4 space-y-3">
      </Box>
      
      
    )}
    renderRight={() => null} 
  />
</Box>


  );
};

const NotificationPage: FC = () => {
  return (
    <Page className="bg-blue-200">
      <Header title="Thông báo" showBackIcon={false} />
      <Divider />
      <NotificationList />
    </Page>
  );
};

export default NotificationPage;
