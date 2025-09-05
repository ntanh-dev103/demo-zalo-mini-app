import React, { FC, Suspense } from "react";
import { Section } from "components/section";
import { useRecoilValue } from "recoil";
import { productsState } from "state";
import { Box, Text } from "zmp-ui";
import { ProductItemSkeleton } from "components/skeletons";
import { ProductItem } from "components/product/item";

export const ProductListContent: FC = () => {
  const products = useRecoilValue(productsState);

  return (
    <Section title="✨ Danh sách sản phẩm">
      <Box className="grid grid-cols-1 gap-4">
        {products.map((product) => (
          <ProductItem key={product.id} product={product}>
            {/* Custom layout */}
            <Box className="flex items-center p-4 rounded-xl shadow-md bg-white hover:shadow-lg hover:scale-[1.02] transform transition-all duration-200">
              {/* Thumbnail */}
              <Box className="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden bg-gray-100">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </Box>

              {/* Text details */}
              <Box className="ml-4 flex-1">
                <Text className="font-semibold text-base text-gray-800 line-clamp-2">
                  {product.name}
                </Text>
                <Text className="text-blue-600 font-bold mt-1">
                  {product.price.toLocaleString()}₫
                </Text>
              </Box>
            </Box>
          </ProductItem>
        ))}
      </Box>
    </Section>
  );
};

export const ProductListFallback: FC = () => {
  const products = [...new Array(12)];

  return (
    <Section title="Danh sách sản phẩm">
      <Box className="grid grid-cols-1 gap-4">
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
