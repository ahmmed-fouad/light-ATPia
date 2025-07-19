import { Apple, Chrome, Mail } from 'lucide-react-native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { BORDER_RADIUS, COLORS, FONT_SIZES, FONT_WEIGHTS, SPACING } from '../constants/design';

interface SocialButtonProps {
  type: 'email' | 'apple' | 'google';
  onPress: () => void;
  disabled?: boolean;
}

export const SocialButton: React.FC<SocialButtonProps> = ({
  type,
  onPress,
  disabled = false,
}) => {
  const getButtonConfig = () => {
    switch (type) {
      case 'email':
        return {
          title: 'Continue with Email',
          icon: <Mail size={20} color={COLORS.secondary} />,
          backgroundColor: COLORS.background,
          borderColor: COLORS.border.primary,
          textColor: COLORS.text.primary,
        };
      case 'apple':
        return {
          title: 'Continue with Apple',
          icon: <Apple size={20} color={COLORS.background} />,
          backgroundColor: COLORS.primary,
          borderColor: COLORS.primary,
          textColor: COLORS.background,
        };
      case 'google':
        return {
          title: 'Continue with Google',
          icon: <Chrome size={20} color="#4285F4" />,
          backgroundColor: COLORS.background,
          borderColor: COLORS.border.primary,
          textColor: COLORS.text.primary,
        };
      default:
        return {
          title: '',
          icon: null,
          backgroundColor: COLORS.background,
          borderColor: COLORS.border.primary,
          textColor: COLORS.text.primary,
        };
    }
  };

  const config = getButtonConfig();

  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: config.backgroundColor,
          borderColor: config.borderColor,
        },
        disabled && styles.disabled,
      ]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          {config.icon}
        </View>
        <Text style={[styles.text, { color: config.textColor }]}>
          {config.title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: BORDER_RADIUS.md,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    marginVertical: SPACING.xs,
    minHeight: 56,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  iconContainer: {
    marginRight: SPACING.md,
  },
  text: {
    fontSize: FONT_SIZES.md,
    fontWeight: FONT_WEIGHTS.medium,
  },
  disabled: {
    opacity: 0.5,
  },
}); 