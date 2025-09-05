import React, { FC, Suspense } from "react";
import { Section } from "components/section";
import { useRecoilValue } from "recoil";
import { productsState } from "state";
import { Box } from "zmp-ui";
import { ProductItem } from "components/product/item";
import { ProductItemSkeleton } from "components/skeletons";

export const ProductListContent: FC = () => {
  const products = useRecoilValue(productsState);

  return (
    <Section title="✨ Danh sách sản phẩm">
      <Box className="grid grid-cols-1 gap-4">
        {products.map((product) => (
          <Box
            key={product.id}
            className="flex items-center p-4 rounded-xl shadow-md bg-white hover:shadow-lg hover:scale-[1.02] transform transition-all duration-200"
          >
            {/* Force image left + consistent size */}
            <Box className="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden bg-gray-100">
              <img
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </Box>

            {/* Product text/details using ProductItem */}
            <Box className="ml-4 flex-1">
              <ProductItem product={product} />
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
