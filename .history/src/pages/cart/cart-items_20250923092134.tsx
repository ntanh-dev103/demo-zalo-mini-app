                return (
                  <Box flex className="items-start space-x-3">
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(
                        JSON.stringify({ product: item.product.id, options: item.options })
                      )}
                      onChange={(e) => {
                        e.stopPropagation();
                        toggleSelect(item);
                      }}
                      className="w-5 h-5 rounded-[4px] border border-gray-400 appearance-none cursor-pointer transition-all duration-200 checked:bg-blue-500 checked:border-blue-500 checked:shadow-[0_0_0_2px_white]"
                    />
                    <img
                      className="w-16 h-16 object-cover rounded-md border mr-3"
                      src={item.product.image}
                      alt={item.product.name}
                    />
                  </Box>
                );
