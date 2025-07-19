import CustomBtn from '@/components/CustomBtn';
import CustomCheckbox from '@/components/CustomCheckbox';
import CustomInput from '@/components/CustomInput';
import { images } from '@/constans';
import { router } from 'expo-router';
import { Lock, Mail, Phone, User } from 'lucide-react-native';
import { useState } from 'react';
import { Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!acceptedTerms) {
      newErrors.terms = 'Please accept the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = () => {
    if (validateForm()) {
      // Handle registration logic here
      console.log('Form data:', formData);
      router.replace('/(auth)/login');
    }
  };

  const handleLogin = () => {
    router.replace('/(auth)/login');
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="flex-1 px-6 py-8">
          {/* Header with Skip button */}
          <View className="flex-row justify-between items-center my-8">
            <TouchableOpacity onPress={() => router.back()}>
              <Text className="text-gray-500 text-lg">Back</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.replace('/(auth)/login')}>
              <Text className="text-blue-500 text-lg font-semibold">Login</Text>
            </TouchableOpacity>
          </View>

          {/* Logo Section */}
          <View className="items-center mb-8">
            <Image 
              source={images.ATPiaLogo} 
              className="w-24 h-24 mb-4"
              resizeMode="contain"
            />
            <Text className="text-3xl font-bold text-gray-900 mb-2">Create Account</Text>
            <Text className="text-gray-600 text-center text-lg">
              Join ATPia and start your health journey today
            </Text>
          </View>

          {/* Form Section */}
          <View className="flex-1">
            <CustomInput
              label="Full Name"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChangeText={(text) => handleInputChange('fullName', text)}
              IconLeft={User}
              autoCapitalize="words"
              error={errors.fullName}
            />

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
              label="Phone Number"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChangeText={(text) => handleInputChange('phone', text)}
              IconLeft={Phone}
              keyboardType="phone-pad"
              error={errors.phone}
            />

            <CustomInput
              label="Password"
              placeholder="Create a password"
              value={formData.password}
              onChangeText={(text) => handleInputChange('password', text)}
              IconLeft={Lock}
              secureTextEntry
              error={errors.password}
            />

            <CustomInput
              label="Confirm Password"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChangeText={(text) => handleInputChange('confirmPassword', text)}
              IconLeft={Lock}
              secureTextEntry
              error={errors.confirmPassword}
            />

            {/* Terms and Conditions */}
            <CustomCheckbox
              checked={acceptedTerms}
              onPress={() => setAcceptedTerms(!acceptedTerms)}
              label={
                <Text className="text-gray-600 text-sm">
                  I agree to the{' '}
                  <Text className="text-blue-500 font-semibold">Terms of Service</Text>
                  {' '}and{' '}
                  <Text className="text-blue-500 font-semibold">Privacy Policy</Text>
                </Text>
              }
              className="mb-6"
            />
            {errors.terms && (
              <Text className="text-red-500 text-sm mb-4 ml-1">{errors.terms}</Text>
            )}

            {/* Register Button */}
            <CustomBtn
              title="Create Account"
              onPress={handleRegister}
              bgVariant="primary"
              className="mb-4"
            />

            {/* Divider */}
            <View className="flex-row items-center mb-6">
              <View className="flex-1 h-[1px] bg-gray-300" />
              <Text className="mx-4 text-gray-500">or</Text>
              <View className="flex-1 h-[1px] bg-gray-300" />
            </View>

            {/* Login Link */}
            <View className="items-center mb-10">
              <Text className="text-gray-600">
                Already have an account?{' '}
                <TouchableOpacity onPress={handleLogin}>
                  <Text className="text-blue-500 font-semibold">Sign In</Text>
                </TouchableOpacity>
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Register;
