import { useRouter } from 'expo-router';
import { LoginScreen } from '../../features/start/auth';

const Login = () => {
  const router = useRouter();

  const handleNavigate = (screen: 'getInOptions' | 'login' | 'register' | 'forgotPassword') => {
    switch (screen) {
      case 'login':
        // Already on this screen
        break;
      case 'register':
        router.push('/(auth)/register');
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
    <LoginScreen
      onNavigate={handleNavigate}
      onGoHome={handleGoHome}
    />
  );
};

export default Login;