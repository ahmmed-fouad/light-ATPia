import { ChevronLeft, Fingerprint } from 'lucide-react-native';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AuthButton, AuthInput } from '../components';
import { BORDER_RADIUS, COLORS, FONT_SIZES, FONT_WEIGHTS, SPACING } from '../constants/design';
import { useAuthValidation } from '../hooks';
import { AuthNavigationProps } from '../types';

interface LoginScreenProps extends AuthNavigationProps {}

export const LoginScreen: React.FC<LoginScreenProps> = ({
  onNavigate,
  onGoHome,
}) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { validation, validateEmail, validatePassword, updateValidation } = useAuthValidation();

  const handleEmailChange = (email: string) => {
    setFormData(prev => ({ ...prev, email }));
    const emailValidation = validateEmail(email);
    updateValidation('email', emailValidation);
  };

  const handlePasswordChange = (password: string) => {
    setFormData(prev => ({ ...prev, password }));
    const passwordValidation = validatePassword(password);
    updateValidation('password', passwordValidation);
  };

  const handleLogin = () => {
    const emailValidation = validateEmail(formData.email);
    const passwordValidation = validatePassword(formData.password);
    
    updateValidation('email', emailValidation);
    updateValidation('password', passwordValidation);

    if (emailValidation.isValid && passwordValidation.isValid) {
      // TODO: Add actual login logic here
      onGoHome();
    }
  };

  const handleForgotPassword = () => {
    onNavigate('forgotPassword');
  };

  const handleCreateAccount = () => {
    onNavigate('register');
  };

  const handleBiometricLogin = () => {
    // Static for now - will add biometric logic later
    console.log('Biometric login pressed');
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      {/* Header */}

      <View style={styles.backButton}>
        <TouchableOpacity onPress={() => onNavigate('getInOptions')}>
          <ChevronLeft size={35} color={COLORS.text.primary} />
        </TouchableOpacity>
      </View>

      <View style={styles.header}>
        <Text style={styles.title}>Welcome Back 👋</Text>
        <Text style={styles.subtitle}>Hi there, you've been missed</Text>
      </View>

      {/* Form */}
      <View style={styles.form}>
       <View style={styles.formContainer}>
          <AuthInput
            placeholder="samantha123@email.com"
            value={formData.email}
            onChangeText={handleEmailChange}
            type="email"
            error={validation.email.message}
            keyboardType="email-address"
          />
  
          <View style={styles.passwordContainer}>
            <View style={styles.passwordInputContainer}>
              <AuthInput
                placeholder="........"
                value={formData.password}
                onChangeText={handlePasswordChange}
                type="password"
                error={validation.password.message}
              />
            </View>
  
            <TouchableOpacity
              style={styles.biometricButton}
              onPress={handleBiometricLogin}
              activeOpacity={0.8}
            >
              <Fingerprint size={28} color={COLORS.background} />
            </TouchableOpacity>
          </View>
       </View>

        {/* Forgot Password & Create Account */}
        <View style={styles.linksContainer}>
          <TouchableOpacity onPress={handleForgotPassword}>
            <Text style={styles.linkText}>Forgot password?</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleCreateAccount}>
            <Text style={styles.linkText}>Create account</Text>
          </TouchableOpacity>
        </View>

        {/* Login Button */}
        <AuthButton
          title="Login"
          onPress={handleLogin}
          variant="primary"
          size="large"
          icon="chevron-right"
          style={styles.loginButton}
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
  },
  form: {
    flex: 1,
    marginTop: SPACING.xxl,
  },
  formContainer: {
    flex: 1,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SPACING.lg,
  },
  passwordInputContainer: {
    flex: 1,
    marginRight: SPACING.md,
  },
  biometricButton: {
    backgroundColor: COLORS.secondary,
    borderRadius: BORDER_RADIUS.full,
    padding: SPACING.lg,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: SPACING.md,
  },
  linksContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: SPACING.xs,
  },
  linkText: {
    fontSize: FONT_SIZES.md,
    color: COLORS.primary,
    fontWeight: FONT_WEIGHTS.medium,
  },
  loginButton: {
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