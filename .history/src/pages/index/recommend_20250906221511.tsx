import { FinalPrice } from "components/display/final-price";
import { DisplayPrice } from "components/display/price";
import { ProductPicker } from "components/product/picker";
import { Section } from "components/section";
import { ProductSlideSkeleton } from "components/skeletons";
import React, { Suspense } from "react";
import { FC } from "react";
import { useRecoilValue } from "recoil";
import { recommendProductsState } from "state";
import { Swiper, SwiperSlide } from "swiper/react";
import { Box, Text } from "zmp-ui";

export const RecommendContent: FC = () => {
  const recommendProducts = useRecoilValue(recommendProductsState);

  return (
    <Box className="bg-blue-50 rounded-xl shadow-lg shadow-blue-500/30 text p-2">
      <Section title="Sản phẩm gợi ý" padding="title-only">
        <Swiper slidesPerView={1.25} spaceBetween={16} className="px-2">
          {recommendProducts.map((product) => (
            <SwiperSlide key={product.id}>
              <ProductPicker product={product}>
                {({ open }) => (
                  <div onClick={open} className="space-y-3">
                    <Box
                      className="relative aspect-video rounded-lg bg-cover bg-center bg-skeleton shadow-md"
                      style={{ backgroundImage: `url(${product.image})` }}
                    >
                      {product.sale && (
                        <Text
                          size="xxxxSmall"
                          className="absolute right-2 top-2 uppercase bg-green-500 text-white h-4 px-[6px] rounded-full"
                        >
                          Giảm{" "}
                          {product.sale.type === "percent" ? (
                            `${product.sale.percent}%`
                          ) : (
                            <DisplayPrice>{product.sale.amount}</DisplayPrice>
                          )}
                        </Text>
                      )}
                    </Box>
                    <Box className="space-y-1">
                      <Text size="small" className="font-medium text-gray-800">
                        {product.name}
                      </Text>
                      <Text
                        size="xSmall"
                        className="line-through text-gray-400"
                      >
                        <DisplayPrice>{product.price}</DisplayPrice>
                      </Text>
                      <Text size="large" className="font-semibold text-blue-600">
                        <FinalPrice>{product}</FinalPrice>
                      </Text>
                    </Box>
                  </div>
                )}
              </ProductPicker>
            </SwiperSlide>
          ))}
        </Swiper>
      </Section>
    </Box>
  );
};

export const RecommendFallback: FC = () => {
  const recommendProducts = [...new Array(3)];

  return (
    <Section title="Sản phẩm gợi ý" padding="title-only">
      <Swiper slidesPerView={1.25} spaceBetween={16} className="px-4">
        {recommendProducts.map((_, i) => (
          <SwiperSlide key={i}>
            <ProductSlideSkeleton />
          </SwiperSlide>
        ))}
      </Swiper>
    </Section>
  );
};

export const Recommend: FC = () => {
  return (
    <Suspense fallback={<RecommendFallback />}>
      <RecommendContent />
    </Suspense>
  );
};
