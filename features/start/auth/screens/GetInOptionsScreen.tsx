import { LinearGradient } from 'expo-linear-gradient';
import LottieView from 'lottie-react-native';
import { Apple, Chrome, Mail, X } from 'lucide-react-native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { BORDER_RADIUS, COLORS, FONT_SIZES, FONT_WEIGHTS, SPACING } from '../constants/design';
import { AuthNavigationProps } from '../types';

interface GetInOptionsScreenProps extends AuthNavigationProps {}

const TrophyIllustration = () => (
  <LottieView
    source={require('../../../../assets/lottie/trophy.json')}
    autoPlay
    loop
    style={{ width: 220, height: 220 }}
  />
);

export const GetInOptionsScreen: React.FC<GetInOptionsScreenProps> = ({
  onNavigate,
  onGoHome,
}) => {
  const handleEmailPress = () => {
    onNavigate('register');
  };

  const handleApplePress = () => {
    // Static for now - will add logic later
    console.log('Apple login pressed');
  };

  const handleGooglePress = () => {
    // Static for now - will add logic later
    console.log('Google login pressed');
  };

  const handleCancelPress = () => {
    onGoHome();
  };

  return (
    <View style={styles.container}>
      {/* Blurred Background - Same as OnboardingStep3Screen */}
      <View style={styles.backgroundContainer}>
        <LinearGradient
          colors={['rgba(16, 185, 129, 0.1)', 'rgba(31, 41, 55, 0.1)']}
          style={styles.backgroundGradient}
        >
          {/* Blurred Trophy Illustration */}
          <View style={styles.illustrationContainer}>
            <View style={styles.blurredTrophy}>
              <TrophyIllustration />
            </View>
            <View style={styles.circleIcon} />
            <View style={styles.rectButton} />
          </View>
        </LinearGradient>
      </View>

      {/* Modal Sheet */}
      <View style={styles.modalContainer}>
        <View style={styles.modal}>
          {/* Social Buttons Card */}
          <View style={styles.socialButtonsCard}>
            <TouchableOpacity
              style={styles.socialButton}
              onPress={handleEmailPress}
              activeOpacity={0.8}
            >
              <Text style={styles.socialButtonText}>Continue with Email</Text>
              <Mail size={25} color="#10B981" />
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.socialButton}
              onPress={handleApplePress}
              activeOpacity={0.8}
            >
              <Text style={styles.socialButtonText}>Continue with Apple</Text>
              <Apple size={25} color={COLORS.text.primary} />
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.socialButton}
              onPress={handleGooglePress}
              activeOpacity={0.8}
            >
              <Text style={styles.socialButtonText}>Continue with Google</Text>
              <Chrome size={25} color={COLORS.secondary} />
            </TouchableOpacity>
          </View>

          {/* Cancel Button Card - Separated */}
          <View style={styles.cancelButtonCard}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={handleCancelPress}
              activeOpacity={0.8}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
              <X size={16} color={COLORS.error} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  backgroundContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundGradient: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  illustrationContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  blurredTrophy: {
    opacity: 0.3,
    transform: [{ scale: 0.8 }],
  },
  circleIcon: {
    position: 'absolute',
    top: '15%',
    left: '10%',
    width: 40,
    height: 40,
    backgroundColor: 'rgba(16, 185, 129, 0.3)',
    borderRadius: 20,
  },
  rectButton: {
    position: 'absolute',
    top: '20%',
    right: '10%',
    width: 80,
    height: 40,
    // backgroundColor: 'rgba(16, 185, 129, 0.3)',
    // borderRadius: 20,
  },
  modalContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    // borderTopLeftRadius: BORDER_RADIUS.xl,
    // borderTopRightRadius: BORDER_RADIUS.xl,
    // paddingHorizontal: SPACING.lg,
    // paddingTop: SPACING.xl,
    paddingBottom: SPACING.xl * 2,
  },
  modal: {
    flex: 1,
  },
  socialButtonsCard: {
    marginHorizontal: SPACING.md,
    marginBottom: SPACING.lg,
    backgroundColor: COLORS.background,
    borderRadius: BORDER_RADIUS.xl *1.5,
    // padding: SPACING.md,
  },
  socialButtonsContainer: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: SPACING.md,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: SPACING.lg,
    paddingHorizontal: SPACING.lg,
    // marginVertical: SPACING.xs,
    // backgroundColor: COLORS.background,
    borderRadius: BORDER_RADIUS.full,
    borderBottomWidth: 1,
    borderColor: COLORS.border.primary,
  },
  socialButtonText: {
    fontSize: FONT_SIZES.lg,
    fontWeight: FONT_WEIGHTS.medium,
    color: COLORS.text.primary,
  },
  cancelButtonCard: {
    marginHorizontal: SPACING.md,
    // marginTop: SPACING.lg,
    backgroundColor: COLORS.background,
    borderRadius: BORDER_RADIUS.full,
    paddingHorizontal: SPACING.md,
  },
  cancelButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: SPACING.lg,
    paddingHorizontal: SPACING.lg,
    backgroundColor: COLORS.background,
    borderRadius: BORDER_RADIUS.xl,
  },
  cancelButtonText: {
    fontSize: FONT_SIZES.md,
    fontWeight: FONT_WEIGHTS.medium,
    color: COLORS.error,
  },
}); 