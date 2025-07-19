import CustomBtn from '@/components/CustomBtn';
import { onboarding } from '@/constans';
import { router } from 'expo-router';
import { useRef, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Swiper from 'react-native-swiper';

const Onboarding = () => {
  const swiperRef = useRef<Swiper>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const isLastIndex = currentIndex === onboarding.length - 1;

  const handleGetStarted = () => {
    router.replace('/(auth)/register');
  };

  const handleSkip = () => {
    router.replace('/(auth)/register');
  };

  return (
    <SafeAreaView>
      <View className='flex h-full items-center justify-between bg-white'>
        <TouchableOpacity className='w-full items-end justify-end p-5 flex' onPress={handleSkip}>
          <Text className='text-black text-xl font-bold'>Skip</Text>
        </TouchableOpacity>
        <Swiper ref={swiperRef} loop={false} 
        dot={<View className='w-[32px] h-4 mx-1 bg-[#E2E8F0]' />} 
        activeDot={<View className='w-[32px] h-4 mx-1 bg-[#0286FF] rounded-full' />}
        onIndexChanged={(index) => setCurrentIndex(index)}>
           {onboarding.map((item, index) => (
            <View key={item.id} className='flex items-center justify-center p-5'>
              <Image source={item.image} className='w-full h-[300px] resizeMode-contain mb-10' />
              <Text className='text-4xl font-bold text-black mb-4'>{item.title}</Text>
              <Text className='text-gray-600 text-lg text-center px-8'>{item.description}</Text>
            </View>
           ))}
        </Swiper>
        <CustomBtn title={isLastIndex ? "Get Started" : "Next"} 
        onPress={() => {
          if (isLastIndex) {
            handleGetStarted();
          } else {
            swiperRef.current?.scrollBy(1);
          }
        }} 
          bgVariant='primary'
          className='w-11/12 h-12 my-10'
        />
      </View>
    </SafeAreaView>
  );
}

export default Onboarding
