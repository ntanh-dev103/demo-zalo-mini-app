<ListRenderer
  items={[
    {
      left: <Icon icon="zi-pin" className="my-auto" />,
      right: <LocationPicker />,
    },
    {
      left: <Icon icon="zi-clock-1" className="my-auto" />,
      right: (
        <Box flex items-center className="h-12">
          <Box className="flex-1 space-y-[2px]">
            <TimePicker />
            <Text size="xSmall" className="text-gray">
              Thời gian nhận hàng
            </Text>
          </Box>
          <Icon icon="zi-chevron-right" />
        </Box>
      ),
    },
    // ...
  ]}
  renderLeft={(item) => (
    <Box className="flex items-center h-12">{item.left}</Box>
  )}
  renderRight={(item) => (
    <Box className="flex items-center h-12 flex-1 overflow-hidden">
      {item.right}
    </Box>
  )}
/>
