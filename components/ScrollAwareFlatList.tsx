import { useScrollContext } from '@/app/(main)/_layout';
import React, { forwardRef } from 'react';
import { FlatList, FlatListProps } from 'react-native';

interface ScrollAwareFlatListProps<T> extends Omit<FlatListProps<T>, 'onScroll'> {
  data: T[];
  renderItem: ({ item, index }: { item: T; index: number }) => React.ReactElement;
  onScroll?: (event: any) => void;
}

export const ScrollAwareFlatList = forwardRef<FlatList<any>, ScrollAwareFlatListProps<any>>(({ 
  onScroll,
  ...props 
}, ref) => {
  const { handleScroll } = useScrollContext();

  const handleScrollEvent = (event: any) => {
    // Call our scroll handler
    handleScroll(event);
    
    // Call the original onScroll if provided
    if (onScroll) {
      onScroll(event);
    }
  };

  return (
    <FlatList
      {...props}
      ref={ref}
      onScroll={handleScrollEvent}
      scrollEventThrottle={16} // For smooth scroll detection
    />
  );
}); 