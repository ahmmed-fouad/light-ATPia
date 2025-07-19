import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import AppText from '../../../../components/AppText';
import Svg, { Path } from 'react-native-svg';

interface OnboardingHeaderProps {
  onSkip?: () => void;
  onLogin?: () => void;
  showLogin?: boolean;
}

const OnboardingHeader: React.FC<OnboardingHeaderProps> = ({ onSkip, onLogin, showLogin }) => (
  <View style={styles.header}>
    <Svg width={40} height={40} viewBox="0 0 40 40">
      {/* Simple apple logo icon */}
      <Path d="M20 6c2-2 5-2 7 0 2 2 2 5 0 7-2 2-5 2-7 0-2-2-2-5 0-7z" fill="#22C55E"/>
      <Path d="M10 20c0-5 5-10 10-10s10 5 10 10-5 15-10 15S10 25 10 20z" fill="none" stroke="#22C55E" strokeWidth={2}/>
    </Svg>
    <TouchableOpacity
      style={styles.actionBtn}
      onPress={showLogin ? onLogin : onSkip}
      activeOpacity={0.8}
    >
      <AppText style={styles.actionText}>{showLogin ? 'Login' : 'Skip'}</AppText>
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