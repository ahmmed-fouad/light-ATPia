import CustomBtn from '@/components/CustomBtn';
import CustomInput from '@/components/CustomInput';
import { images } from '@/constans';
import { router } from 'expo-router';
import { Mail } from 'lucide-react-native';
import { useState } from 'react';
import { Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateEmail = () => {
    if (!email.trim()) {
      setError('Email is required');
      return false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email');
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = () => {
    if (validateEmail()) {
      // Handle password reset logic here
      console.log('Reset password for:', email);
      setIsSubmitted(true);
    }
  };

  const handleBackToLogin = () => {
    router.replace('/(auth)/login');
  };

  const handleResendEmail = () => {
    setIsSubmitted(false);
    setEmail('');
    setError('');
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
            <TouchableOpacity onPress={handleBackToLogin}>
              <Text className="text-blue-500 text-lg font-semibold">Sign In</Text>
            </TouchableOpacity>
          </View>

          {/* Logo Section */}
          <View className="items-center mb-8">
            <Image 
              source={images.ATPiaLogo} 
              className="w-24 h-24 mb-4"
              resizeMode="contain"
            />
            <Text className="text-3xl font-bold text-gray-900 mb-2">
              {isSubmitted ? 'Check Your Email' : 'Forgot Password'}
            </Text>
            <Text className="text-gray-600 text-center text-lg">
              {isSubmitted 
                ? 'We\'ve sent you a password reset link'
                : 'Enter your email to reset your password'
              }
            </Text>
          </View>

          {/* Content Section */}
          <View className="flex-1">
            {!isSubmitted ? (
              <>
                {/* Email Input */}
                <CustomInput
                  label="Email Address"
                  placeholder="Enter your email address"
                  value={email}
                  onChangeText={(text) => {
                    setEmail(text);
                    if (error) setError('');
                  }}
                  IconLeft={Mail}
                  keyboardType="email-address"
                  error={error}
                />

                {/* Instructions */}
                <View className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
                  <Text className="text-blue-800 text-sm leading-5">
                    We'll send you a link to reset your password. Make sure to check your spam folder if you don't see it in your inbox.
                  </Text>
                </View>

                {/* Submit Button */}
                <CustomBtn
                  title="Send Reset Link"
                  onPress={handleSubmit}
                  bgVariant="primary"
                  className="mb-6"
                />
              </>
            ) : (
              <>
                {/* Success State */}
                <View className="bg-green-50 border border-green-200 rounded-xl p-6 mb-6">
                  <View className="items-center">
                    <View className="w-16 h-16 bg-green-100 rounded-full items-center justify-center mb-4">
                      <Text className="text-green-600 text-2xl">✓</Text>
                    </View>
                    <Text className="text-green-800 text-lg font-semibold mb-2">
                      Email Sent Successfully!
                    </Text>
                    <Text className="text-green-700 text-center text-sm leading-5">
                      We've sent a password reset link to{' '}
                      <Text className="font-semibold">{email}</Text>
                    </Text>
                  </View>
                </View>

                {/* Action Buttons */}
                <View className="space-y-3 mb-6">
                  <CustomBtn
                    title="Open Email App"
                    onPress={() => console.log('Open email app')}
                    bgVariant="primary"
                  />
                  <CustomBtn
                    title="Resend Email"
                    onPress={handleResendEmail}
                    bgVariant="outline"
                    textVariant="outline"
                  />
                </View>
              </>
            )}

            {/* Divider */}
            <View className="flex-row items-center mb-6">
              <View className="flex-1 h-[1px] bg-gray-300" />
              <Text className="mx-4 text-gray-500">or</Text>
              <View className="flex-1 h-[1px] bg-gray-300" />
            </View>

            {/* Back to Login */}
            <View className="items-center mb-10">
              <Text className="text-gray-600">
                Remember your password?{' '}
                <TouchableOpacity onPress={handleBackToLogin}>
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

export default ForgotPassword;
