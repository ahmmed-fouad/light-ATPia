import { LinearGradient } from 'expo-linear-gradient';
import { X } from 'lucide-react-native';
import React from 'react';
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SocialButton } from '../components';
import { BORDER_RADIUS, COLORS, FONT_SIZES, FONT_WEIGHTS, SPACING } from '../constants/design';
import { AuthNavigationProps } from '../types';

interface GetInOptionsScreenProps extends AuthNavigationProps {}

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

  const handleHomePress = () => {
    onGoHome();
  };

  return (
    <View style={styles.container}>
      {/* Blurred Background */}
      <ImageBackground
        source={{ uri: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80' }}
        style={styles.backgroundImage}
        blurRadius={10}
      >
        <LinearGradient
          colors={['rgba(16, 185, 129, 0.3)', 'rgba(31, 41, 55, 0.3)']}
          style={styles.overlay}
        >
          {/* Blurred Character Illustration */}
          <View style={styles.illustrationContainer}>
            <View style={styles.character} />
            <View style={styles.trophy} />
            <View style={styles.circleIcon} />
            <View style={styles.rectButton} />
          </View>
        </LinearGradient>
      </ImageBackground>

      {/* Modal Sheet */}
      <View style={styles.modalContainer}>
        <LinearGradient
          colors={['rgba(255, 255, 255, 0.95)', 'rgba(255, 255, 255, 0.98)']}
          style={styles.modal}
        >
          {/* Social Buttons */}
          <View style={styles.socialButtonsContainer}>
            <SocialButton
              type="email"
              onPress={handleEmailPress}
            />
            <View style={styles.divider} />
            <SocialButton
              type="apple"
              onPress={handleApplePress}
            />
            <View style={styles.divider} />
            <SocialButton
              type="google"
              onPress={handleGooglePress}
            />
          </View>

          {/* Home Button */}
          <TouchableOpacity
            style={styles.homeButton}
            onPress={handleHomePress}
            activeOpacity={0.8}
          >
            <X size={20} color={COLORS.error} />
            <Text style={styles.homeButtonText}>Home</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  illustrationContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  character: {
    position: 'absolute',
    top: '30%',
    left: '50%',
    width: 120,
    height: 120,
    backgroundColor: 'rgba(16, 185, 129, 0.3)',
    borderRadius: 60,
    transform: [{ translateX: -60 }],
  },
  trophy: {
    position: 'absolute',
    top: '25%',
    left: '30%',
    width: 60,
    height: 80,
    backgroundColor: 'rgba(16, 185, 129, 0.4)',
    borderRadius: 30,
  },
  circleIcon: {
    position: 'absolute',
    top: '15%',
    left: '10%',
    width: 40,
    height: 40,
    backgroundColor: 'rgba(16, 185, 129, 0.5)',
    borderRadius: 20,
  },
  rectButton: {
    position: 'absolute',
    top: '20%',
    right: '10%',
    width: 80,
    height: 40,
    backgroundColor: 'rgba(16, 185, 129, 0.4)',
    borderRadius: 20,
  },
  modalContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '65%',
  },
  modal: {
    flex: 1,
    borderTopLeftRadius: BORDER_RADIUS.xl,
    borderTopRightRadius: BORDER_RADIUS.xl,
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.xl,
    paddingBottom: SPACING.lg,
  },
  socialButtonsContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border.primary,
    marginVertical: SPACING.sm,
  },
  homeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.md,
    marginTop: SPACING.lg,
  },
  homeButtonText: {
    fontSize: FONT_SIZES.md,
    fontWeight: FONT_WEIGHTS.medium,
    color: COLORS.error,
    marginLeft: SPACING.sm,
  },
}); 