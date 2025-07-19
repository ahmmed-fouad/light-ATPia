import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, StyleSheet, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Loader2 } from 'lucide-react-native';

interface LoadingSpinnerProps {
  message?: string;
  size?: 'small' | 'medium' | 'large';
  color?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  message = 'Processing...',
  size = 'medium',
  color = '#059669',
}) => {
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const spinAnimation = Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      })
    );
    spinAnimation.start();

    return () => spinAnimation.stop();
  }, []);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const getSizeConfig = () => {
    switch (size) {
      case 'small':
        return { iconSize: 16, textSize: 14 };
      case 'large':
        return { iconSize: 32, textSize: 18 };
      default:
        return { iconSize: 24, textSize: 16 };
    }
  };

  const sizeConfig = getSizeConfig();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Animated.View
          style={{
            transform: [{ rotate: spin }],
          }}
        >
          <Loader2 size={sizeConfig.iconSize} color={color} />
        </Animated.View>
        
        <Text style={[styles.message, { fontSize: sizeConfig.textSize }]}>
          {message}
        </Text>
        
        <Text style={styles.subtitle}>
          Analyzing your food...
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255,255,255,0.97)',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#a7f3d0',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: Platform.OS === 'ios' ? 0.10 : 0.13,
    shadowRadius: 6,
    elevation: 3,
  },
  content: {
    alignItems: 'center',
  },
  message: {
    color: '#111827',
    fontWeight: '600',
    marginTop: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 12,
    color: '#64748b',
    textAlign: 'center',
    marginTop: 8,
  },
}); 