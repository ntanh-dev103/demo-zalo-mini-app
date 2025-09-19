import React, { FC, ReactNode } from "react";
import { Box } from "zmp-ui";

interface CardProps {
  children: ReactNode;
  className?: string;
}

const Card: FC<CardProps> = ({ children, className }) => {
  return (
    <Box
      className={`bg-white rounded-xl shadow-md p-4 border border-gray-100 ${className ?? ""}`}
    >
      {children}
    </Box>
  );
};

export default Card;
