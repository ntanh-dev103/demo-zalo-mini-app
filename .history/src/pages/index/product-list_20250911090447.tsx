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
    <Box className="p-4 bg-blue-100">
      <text className="text-lg font-bold text-blue-600 mb-4">Danh sách sản phẩm</text>
    <Section title="Danh sách sản phẩm">
  <Box className="grid grid-cols-2 gap-6 p-2">
    {products.map((product) => (
      <Box
        key={product.id}
        className="overflow-hidden bg-white p-2 rounded-md shadow-2xl hover:shadow-blue-500/70 hover:scale-110 transform transition-all duration-200 border border-transparent hover:border-blue-300">
        <ProductItem product={product} />
      </Box>
    ))}
  </Box>
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
