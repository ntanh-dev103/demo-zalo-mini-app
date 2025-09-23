import React, { FC } from "react";
import { Divider } from "components/divider";
import { Header, Page, Box, Text } from "zmp-ui";
import { CartItems } from "./cart-items";
import { CartPreview } from "./preview";
import { TermsAndPolicies } from "./term-and-policies";
import { Delivery } from "./delivery";
import { useVirtualKeyboardVisible } from "hooks";

const CartPage: FC = () => {
  const keyboardVisible = useVirtualKeyboardVisible();
  const [showTest, setShowTest] = React.useState(true);
  console.log("CartPage rendering");

  if (showTest) {
    return (
      <Page className="flex flex-col">
        <Header title="Test Page" />
        <Box className="p-4 bg-white">
          <Text className="text-primary">Test Content</Text>
          <button onClick={() => setShowTest(false)} className="mt-4 p-2 bg-blue-500 text-white rounded">
            Show Real Cart
          </button>
        </Box>
      </Page>
    );
  }

  return (
    <Page className="flex flex-col w-screen max-w-[100vw] overflow-x-hidden">
      <Header title="Giỏ hàng" showBackIcon={false} />
      <CartItems />
      <Delivery />
      <Divider size={12} />
      <TermsAndPolicies />
      <Divider size={32} className="flex-1" />
      {!keyboardVisible && <CartPreview />}
    </Page>
  );
};

export default CartPage;
