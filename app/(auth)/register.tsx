import React from 'react';
import { useRouter } from 'expo-router';
import { RegisterScreen } from '../../features/start/auth';

const Register = () => {
  const router = useRouter();

  const handleNavigate = (screen: 'getInOptions' | 'login' | 'register' | 'forgotPassword') => {
    switch (screen) {
      case 'login':
        router.push('/(auth)/login');
        break;
      case 'register':
        // Already on this screen
        break;
      case 'forgotPassword':
        router.push('/(auth)/forgot-password');
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
    <RegisterScreen
      onNavigate={handleNavigate}
      onGoHome={handleGoHome}
    />
  );
};

export default Register;