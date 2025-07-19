import { useScrollContext } from '@/app/(main)/_layout';
import React from 'react';
import { ScrollView, ScrollViewProps } from 'react-native';

interface ScrollAwareViewProps extends ScrollViewProps {
  children: React.ReactNode;
}

export const ScrollAwareView: React.FC<ScrollAwareViewProps> = ({ 
  children, 
  onScroll,
  ...props 
}) => {
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
    <ScrollView
      {...props}
      onScroll={handleScrollEvent}
      scrollEventThrottle={16} // For smooth scroll detection
    >
      {children}
    </ScrollView>
  );
}; 