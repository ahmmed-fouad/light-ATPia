import { useCallback, useRef, useState } from 'react';
import { Animated } from 'react-native';

interface UseScrollToHideProps {
  onScroll?: (event: any) => void;
}

export const useScrollToHide = ({ onScroll }: UseScrollToHideProps = {}) => {
  const [isTopBarVisible, setIsTopBarVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const topBarAnimation = useRef(new Animated.Value(0)).current;

  const handleScroll = useCallback((event: any) => {
    const currentScrollY = event.nativeEvent.contentOffset.y;
    const isScrollingDown = currentScrollY > lastScrollY;
    const isScrollingUp = currentScrollY < lastScrollY;
    
    // Only trigger animation if scrolling is significant
    const scrollThreshold = 10;
    const scrollDifference = Math.abs(currentScrollY - lastScrollY);
    
    if (scrollDifference > scrollThreshold) {
      if (isScrollingDown && isTopBarVisible) {
        // Hide top bar completely
        setIsTopBarVisible(false);
        Animated.timing(topBarAnimation, {
          toValue: -80, // Hide completely (matches top bar height)
          duration: 300,
          useNativeDriver: true,
        }).start();
      } else if (isScrollingUp && !isTopBarVisible) {
        // Show top bar
        setIsTopBarVisible(true);
        Animated.timing(topBarAnimation, {
          toValue: 0, // Show completely
          duration: 300,
          useNativeDriver: true,
        }).start();
      }
    }
    
    setLastScrollY(currentScrollY);
    
    // Call the original onScroll if provided
    if (onScroll) {
      onScroll(event);
    }
  }, [isTopBarVisible, lastScrollY, topBarAnimation, onScroll]);

  return {
    handleScroll,
    topBarAnimation,
    isTopBarVisible,
  };
}; 