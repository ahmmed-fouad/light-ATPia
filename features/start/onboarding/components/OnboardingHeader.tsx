import React from 'react';
import { View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import AppText from '../../../../components/AppText';
import { images } from "@/constans";

interface OnboardingHeaderProps {
  onSkip?: () => void;
  onLogin?: () => void;
  showLogin?: boolean;
}

const OnboardingHeader: React.FC<OnboardingHeaderProps> = ({
  onSkip,
  onLogin,
  showLogin,
}) => (
  <View style={styles.header}>
    <Image
      source={images.ATPiaLogo}
      style={{ width: 50, height: 50 }}
      resizeMode="contain"
    />
    <TouchableOpacity
      style={styles.actionBtn}
      onPress={showLogin ? onLogin : onSkip}
      activeOpacity={0.8}
    >
      <AppText style={styles.actionText}>
        {showLogin ? "Login" : "Skip"}
      </AppText>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 24,
    width: '100%',
  },
  actionBtn: {
    backgroundColor: '#F3F7F5',
    borderRadius: 18,
    paddingHorizontal: 24,
    paddingVertical: 8,
  },
  actionText: {
    color: '#13332B',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default OnboardingHeader; 