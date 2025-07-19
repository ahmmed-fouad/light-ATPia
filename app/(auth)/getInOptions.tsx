import { useRouter } from 'expo-router';
import { GetInOptionsScreen } from '../../features/start/auth';

const GetInOptions = () => {
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
        router.push('/(auth)/forgot-password');
        break;
      case 'getInOptions':
        // Already on this screen
        break;
    }
  };

  const handleGoHome = () => {
    router.push('/(main)/home');
  };

  return (
    <GetInOptionsScreen
      onNavigate={handleNavigate}
      onGoHome={handleGoHome}
    />
  );
};

export default GetInOptions;