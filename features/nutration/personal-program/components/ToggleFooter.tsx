import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Activity } from '../types/personalProgramTypes';
import ActivityCard from './ActivityCard';

// const { height } = Dimensions.get('window');

interface ToggleFooterProps {
  open: boolean;
  onToggle: () => void;
  activities: Activity[];
}

const ToggleFooter: React.FC<ToggleFooterProps> = ({ open, onToggle, activities }) => {
  const router = useRouter();
  const anim = useRef(new Animated.Value(0)).current;
  
  useEffect(() => {
    Animated.timing(anim, {
      toValue: open ? 1 : 0,
      duration: 350,
      useNativeDriver: false,
    }).start();
  }, [open]);

  const CLOSED_OFFSET = 535; // Only the handle remains visible (tweak as needed)
  const translateY = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [CLOSED_OFFSET, 0],
  });

  const contentOpacity = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  // const footerHeight = anim.interpolate({
  //   inputRange: [0, 1],
  //   outputRange: [120, 320],
  // });

  const handleActivityPress = (activity: Activity) => {
    switch (activity.label.toLowerCase()) {
      case 'track your food':
        router.push('/(main)/(nutrition)/days-meals' as any);
        break;
      case 'balance your meals':
        router.push('/(main)/(nutrition)/personal-program' as any);
        break;
      case 'drink more water':
        router.push('/(main)/(tracking)/tracker' as any);
        break;
      case 'check your progress':
        router.push('/(main)/(tracking)/profile' as any);
        break;
      default:
        // Default navigation or no action
        break;
    }
  };

  return (
    <Animated.View 
      style={[
        styles.footer, 
        { 
          transform: [{ translateY }],
          // minHeight: footerHeight
        }
      ]}
      pointerEvents="box-none"
    > 
    {/* <Text>Hello</Text> */}
      <TouchableOpacity 
        style={styles.handle} 
        onPress={() => {
          console.log('Handle pressed!');
          onToggle();
        }}
      >
        {/* <View style={styles.handleBar} /> */}
        <Feather 
          name={open ? "chevron-down" : "chevron-up"} 
          size={26} 
          color="#fff" 
          style={styles.handleIcon}
        />
      </TouchableOpacity>
      
      {/* Content that fades in/out */}
      <Animated.View 
        style={[
          styles.content,
          { opacity: contentOpacity }
        ]}
        pointerEvents={open ? 'auto' : 'none'}
      >
        <Text style={styles.title}>How to reach your goal</Text>
        <Text style={styles.subtitle}>Do these 4 activities</Text>
        
        <View style={styles.grid}>
          {activities.map((a) => (
            <ActivityCard 
              key={a.label} 
              label={a.label} 
              icon={a.icon} 
              onPress={() => handleActivityPress(a)}
            />
          ))}
        </View>
      </Animated.View>
      
      {/* <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Explore home</Text>
        <Feather name="arrow-right" size={20} color="#fff" />
      </TouchableOpacity> */}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: -110,
    marginBottom: 0,
    backgroundColor: '#13332B',
    borderRadius: 32,
    paddingHorizontal: 14,
    marginHorizontal: 37,
    paddingBottom: 90,
    zIndex: 0,
  },
  handle: {
    alignItems: 'center',
    marginBottom: 16,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  // handleBar: {
  //   width: 90,
  //   height: 4,
  //   borderRadius: 2,
  //   backgroundColor: '#fff',
  //   marginBottom: 8,
  // },
  handleIcon: {
    marginTop: 0,
  },
  content: {
    flex: 1,
  },
  title: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 20,
    marginBottom: 9,
    textAlign: 'center',
  },
  subtitle: {
    color: '#74d4b8',
    fontSize: 16,
    marginBottom: 34,
    textAlign: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 34,
  },
  button: {
    backgroundColor: '#18b888',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
    paddingHorizontal: 24,
    flexDirection: 'row',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 18,
  },
});

export default ToggleFooter; 