{
  left: <Icon icon="zi-truck" className="my-auto" />, // fallback to another if zi-truck doesn't exist
  right: (
    <Box
      flex
      className="space-x-2 cursor-pointer"
      onClick={() =>
        setShipping(shipping === "standard" ? "express" : "standard")
      }
    >
      <Box className="flex-1 space-y-[2px]">
        <Text size="small" className="text-blue-500 font-bold">
          {shipping === "standard"
            ? "Giao hàng tiêu chuẩn"
            : "Giao hàng nhanh"}
        </Text>
        <Text size="xSmall" className="text-gray">
          {shipping === "standard" ? "Miễn phí" : "30.000đ"}
        </Text>
      </Box>
      <Icon icon="zi-chevron-right" />
    </Box>
  ),
}
