import React, { FC, MouseEventHandler } from "react";
import { Box, Icon, Text } from "zmp-ui";

export interface ProductListItemProps {
  image: string;
  title: string;
  subtitle: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
}

export const ProductListItem: FC<ProductListItemProps> = ({
  image,
  title,
  subtitle,
  onClick,
}) => {
  return (
    <Box
      flex
      align="center"
      className="p-3 rounded-xl bg-white shadow-md hover:shadow-lg hover:scale-[1.01] transition-all duration-200"
      onClick={onClick}
    >
      {/* Image on the left */}
      <img
        src={image}
        alt={title}
        className="w-16 h-16 rounded-lg object-cover mr-3 flex-shrink-0"
      />

      {/* Description in the middle */}
      <Box className="flex-1 space-y-1">
        <Text size="small" className="font-semibold text-base text-gray-800">
          {title}
        </Text>
        <Text size="xSmall" className="text-gray-500">
          {subtitle}
        </Text>
      </Box>

      {/* Chevron on the right */}
      <Icon icon="zi-chevron-right" className="text-gray-400" />
    </Box>
  );
};
