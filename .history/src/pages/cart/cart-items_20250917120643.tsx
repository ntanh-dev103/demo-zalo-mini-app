renderLeft={(item) => {
  const key = JSON.stringify({
    product: item.product.id,
    options: item.options,
    quantity: item.quantity,
  });
  return (
    <Box flex className="items-center space-x-2">
      <input
        type="checkbox"
        className="w-4 h-4 rounded border-2 border-gray-300 focus:border-teal-500 focus:ring-teal-500 checked:bg-teal-500 checked:border-teal-500 transition-colors duration-200"
        checked={selectedIds.includes(key)}
        onChange={(e) => {
          e.stopPropagation(); // prevent opening product picker
          toggleSelect(key);
        }}
      />
      <img className="w-10 h-10 rounded-lg" src={item.product.image} />
    </Box>
  );
}}

renderRight={(item) => (
  <Box flex className="items-center space-x-2">
    <Box className="space-y-1 flex-1">
      <Text size="small">{item.product.name}</Text>
      <Text className="text-gray" size="xSmall">
        <FinalPrice options={item.options}>{item.product}</FinalPrice>
      </Text>
      <Text className="text-gray" size="xxxSmall">
        <DisplaySelectedOptions options={item.options}>
          {item.product}
        </DisplaySelectedOptions>
      </Text>
    </Box>
    <Box flex className="items-center space-x-1">
      <Button
        size="small"
        onClick={(e) => {
          e.stopPropagation();
          // update recoil/cart state: decrement
        }}
      >
        -
      </Button>
      <Text className="text-primary font-medium" size="small">
        {item.quantity}
      </Text>
      <Button
        size="small"
        onClick={(e) => {
          e.stopPropagation();
          // update recoil/cart state: increment
        }}
      >
        +
      </Button>
    </Box>
  </Box>
)}
renderLeft={(item) => {
  const key = JSON.stringify({
    product: item.product.id,
    options: item.options,
    quantity: item.quantity,
  });
  return (
    <Box flex className="items-center space-x-2">
      <input
        type="checkbox"
        className="w-4 h-4 rounded border-2 border-gray-300 focus:border-teal-500 focus:ring-teal-500 checked:bg-teal-500 checked:border-teal-500 transition-colors duration-200"
        checked={selectedIds.includes(key)}
        onChange={(e) => {
          e.stopPropagation(); // prevent opening product picker
          toggleSelect(key);
        }}
      />
      <img className="w-10 h-10 rounded-lg" src={item.product.image} />
    </Box>
  );
}}

renderRight={(item) => (
  <Box flex className="items-center space-x-2">
    <Box className="space-y-1 flex-1">
      <Text size="small">{item.product.name}</Text>
      <Text className="text-gray" size="xSmall">
        <FinalPrice options={item.options}>{item.product}</FinalPrice>
      </Text>
      <Text className="text-gray" size="xxxSmall">
        <DisplaySelectedOptions options={item.options}>
          {item.product}
        </DisplaySelectedOptions>
      </Text>
    </Box>
    <Box flex className="items-center space-x-1">
      <Button
        size="small"
        onClick={(e) => {
          e.stopPropagation();
          // update recoil/cart state: decrement
        }}
      >
        -
      </Button>
      <Text className="text-primary font-medium" size="small">
        {item.quantity}
      </Text>
      <Button
        size="small"
        onClick={(e) => {
          e.stopPropagation();
          // update recoil/cart state: increment
        }}
      >
        +
      </Button>
    </Box>
  </Box>
)}
