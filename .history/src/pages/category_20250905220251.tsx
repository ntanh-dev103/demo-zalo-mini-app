import { ProductItem } from "components/product/item";
import React, { FC, Suspense } from "react";
import { useRecoilValue } from "recoil";
import {
  categoriesState,
  productsByCategoryState,
  selectedCategoryIdState,
} from "state";
import { Box, Header, Page, Tabs, Text } from "zmp-ui";

const CategoryPicker: FC = () => {
  const categories = useRecoilValue(categoriesState);
  const selectedCategory = useRecoilValue(selectedCategoryIdState);
  return (
    <Tabs
      scrollable
      defaultActiveKey={selectedCategory}
      className="category-tabs"
    >
      {categories.map((category) => (
        <Tabs.Tab key={category.id} label={category.name}>
          <Suspense>
            <CategoryProducts categoryId={category.id} />
          </Suspense>
        </Tabs.Tab>
      ))}
    </Tabs>
  );
};

const CategoryProducts: FC<{ categoryId: string }> = ({ categoryId }) => {
  const productsByCategory = useRecoilValue(
    productsByCategoryState(categoryId),
  );

  if (productsByCategory.length === 0) {
  return (
    <Box className="flex-1 p-4 flex justify-center items-center">
      <Box className="bg-white border border-blue-200 rounded-lg shadow-md shadow-blue-500/20 p-6">
        <Text size="small" className="text-blue-600 font-medium">
          Không có sản phẩm trong danh mục
        </Text>
      </Box>
    </Box>
  );
}

return (
  <Box className="bg-background grid grid-cols-2 gap-5 p-1">
    {productsByCategory.map((product) => (
      <Box
        key={product.id}
        className="overflow-hidden bg-white border border-blue-200 p-2 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transform transition-all duration-300"
      >
        <ProductItem product={product} />
      </Box>
    ))}
  </Box>
);

};

const CategoryPage: FC = () => {
  return (
    <Page className="flex flex-col bg-background">
      <Header
        title="Danh mục"
        className="bg-blue-700 text-white shadow-md"
      />
      <Box className="flex-1 p-2">
        <CategoryPicker />
      </Box>
    </Page>
  );
};


export default CategoryPage;
