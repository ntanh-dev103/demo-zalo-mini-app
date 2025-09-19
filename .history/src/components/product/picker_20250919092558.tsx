import React, { useEffect, useState } from "react";
import { Box, Button, Input, Text } from "zmp-ui";

type Product = {
  id: string;
  name: string;
  image?: string;
  description?: string;
  price: number;
};

type Review = {
  user: string;
  rating: number;
  comment: string;
};

const ProductPage: React.FC<{ product: Product }> = ({ product }) => {
  const [quantity, setQuantity] = useState(1);

  // Reviews
  const [reviews, setReviews] = useState<Review[]>([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [userName, setUserName] = useState("");

  // Load reviews from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(`reviews_${product.id}`);
    if (saved) setReviews(JSON.parse(saved));
  }, [product.id]);

  // Save reviews to localStorage
  useEffect(() => {
    localStorage.setItem(`reviews_${product.id}`, JSON.stringify(reviews));
  }, [reviews, product.id]);

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existing = cart.find((item: any) => item.product.id === product.id);
    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.push({ product, quantity });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    setQuantity(1);
    alert("Added to cart!");
  };

  const submitReview = () => {
    if (!userName.trim() || !comment.trim() || !rating) return;
    setReviews([...reviews, { user: userName, rating, comment }]);
    setUserName("");
    setComment("");
    setRating(0);
  };

  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
        ).toFixed(1)
      : "0";

  return (
    <Box className="p-4 space-y-6 max-w-xl mx-auto">
      {/* Product Info */}
      <Box className="space-y-2">
        {product.image && (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover rounded-lg shadow"
          />
        )}
        <Text.Title>{product.name}</Text.Title>
        <Text className="text-lg font-semibold text-blue-600">
          ${product.price}
        </Text>
        <Text className="text-gray-600">{product.description}</Text>
      </Box>

      {/* Cart Section */}
      <Box className="flex space-x-2 items-center">
        <Input
          type="number"
          min={1}
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
          className="w-20"
        />
        <Button variant="primary" onClick={addToCart}>
          Add to Cart
        </Button>
      </Box>

      {/* Reviews */}
      <Box className="space-y-4">
        <Text.Title>Reviews ({reviews.length})</Text.Title>
        <Text className="text-yellow-600 font-semibold">
          ⭐ {averageRating}/5
        </Text>

        {reviews.length === 0 ? (
          <Text className="text-gray-500">No reviews yet.</Text>
        ) : (
          reviews.map((r, i) => (
            <Box key={i} className="border rounded p-2 bg-gray-50">
              <Text className="font-semibold">{r.user}</Text>
              <Text>{"⭐".repeat(r.rating)}</Text>
              <Text>{r.comment}</Text>
            </Box>
          ))
        )}

        {/* Add Review */}
        <Box className="space-y-2 border-t pt-3">
          <Text className="font-semibold">Leave a Review</Text>
          <Input
            placeholder="Your name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <Input
            placeholder="Your comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <Box className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Text
                key={star}
                onClick={() => setRating(star)}
                className={`cursor-pointer text-2xl ${
                  star <= rating ? "text-yellow-500" : "text-gray-400"
                }`}
              >
                ⭐
              </Text>
            ))}
          </Box>
          <Button variant="primary" onClick={submitReview}>
            Submit Review
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ProductPage;
