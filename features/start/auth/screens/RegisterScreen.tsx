import { ChevronLeft } from 'lucide-react-native';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AuthButton, AuthInput } from '../components';
import { BORDER_RADIUS, COLORS, FONT_SIZES, FONT_WEIGHTS, SPACING } from '../constants/design';
import { useAuthValidation } from '../hooks';
import { AuthNavigationProps } from '../types';

interface RegisterScreenProps extends AuthNavigationProps {}

export const RegisterScreen: React.FC<RegisterScreenProps> = ({
  onNavigate,
  onGoHome,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const { validation, validateEmail, validatePassword, validateName, validateConfirmPassword, updateValidation } = useAuthValidation();

  const handleNameChange = (name: string) => {
    setFormData(prev => ({ ...prev, name }));
    const nameValidation = validateName(name);
    updateValidation('name', nameValidation);
  };

  const handleEmailChange = (email: string) => {
    setFormData(prev => ({ ...prev, email }));
    const emailValidation = validateEmail(email);
    updateValidation('email', emailValidation);
  };

  const handlePasswordChange = (password: string) => {
    setFormData(prev => ({ ...prev, password }));
    const passwordValidation = validatePassword(password);
    updateValidation('password', passwordValidation);
    
    // Re-validate confirm password if it exists
    if (formData.confirmPassword) {
      const confirmPasswordValidation = validateConfirmPassword(password, formData.confirmPassword);
      updateValidation('confirmPassword', confirmPasswordValidation);
    }
  };

  const handleConfirmPasswordChange = (confirmPassword: string) => {
    setFormData(prev => ({ ...prev, confirmPassword }));
    const confirmPasswordValidation = validateConfirmPassword(formData.password, confirmPassword);
    updateValidation('confirmPassword', confirmPasswordValidation);
  };

  const handleRegister = () => {
    const nameValidation = validateName(formData.name);
    const emailValidation = validateEmail(formData.email);
    const passwordValidation = validatePassword(formData.password);
    const confirmPasswordValidation = validateConfirmPassword(formData.password, formData.confirmPassword);
    
    updateValidation('name', nameValidation);
    updateValidation('email', emailValidation);
    updateValidation('password', passwordValidation);
    updateValidation('confirmPassword', confirmPasswordValidation);

    if (nameValidation.isValid && emailValidation.isValid && passwordValidation.isValid && confirmPasswordValidation.isValid) {
      // TODO: Add actual registration logic here
      onGoHome();
    }
  };

  const handleLogin = () => {
    onNavigate('login');
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      {/* Back Button */}
      <View style={styles.backButton}>
        <TouchableOpacity onPress={() => onNavigate('getInOptions')}>
          <ChevronLeft size={35} color={COLORS.text.primary} />
        </TouchableOpacity>
      </View>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Create Account 👋</Text>
        <Text style={styles.subtitle}>Join us and start your healthy journey</Text>
      </View>

      {/* Form */}
      <View style={styles.form}>
        <View style={styles.formContainer}>
          <AuthInput
            placeholder="Enter your full name"
            value={formData.name}
            onChangeText={handleNameChange}
            type="name"
            error={validation.name?.message}
            autoCapitalize="words"
          />

          <AuthInput
            placeholder="Enter your email"
            value={formData.email}
            onChangeText={handleEmailChange}
            type="email"
            error={validation.email.message}
            keyboardType="email-address"
          />

          <AuthInput
            placeholder="Create a password"
            value={formData.password}
            onChangeText={handlePasswordChange}
            type="password"
            error={validation.password.message}
          />

          <AuthInput
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChangeText={handleConfirmPasswordChange}
            type="password"
            error={validation.confirmPassword?.message}
          />
        </View>

        {/* Login Link */}
        <View style={styles.loginLinkContainer}>
          <Text style={styles.loginLinkText}>Already have an account? </Text>
          <TouchableOpacity onPress={handleLogin}>
            <Text style={styles.loginLinkButton}>Login</Text>
          </TouchableOpacity>
        </View>

        {/* Register Button */}
        <AuthButton
          title="Create Account"
          onPress={handleRegister}
          variant="primary"
          size="large"
          icon="chevron-right"
          style={styles.registerButton}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  contentContainer: {
    flexGrow: 1,
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.xl,
  },
  backButton: {
    position: "absolute",
    top: SPACING.lg,
    left: SPACING.lg,
    backgroundColor: "#f7f7f7",
    borderRadius: BORDER_RADIUS.full,
    padding: SPACING.lg,
  },
  header: {
    alignItems: "center",
    marginTop: SPACING.xxl * 3,
    marginBottom: SPACING.xxl,
  },
  title: {
    fontSize: FONT_SIZES.xxxl,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.text.primary,
    marginBottom: SPACING.sm,
  },
  subtitle: {
    fontSize: FONT_SIZES.md,
    color: COLORS.text.secondary,
    textAlign: 'center',
  },
  form: {
    flex: 1,
    marginTop: SPACING.xxl,
  },
  formContainer: {
    flex: 1,
  },
  loginLinkContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: SPACING.xs,
  },
  loginLinkText: {
    fontSize: FONT_SIZES.md,
    color: COLORS.text.secondary,
  },
  loginLinkButton: {
    fontSize: FONT_SIZES.md,
    color: COLORS.primary,
    fontWeight: FONT_WEIGHTS.medium,
  },
  registerButton: {
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: SPACING.lg,
    marginBottom: SPACING.xxl * 1.3,
    borderRadius: BORDER_RADIUS.full,
    paddingVertical: SPACING.lg,
    paddingHorizontal: SPACING.xl,
    backgroundColor: "#173430",
  },
}); 