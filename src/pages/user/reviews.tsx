import React, { FC, useState } from "react";
import { Box, Button, Header, Page, Text } from "zmp-ui";
import { useNavigate } from "react-router";

const ReviewsPage: FC = () => {
  const navigate = useNavigate();
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");

  const handleSubmit = () => {
    if (rating === 0 || !comment.trim()) {
      alert("Vui lòng chọn số sao và nhập nhận xét!");
      return;
    }
    console.log("Đánh giá:", { rating, comment });
    alert("Cảm ơn bạn đã đánh giá!");
    navigate("/profile");
  };

  return (
    <Page>
      <Header title="Đánh giá đơn hàng" onBackClick={() => navigate(-1)} />
      <Box className="p-4 space-y-4">
        <Text.Title className="font-bold">Chọn số sao</Text.Title>
        <Box className="flex space-x-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <Button
              key={star}
              size="small"
              type={rating >= star ? "highlight" : "neutral"} // ✅ đổi thành highlight / neutral
              onClick={() => setRating(star)}
            >
              ⭐
            </Button>
          ))}
        </Box>

        {/* Textarea custom thay vì Input */}
        <Box>
          <Text className="mb-2 font-medium">Nhận xét</Text>
          <textarea
            className="w-full border rounded-lg p-2 text-sm"
            rows={3}
            placeholder="Viết nhận xét..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </Box>

        <Button
          fullWidth
          type="highlight"
          onClick={handleSubmit}
          disabled={rating === 0 || !comment.trim()}
        >
          Gửi đánh giá
        </Button>
      </Box>
    </Page>
  );
};

export default ReviewsPage;
