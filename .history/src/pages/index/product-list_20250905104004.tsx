import React, { FC, Suspense } from "react";
import { Section } from "components/section";
import { useRecoilValue } from "recoil";
import { productsState } from "state";
import { Box } from "zmp-ui";
import { useNavigate } from "react-router-dom";
import { Product } from "types/product";

// ===== Product Item =====
const ProductItem: FC<{ product: Product; onClick?: () => void }> = ({ product, onClick }) => {
  return (
    <Box
      role="button"
      tabIndex={0}
      onClick={onClick}
      className="flex items-center p-4 bg-white rounded-xl shadow-md hover:shadow-lg active:scale-[0.98] transition-all duration-200"
    >
      {/* Image container with SALE badge */}
      <Box className="relative flex-shrink-0">
        <img
          src={product.image}
          alt={product.name}
          className="w-20 h-20 rounded-lg object-cover"
        />
        {product.sale && (
          <span className="absolute top-1 left-1 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-lg">
            SALE
          </span>
        )}
      </Box>

      {/* Content */}
      <Box className="ml-4 flex flex-col justify-between flex-1">
        <p className="text-base font-semibold text-gray-800 line-clamp-2">
          {product.name}
        </p>
        <p className="text-sm text-gray-500 mt-1 line-clamp-1">
          {product.description}
        </p>

        <Box className="flex items-center justify-between mt-2">
          <span className="text-blue-600 font-bold text-lg">
            {product.price.toLocaleString()}₫
          </span>
          <span className="px-3 py-1 text-xs rounded-lg bg-blue-600 text-white">
            Xem chi tiết
          </span>
        </Box>
      </Box>
    </Box>
  );
};

// ===== List Content =====
export const ProductListContent: FC = () => {
  const products = useRecoilValue(productsState);
  const navigate = useNavigate();

  return (
    <Section title="✨ Danh sách sản phẩm">
      <Box className="space-y-4">
        {products.map((product) => (
          <ProductItem
            key={product.id}
            product={product}
            onClick={() => navigate(`/product/${product.id}`)}
          />
        ))}
      </Box>
    </Section>
  );
};

// ===== Skeleton =====
export const ProductListFallback: FC = () => {
  const products = [...new Array(8)];

  return (
    <Section title="Danh sách sản phẩm">
      <Box className="grid grid-cols-2 gap-4">
        {products.map((_, i) => (
          <Box
            key={i}
            className="h-32 rounded-xl bg-gray-200 animate-pulse"
          />
        ))}
      </Box>
    </Section>
  );
};

// ===== Main Export =====
export const ProductList: FC = () => {
  return (
    <Suspense fallback={<ProductListFallback />}>
      <ProductListContent />
    </Suspense>
  );
};
