// import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { LucideIcon } from 'lucide-react-native';

interface GradientButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
}

export const GradientButton: React.FC<GradientButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  icon: Icon,
  iconPosition = 'left',
  fullWidth = false
}) => {
  const getGradientColors = () => {
    switch (variant) {
      case 'primary':
        return disabled 
          ? ['#d1d5db', '#9ca3af'] 
          : ['#059669', '#047857'];
      case 'secondary':
        return disabled 
          ? ['#d1d5db', '#9ca3af'] 
          : ['#3B82F6', '#2563EB'];
      case 'success':
        return disabled 
          ? ['#d1d5db', '#9ca3af'] 
          : ['#10B981', '#059669'];
      case 'warning':
        return disabled 
          ? ['#d1d5db', '#9ca3af'] 
          : ['#F59E0B', '#D97706'];
      case 'danger':
        return disabled 
          ? ['#d1d5db', '#9ca3af'] 
          : ['#EF4444', '#DC2626'];
      default:
        return disabled 
          ? ['#d1d5db', '#9ca3af'] 
          : ['#059669', '#047857'];
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return { paddingVertical: 8, paddingHorizontal: 16, fontSize: 14, iconSize: 16 };
      case 'medium':
        return { paddingVertical: 12, paddingHorizontal: 24, fontSize: 16, iconSize: 20 };
      case 'large':
        return { paddingVertical: 16, paddingHorizontal: 32, fontSize: 18, iconSize: 24 };
      default:
        return { paddingVertical: 12, paddingHorizontal: 24, fontSize: 16, iconSize: 20 };
    }
  };

  const sizeConfig = getSizeStyles();

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.button,
        {
          paddingVertical: sizeConfig.paddingVertical,
          paddingHorizontal: sizeConfig.paddingHorizontal,
          width: fullWidth ? '100%' : undefined,
        }
      ]}
      activeOpacity={disabled ? 1 : 0.8}
    >
      <LinearGradient
        colors={getGradientColors() as any}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      />
      
      <View style={styles.content}>
        {Icon && iconPosition === 'left' && (
          <Icon 
            size={sizeConfig.iconSize} 
            color="white" 
            style={{ marginRight: 8 }}
          />
        )}
        
        <Text 
          style={[
            styles.text,
            { 
              fontSize: sizeConfig.fontSize,
              opacity: disabled ? 0.6 : 1 
            }
          ]}
        >
          {title}
        </Text>
        
        {Icon && iconPosition === 'right' && (
          <Icon 
            size={sizeConfig.iconSize} 
            color="white" 
            style={{ marginLeft: 8 }}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 12,
    position: 'relative',
    shadowColor: '#a7f3d0',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: Platform.OS === 'ios' ? 0.10 : 0.13,
    shadowRadius: 6,
    elevation: 3,
  },
  gradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 12,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontWeight: '600',
    color: 'white',
  },
}); 