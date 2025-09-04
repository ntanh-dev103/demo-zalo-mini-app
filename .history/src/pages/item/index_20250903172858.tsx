import React, { useState } from "react";
import { Box, Text, Button } from "zmp-ui";

const item = {
  id: 1,
  name: "Tai Nghe Không Dây Bluetooth 5.0",
  image: "/static/logo.png",
  price: 999000,
  categoryId: ["audio"],
  description: "Âm thanh sống động, bass trầm ấm. Thiết kế công thái học, thoải mái khi đeo lâu. Tương thích đa thiết bị.",
  variants: [
    {
      id: "color",
      label: "Màu",
      type: "single",
      options: [
        { id: "black", label: "Đen" },
        { id: "white", label: "Trắng" },
      ],
      default: "black",
    },
    {
      id: "battery",
      label: "Pin",
      type: "single",
      options: [
        { id: "20h", label: "20 giờ" },
      ],
      default: "20h",
    },
  ],
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
                        <img src={item.image} alt={item.name} className="w-80 h-64 object-cover rounded-xl mb-2" />
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
                            {item.variants.map((variant) => (
                              <Box key={variant.id} className="flex items-center gap-2 mb-2">
                                <Text className="text-sm">{variant.label}:</Text>
                                {variant.options.map((opt) => (
                                  <Button
                                    key={opt.id}
                                    size="small"
                                    className={`rounded-full px-3 ${selectedOptions[variant.id] === opt.id ? "bg-primary text-white" : "bg-gray-100"}`}
                                    onClick={() => setSelectedOptions({ ...selectedOptions, [variant.id]: opt.id })}
                                  >
                                    {opt.label}
                                  </Button>
                                ))}
                              </Box>
                            ))}
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