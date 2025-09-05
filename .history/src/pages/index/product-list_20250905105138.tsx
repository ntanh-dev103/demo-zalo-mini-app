import React, { FC, Suspense } from "react";
import { Section } from "components/section";
import { useRecoilValue } from "recoil";
import { productsState } from "state";
import { Box } from "zmp-ui";
import { useNavigate } from "react-router-dom";
import { ProductItemSkeleton } from "components/skeletons";

export const ProductListContent: FC = () => {
  const products = useRecoilValue(productsState);
  const navigate = useNavigate();

  return (
    <Section title="✨ Danh sách sản phẩm">
      <Box className="grid grid-cols-1 gap-4">
        {products.map((product) => (
          <Box
            key={product.id}
            className="flex items-center p-4 rounded-xl shadow-md bg-white hover:shadow-lg hover:scale-[1.01] transform transition-all duration-200"
            
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
        ))}
      </Box>
    </Section>
  );
};

export const ProductListFallback: FC = () => {
  const products = [...new Array(12)];
  return (
    <Section title="Danh sách sản phẩm">
      <Box className="grid grid-cols-2 gap-4">
        {products.map((_, i) => (
          <ProductItemSkeleton key={i} />
        ))}
      </Box>
    </Section>
  );
};

export const ProductList: FC = () => {
  return (
    <Suspense fallback={<ProductListFallback />}>
      <ProductListContent />
    </Suspense>
  );
};
