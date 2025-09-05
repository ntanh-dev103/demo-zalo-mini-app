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
  <Box className="space-y-4">
    {products.map((product) => (
      <Box
        key={product.id}
        className="flex items-center p-4 bg-white rounded-xl shadow-md hover:shadow-lg hover:bg-blue-50 transition-all duration-200"
      >
        {/* Image on the left */}
        <img
          src={product.image}
          alt={product.name}
          className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
        />

        {/* Content on the right */}
        <Box className="ml-4 flex flex-col justify-between flex-1">
          <p className="text-lg font-semibold text-gray-800 line-clamp-2">
            {product.name}
          </p>
          <p className="text-sm text-gray-500 mt-1">{product.description}</p>

          <Box className="flex items-center justify-between mt-2">
            <span className="text-blue-600 font-bold text-lg">
              {product.price.toLocaleString()}₫
            </span>
            <button className="px-3 py-1 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700">
              Mua ngay
            </button>
          </Box>
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
