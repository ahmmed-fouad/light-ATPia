import {
  Check,
  Eye,
  EyeOff,
  Lock,
  Mail,
  User,
  LockKeyholeOpen,
  LockKeyhole,
} from "lucide-react-native";
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { BORDER_RADIUS, COLORS, FONT_SIZES, FONT_WEIGHTS, SPACING } from '../constants/design';

interface AuthInputProps {
  label?: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  type?: 'email' | 'password' | 'text' | 'name';
  error?: string;
  icon?: React.ReactNode;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  autoCorrect?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
}

export const AuthInput: React.FC<AuthInputProps> = ({
  label,
  placeholder,
  value,
  onChangeText,
  type = 'text',
  error,
  icon,
  autoCapitalize = 'none',
  autoCorrect = false,
  keyboardType = 'default',
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  // const getIcon = () => {
  //   if (icon) return icon;
    
  //   switch (type) {
  //     case 'email':
  //       return <Mail size={20} color={isFocused ? COLORS.secondary : COLORS.text.secondary} />;
  //     case 'password':
  //       return <Lock size={20} color={isFocused ? COLORS.secondary : COLORS.text.secondary} />;
  //     case 'name':
  //       return <User size={20} color={isFocused ? COLORS.secondary : COLORS.text.secondary} />;
  //     default:
  //       return null;
  //   }
  // };

  const getInputType = () => {
    if (type === 'password') {
      return isPasswordVisible ? 'text' : 'password';
    }
    return type;
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const inputStyle = [
    styles.input,
    isFocused && styles.inputFocused,
    error && styles.inputError,
  ];

  return (
    <View style={styles.container}>
      {/* {label && <Text style={styles.label}>{label}</Text>} */}
      <View style={inputStyle}>
        <TextInput
          style={styles.textInput}
          placeholder={placeholder}
          placeholderTextColor={COLORS.text.light}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={getInputType() === "password"}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          autoCapitalize={autoCapitalize}
          autoCorrect={autoCorrect}
          keyboardType={keyboardType}
        />

        {/* {getIcon() && <View style={styles.iconContainer}>{getIcon()}</View>} */}

        {type === "password" && (
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={togglePasswordVisibility}
          >
            {/* {isPasswordVisible ? (
              <EyeOff size={20} color={COLORS.text.secondary} />
            ) : (
              <Eye size={20} color={COLORS.text.secondary} />
            )} */}
            {isPasswordVisible ? (
              <LockKeyholeOpen size={20} color="#10B981" />
            ) : (
              <LockKeyhole size={20} color="#10B981" />
            )}

          </TouchableOpacity>

        )}
        {type === "email" && (
          <View style={styles.iconContainer}>
            <Mail size={20} color="#10B981" />
          </View>
        )}
        {type === "email" && value && !error && (
          <View style={styles.checkIcon}>
            <Check size={16} color={COLORS.secondary} />
          </View>
        )}
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.md,
  },
  label: {
    fontSize: FONT_SIZES.sm,
    fontWeight: FONT_WEIGHTS.medium,
    color: COLORS.text.primary,
    marginBottom: SPACING.xs,
  },
  input: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.input.background,
    borderWidth: 1,
    borderColor: '#1F2937',
    borderRadius: BORDER_RADIUS.full,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    minHeight: 56,
  },
  inputFocused: {
    borderColor: COLORS.secondary,
    backgroundColor: COLORS.background,
  },
  inputError: {
    borderColor: COLORS.error,
  },
  iconContainer: {
    marginRight: SPACING.sm,
  },
  textInput: {
    flex: 1,
    fontSize: FONT_SIZES.md,
    color: COLORS.text.primary,
    fontWeight: FONT_WEIGHTS.normal,
  },
  eyeIcon: {
    marginLeft: SPACING.sm,
  },
  checkIcon: {
    marginLeft: SPACING.sm,
    backgroundColor: COLORS.secondary + '20',
    borderRadius: BORDER_RADIUS.full,
    padding: 2,
  },
  errorText: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.error,
    marginTop: SPACING.xs,
    marginLeft: SPACING.sm,
  },
}); 