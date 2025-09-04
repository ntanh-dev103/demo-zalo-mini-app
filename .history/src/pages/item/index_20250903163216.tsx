import React from "react";
import { Box, Text, Button } from "zmp-ui";
// import hooks or state for fetching item, comments, etc.

const ItemDetailPage = () => {
  // Replace with real data fetching logic
  const item = {
    id: "1",
    name: "Sample Item",
    image: "/static/logo.png",
    price: 100000,
    description: "This is a sample item.",
  };

  const comments = [
    { user: "Alice", text: "Great product!" },
    { user: "Bob", text: "Loved it!" },
  ];

  return (
    <Box className="p-4">
      <img src={item.image} alt={item.name} className="w-full rounded-lg mb-4" />
      <Text size="large" className="font-bold">{item.name}</Text>
      <Text className="text-primary font-medium">₫{item.price}</Text>
      <Text className="mt-2">{item.description}</Text>
      <Button className="mt-4" type="primary">Add to Cart</Button>
      <Box className="mt-6">
        <Text className="font-bold">Reviews</Text>
        {comments.map((c, i) => (
          <Box key={i} className="mt-2 p-2 bg-background rounded">
            <Text className="font-medium">{c.user}</Text>
            <Text className="block">{c.text}</Text>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ItemDetailPage;