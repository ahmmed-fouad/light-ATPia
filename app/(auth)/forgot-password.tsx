import React from 'react';
import { useRouter } from 'expo-router';
import { ForgotPasswordScreen } from '../../features/start/auth';

const ForgotPassword = () => {
  const router = useRouter();

  const handleNavigate = (screen: 'getInOptions' | 'login' | 'register' | 'forgotPassword') => {
    switch (screen) {
      case 'login':
        router.push('/(auth)/login');
        break;
      case 'register':
        router.push('/(auth)/register');
        break;
      case 'forgotPassword':
        // Already on this screen
        break;
      case 'getInOptions':
        router.push('/(auth)/getInOptions');
        break;
    }
  };

  const handleGoHome = () => {
    router.push('/(main)/home');
  };

  return (
    <ForgotPasswordScreen
      onNavigate={handleNavigate}
      onGoHome={handleGoHome}
    />
  );
};

export default ForgotPassword;