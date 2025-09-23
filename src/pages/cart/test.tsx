import React, { FC } from "react";
import { Page, Text, Box } from "zmp-ui";

const TestPage: FC = () => {
  console.log("TestPage rendering");
  
  return (
    <Page>
      <Box className="p-4 bg-white">
        <Text>Test Page</Text>
      </Box>
    </Page>
  );
};

export default TestPage;