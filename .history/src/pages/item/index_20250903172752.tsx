import React, { useState } from "react";
import { Box, Text, Button } from "zmp-ui";

const item = {
  name: "Tai Nghe Không Dây Bluetooth 5.0",
  price: 999000,
  images: [
    "/static/headphone-1.jpg",
    "/static/headphone-2.jpg",
    "/static/headphone-3.jpg",
    "/static/headphone-4.jpg",
  ],
  options: [
    { label: "Màu", values: ["Đen", "Trắng"] },
    { label: "Pin", values: ["20 giờ"] },
  ],
  description:
    "Âm thanh sống động, bass trầm ấm. Thiết kế công thái học, thoải mái khi đeo lâu. Tương thích đa thiết bị.",
  rating: 4.9,
  sold: 1200,
  isNew: true,
};

const ItemDetailPage = () => {
  const [selectedImage, setSelectedImage] = useState(item.images[0]);
  const [selectedOptions, setSelectedOptions] = useState({
    "Màu": item.options[0].values[0],
    "Pin": item.options[1].values[0],
  });

  return (
    <Box className="p-4 max-w-4xl mx-auto">
      <Text className="text-3xl font-bold mb-2">
        Chi Tiết Sản Phẩm:{" "}
        <span className="text-primary">Thông Tin Toàn Diện</span>
      </Text>
      <Box className="flex flex-col md:flex-row gap-6">
        {/* Image Gallery */}
        <Box>
          <img
            src={selectedImage}
            alt={item.name}
            className="w-96 h-72 object-cover rounded-xl mb-2"
          />
          <Box className="flex gap-2">
            {item.images.map((img, idx) => (
              <img
                key={img}
                src={img}
                alt={`Thumb${idx + 1}`}
                className={`w-16 h-16 object-cover rounded-lg border-2 ${
                  selectedImage === img
                    ? "border-primary"
                    : "border-transparent"
                }`}
                onClick={() => setSelectedImage(img)}
                style={{ cursor: "pointer" }}
              />
            ))}
          </Box>
        </Box>
        {/* Info */}
        <Box className="flex-1">
          <Box className="flex items-center gap-2 mb-2">
            <Text className="text-2xl font-bold">{item.name}</Text>
            {item.isNew && (
              <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs font-semibold">
                Mới nhất
              </span>
            )}
          </Box>
          <Text className="text-primary text-3xl font-bold mb-2">
            {item.price.toLocaleString()} VNĐ
          </Text>
          {/* Options */}
          <Box className="mb-4">
            <Text className="font-semibold">Tuỳ chọn:</Text>
            <Box className="flex gap-2 mt-2 flex-wrap">
              {item.options.map((opt) => (
                <Box key={opt.label} className="flex items-center gap-2">
                  <Text className="text-sm">{opt.label}:</Text>
                  {opt.values.map((val) => (
                    <Button
                      key={val}
                      size="small"
                      className={`rounded-full px-3 ${
                        selectedOptions[opt.label] === val
                          ? "bg-primary text-white"
                          : "bg-gray-100"
                      }`}
                      onClick={() =>
                        setSelectedOptions({
                          ...selectedOptions,
                          [opt.label]: val,
                        })
                      }
                    >
                      {val}
                    </Button>
                  ))}
                </Box>
              ))}
            </Box>
          </Box>
          {/* Actions */}
          <Box className="flex gap-4 mb-4">
            <Button type="highlight" className="flex-1">
              Thêm vào giỏ hàng
            </Button>
            <Button type="neutral" className="flex-1">
              Mua ngay
            </Button>
          </Box>
        </Box>
      </Box>
      {/* Description and Reviews */}
      <Box className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <Box className="col-span-1 bg-background p-4 rounded-xl">
          <Text className="font-bold mb-2">Mô tả ngắn gọn</Text>
          <Text>{item.description}</Text>
        </Box>
        <Box className="col-span-1 bg-background p-4 rounded-xl">
          <Text className="font-bold mb-2">Đánh giá từ cộng đồng</Text>
          <Text className="text-yellow-500 text-xl mb-1">★★★★★</Text>
          <Text>4.9/5.0 | Đã bán {item.sold.toLocaleString()}</Text>
        </Box>
        <Box className="col-span-1 bg-background p-4 rounded-xl">
          <Text className="font-bold mb-2">
            Tầm quan trọng của trang sản phẩm
          </Text>
          <Text>
            Trang chi tiết sản phẩm rõ ràng, hấp dẫn trực tiếp thúc đẩy quyết
            định mua hàng và tăng tỷ lệ chuyển đổi.
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default ItemDetailPage;