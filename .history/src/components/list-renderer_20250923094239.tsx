import React, { ReactNode, useMemo, useState } from "react";
import { Box, Button, Icon, Text } from "zmp-ui";

interface ListRendererProps<T> {
  title?: string;
  limit?: number;
  items: T[];
  renderLeft: (item: T) => ReactNode;
  renderRight: (item: T) => ReactNode;
  renderKey?: (item: T) => string;
  onClick?: (item: T) => void;
  noDivider?: boolean;
  itemClassName?: string;
}

export function ListRenderer<T>({
  title,
  items,
  limit,
  renderLeft,
  renderRight,
  renderKey,
  onClick,
  noDivider,
  itemClassName,
}: ListRendererProps<T>) {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const collapsedItems = useMemo(() => {
    return items.slice(0, limit);
  }, [items, limit]);

  const renderItems = isCollapsed ? collapsedItems : items;

  return (
    <Box className="bg-background rounded-xl">
      {title && <Text.Title className="p-4 pb-0">{title}</Text.Title>}
      <Box>
        {renderItems.map((item, idx) => (
          <Box
            key={renderKey ? renderKey(item) : idx}
            className={itemClassName}
            onClick={() => onClick?.(item)}
          >
            <Box flex className="justify-between items-center">
              {renderLeft(item)}
              {renderRight(item)}
              {!noDivider && i < list.length - 1 && (
                <hr className="absolute left-0 -right-4 -bottom-4 border-divider border-t-[0.5px]"></hr>
              )}
            </Box>
            {!noDivider && idx < renderItems.length - 1 && (
              <Box className="border-b border-gray-200 my-2" />
            )}
          </Box>
        ))}
      </Box>
      {isCollapsed && collapsedItems.length < items.length ? (
        <Box className="p-2">
          <Button
            onClick={() => setIsCollapsed(false)}
            fullWidth
            suffixIcon={<Icon icon="zi-chevron-down" />}
            variant="tertiary"
            type="neutral"
          >
            Xem thêm
          </Button>
        </Box>
      ) : (
        <Box className="w-full h-4"></Box>
      )}
    </Box>
  );
}
