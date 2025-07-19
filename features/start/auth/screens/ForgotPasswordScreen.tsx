import { ChevronLeft } from 'lucide-react-native';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AuthButton, AuthInput } from '../components';
import { BORDER_RADIUS, COLORS, FONT_SIZES, FONT_WEIGHTS, SPACING } from '../constants/design';
import { useAuthValidation } from '../hooks';
import { AuthNavigationProps } from '../types';

interface ForgotPasswordScreenProps extends AuthNavigationProps {}

export const ForgotPasswordScreen: React.FC<ForgotPasswordScreenProps> = ({
  onNavigate,
  onGoHome,
}) => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { validation, validateEmail, updateValidation } = useAuthValidation();

  const handleEmailChange = (emailValue: string) => {
    setEmail(emailValue);
    const emailValidation = validateEmail(emailValue);
    updateValidation('email', emailValidation);
  };

  const handleResetPassword = () => {
    const emailValidation = validateEmail(email);
    updateValidation('email', emailValidation);

    if (emailValidation.isValid) {
      // TODO: Add actual password reset logic here
      setIsSubmitted(true);
    }
  };

  const handleBackToLogin = () => {
    onNavigate('login');
  };

  if (isSubmitted) {
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.successContainer}>
          <View style={styles.successIcon}>
            <Text style={styles.successIconText}>✓</Text>
          </View>
          
          <Text style={styles.successTitle}>Check Your Email</Text>
          <Text style={styles.successSubtitle}>
            We've sent a password reset link to {email}
          </Text>
          
          <AuthButton
            title="Back to Login"
            onPress={handleBackToLogin}
            variant="primary"
            size="large"
            style={styles.backButton}
          />
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      {/* Back Button */}
      <View style={styles.backButton}>
        <TouchableOpacity onPress={() => onNavigate('login')}>
          <ChevronLeft size={35} color={COLORS.text.primary} />
        </TouchableOpacity>
      </View>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Reset Password 🔐</Text>
        <Text style={styles.subtitle}>Enter your email to receive reset instructions</Text>
      </View>

      {/* Form */}
      <View style={styles.form}>
        <View style={styles.formContainer}>
          <AuthInput
            placeholder="Enter your email address"
            value={email}
            onChangeText={handleEmailChange}
            type="email"
            error={validation.email.message}
            keyboardType="email-address"
          />
        </View>

        {/* Back to Login Link */}
        <View style={styles.backLinkContainer}>
          <Text style={styles.backLinkText}>Remember your password? </Text>
          <TouchableOpacity onPress={handleBackToLogin}>
            <Text style={styles.backLinkButton}>Back to Login</Text>
          </TouchableOpacity>
        </View>

        {/* Reset Button */}
        <AuthButton
          title="Send Reset Link"
          onPress={handleResetPassword}
          variant="primary"
          size="large"
          icon="chevron-right"
          style={styles.resetButton}
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
  backLinkContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: SPACING.xs,
  },
  backLinkText: {
    fontSize: FONT_SIZES.md,
    color: COLORS.text.secondary,
  },
  backLinkButton: {
    fontSize: FONT_SIZES.md,
    color: COLORS.primary,
    fontWeight: FONT_WEIGHTS.medium,
  },
  resetButton: {
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: SPACING.lg,
    marginBottom: SPACING.xxl * 1.3,
    borderRadius: BORDER_RADIUS.full,
    paddingVertical: SPACING.lg,
    paddingHorizontal: SPACING.xl,
    backgroundColor: "#173430",
  },
  successContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SPACING.lg,
  },
  successIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.lg,
  },
  successIconText: {
    fontSize: FONT_SIZES.xxxl,
    color: COLORS.background,
    fontWeight: FONT_WEIGHTS.bold,
  },
  successTitle: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.text.primary,
    marginBottom: SPACING.sm,
    textAlign: 'center',
  },
  successSubtitle: {
    fontSize: FONT_SIZES.md,
    color: COLORS.text.secondary,
    textAlign: 'center',
    marginBottom: SPACING.xl,
  },
}); 