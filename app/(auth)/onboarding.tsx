import { useRouter } from 'expo-router';
import { View } from "react-native";
import OnboardingFlow from "../../features/start/onboarding/OnboardingFlow";

const Onboarding = () => {
  const router = useRouter();

  const handleFinish = () => {
    // Navigate to GetInOptions screen
    router.push("/(auth)/getInOptions");
  };

  const handleLogin = () => {
    // Navigate to login screen
    router.push("/(auth)/login");
  };

  return (
    <View style={{ flex: 1 }}>
      <OnboardingFlow onFinish={handleFinish} onLogin={handleLogin} />
    </View>
  );
};

export default Onboarding;