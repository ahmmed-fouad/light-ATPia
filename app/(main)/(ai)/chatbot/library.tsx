import { useRouter } from 'expo-router';
import { SafeAreaView, StyleSheet } from 'react-native';
import { LibraryScreen } from '../../../../features/ai/chatbot/screens/library-screen';

export default function LibraryRoute() {
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
        // Already on library
        break;
      case 'explore':
        router.push('/(main)/(ai)/chatbot/explore' as any);
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
      <LibraryScreen />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
}); 