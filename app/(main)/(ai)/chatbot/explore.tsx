import { useRouter } from 'expo-router';
import { SafeAreaView, StyleSheet } from 'react-native';
import { ExploreScreen } from '../../../../features/ai/chatbot/screens/explore-screen';

export default function ExploreRoute() {
  const router = useRouter();

  const handleNewChat = () => {
    // Create new chat logic
  };

  const handleSelectChat = (chatId: string) => {
    router.push(`/(main)/(ai)/chatbot/(chat)/${chatId}` as any);
  };

  const handleSelectSection = (section: 'chats' | 'library' | 'explore') => {
    switch (section) {
      case 'library':
        router.push('/(main)/(ai)/chatbot/library' as any);
        break;
      case 'explore':
        // Already on explore
        break;
    }
  };

  const handleProfilePress = () => {
    // Navigate to profile
  };

  const handleSettingsPress = () => {
    // Navigate to settings
  };

  return (
    <SafeAreaView style={styles.container}>
      <ExploreScreen />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
}); 