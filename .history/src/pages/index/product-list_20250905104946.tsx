import React, { FC, Suspense } from "react";
import { Section } from "components/section";
import { useRecoilValue } from "recoil";
import { productsState } from "state";
import { Box } from "zmp-ui";
import { ProductItem } from "components/product/item";
import { ProductItemSkeleton } from "components/skeletons";

type Props = {
  product: Product;
  className?: string;
};

export const ProductItem: FC<Props> = ({ product, className }) => {
  const navigate = useNavigate();

  return (
    <Box
      className={`flex items-center p-4 rounded-xl shadow-md bg-white 
                  hover:shadow-lg hover:scale-[1.01] transform transition-all duration-200 ${className}`}
      onClick={() => navigate(`/product/${product.id}`)}
    >
      {/* Image on the left */}
      <img
        src={product.image}
        alt={product.name}
        className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
      />

      {/* Text info on the right */}
      <Box className="ml-4 flex flex-col justify-between flex-1">
        <h3 className="text-base font-semibold text-gray-900 truncate">
          {product.name}
        </h3>
        <p className="text-sm text-gray-500 line-clamp-2">
          {product.description}
        </p>
        <span className="mt-2 text-lg font-bold text-blue-600">
          {product.price.toLocaleString()}₫
        </span>
      </Box>
    </Box>
  );
};