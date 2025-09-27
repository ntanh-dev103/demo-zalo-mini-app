import React from "react";
import { FC } from "react";
import { Box, Input, useNavigate } from "zmp-ui";

export const Inquiry: FC = () => {
  const navigate = useNavigate();
  return (
    <Box p={4} className="bg-primary">
      <Input.Search
        onFocus={() => navigate("/search")}
        placeholder="Tìm sản phẩm ..."
      />
    </Box>
  );
};
