import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { ChevronRight, ChevronLeft } from "lucide-react-native";
import { COLORS, SPACING, BORDER_RADIUS, FONT_SIZES, FONT_WEIGHTS } from '../constants/design';

interface AuthButtonProps {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "outline" | "text";
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  loading?: boolean;
  icon?: "chevron-right" | "chevron-left" | React.ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const AuthButton: React.FC<AuthButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  icon,
  style,
  textStyle,
}) => {
  const getButtonStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      borderRadius: BORDER_RADIUS.md,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
    };

    switch (variant) {
      case 'primary':
        return {
          ...baseStyle,
          backgroundColor: disabled ? COLORS.text.light : COLORS.primary,
        };
      case 'secondary':
        return {
          ...baseStyle,
          backgroundColor: disabled ? COLORS.text.light : COLORS.secondary,
        };
      case 'outline':
        return {
          ...baseStyle,
          backgroundColor: 'transparent',
          borderWidth: 1,
          borderColor: disabled ? COLORS.text.light : COLORS.primary,
        };
      case 'text':
        return {
          ...baseStyle,
          backgroundColor: 'transparent',
        };
      default:
        return baseStyle;
    }
  };

  const getTextStyle = (): TextStyle => {
    const baseStyle: TextStyle = {
      fontWeight: FONT_WEIGHTS.semibold,
    };

    switch (variant) {
      case 'primary':
        return {
          ...baseStyle,
          // color: "#18b888",
          color: COLORS.background,
        };
      case 'secondary':
        return {
          ...baseStyle,
          color: COLORS.background,
        };
      case 'outline':
        return {
          ...baseStyle,
          color: disabled ? COLORS.text.light : COLORS.primary,
        };
      case 'text':
        return {
          ...baseStyle,
          color: disabled ? COLORS.text.light : COLORS.primary,
        };
      default:
        return baseStyle;
    }
  };

  const getSizeStyle = (): ViewStyle => {
    switch (size) {
      case 'small':
        return {
          paddingHorizontal: SPACING.md,
          paddingVertical: SPACING.sm,
          minHeight: 40,
        };
      case 'large':
        return {
          paddingHorizontal: SPACING.lg,
          paddingVertical: SPACING.md,
          minHeight: 56,
        };
      default:
        return {
          paddingHorizontal: SPACING.lg,
          paddingVertical: SPACING.md,
          minHeight: 48,
        };
    }
  };

  const getTextSize = (): number => {
    switch (size) {
      case 'small':
        return FONT_SIZES.sm;
      case 'large':
        return FONT_SIZES.lg;
      default:
        return FONT_SIZES.md;
    }
  };

  const renderIcon = () => {
    if (loading) {
      return null; // You can add a loading spinner here
    }

    if (typeof icon === 'string') {
      switch (icon) {
        case "chevron-right":
          return (
            <ChevronRight
              size={25}
              color="#18b888"
              style={{ marginLeft: SPACING.sm }}
            />
          );
        case "chevron-left":
          return (
            <ChevronLeft
              size={25}
              color={getTextStyle().color}
              style={{ marginRight: SPACING.sm }}
            />
          );
        default:
          return null;
      }
    }

    return icon;
  };

  return (
    <TouchableOpacity
      style={[getButtonStyle(), getSizeStyle(), style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {icon === "chevron-left" && renderIcon()}
      <Text style={[getTextStyle(), { fontSize: getTextSize() }, textStyle]}>
        {loading ? "Loading..." : title}
      </Text>
      {(icon === "chevron-right" || (icon && typeof icon !== "string")) &&
        renderIcon()}
    </TouchableOpacity>
  );
}; 