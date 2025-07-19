import CustomBtn from '@/components/CustomBtn';
import CustomCheckbox from '@/components/CustomCheckbox';
import CustomInput from '@/components/CustomInput';
import { images } from '@/constans';
import { router } from 'expo-router';
import { Lock, Mail } from 'lucide-react-native';
import { useState } from 'react';
import { Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [rememberMe, setRememberMe] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = () => {
    if (validateForm()) {
      // Handle login logic here
      console.log('Login data:', formData);
      router.replace('/(main)/home');
    }
  };

  const handleForgotPassword = () => {
    router.push('/(auth)/forgot-password');
  };

  const handleRegister = () => {
    router.replace('/(auth)/register');
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="flex-1 px-6 py-8">
          {/* Header with Back button */}
          <View className="flex-row justify-between items-center my-8">
            <TouchableOpacity onPress={() => router.back()}>
              <Text className="text-gray-500 text-lg">Back</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleRegister}>
              <Text className="text-blue-500 text-lg font-semibold">Sign Up</Text>
            </TouchableOpacity>
          </View>

          {/* Logo Section */}
          <View className="items-center mb-8">
            <Image 
              source={images.ATPiaLogo} 
              className="w-24 h-24 mb-4"
              resizeMode="contain"
            />
            <Text className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</Text>
            <Text className="text-gray-600 text-center text-lg">
              Sign in to continue your health journey
            </Text>
          </View>

          {/* Form Section */}
          <View className="flex-1">
            <CustomInput
              label="Email Address"
              placeholder="Enter your email"
              value={formData.email}
              onChangeText={(text) => handleInputChange('email', text)}
              IconLeft={Mail}
              keyboardType="email-address"
              error={errors.email}
            />

            <CustomInput
              label="Password"
              placeholder="Enter your password"
              value={formData.password}
              onChangeText={(text) => handleInputChange('password', text)}
              IconLeft={Lock}
              secureTextEntry
              error={errors.password}
            />

            {/* Remember Me & Forgot Password */}
            <View className="mb-6 ">
              <View className="flex-row items-center justify-between mb-3">
                <View className="flex-1 mr-4">
                  <CustomCheckbox
                    checked={rememberMe}
                    onPress={() => setRememberMe(!rememberMe)}
                    label={<Text className="text-gray-600 text-sm">Remember me</Text>}
                  />
                </View>
                <TouchableOpacity onPress={handleForgotPassword} className="flex-shrink-0">
                  <Text className="text-blue-500 text-sm font-semibold">Forgot Password?</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Login Button */}
            <CustomBtn
              title="Sign In"
              onPress={handleLogin}
              bgVariant="primary"
              className="mb-6"
            />

            {/* Divider */}
            <View className="flex-row items-center mb-6">
              <View className="flex-1 h-[1px] bg-gray-300" />
              <Text className="mx-4 text-gray-500">or</Text>
              <View className="flex-1 h-[1px] bg-gray-300" />
            </View>

            {/* Social Login Buttons */}
            <View className="space-y-3 mb-6">
              <CustomBtn
                title="Continue with Google"
                onPress={() => console.log('Google login')}
                bgVariant="outline"
                textVariant="outline"
                className="mb-3 h-14"
              />
              <CustomBtn
                title="Continue to Home"
                onPress={() => router.replace('/(main)/home')}
                bgVariant="outline"
                textVariant="outline"
                className="h-14"
              />
            </View>

            {/* Register Link */}
            <View className="items-center mb-10">
              <Text className="text-gray-600">
                Don't have an account?{' '}
                <TouchableOpacity onPress={handleRegister}>
                  <Text className="text-blue-500 font-semibold">Sign Up</Text>
                </TouchableOpacity>
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;
