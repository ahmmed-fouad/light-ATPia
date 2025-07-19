export interface AuthUser {
  id: string;
  name: string;
  email: string;
  password?: string;
}

export interface AuthFormData {
  name?: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

export interface ValidationResult {
  isValid: boolean;
  message: string;
}

export interface AuthValidation {
  email: ValidationResult;
  password: ValidationResult;
  name?: ValidationResult;
  confirmPassword?: ValidationResult;
}

export type AuthScreen = 'getInOptions' | 'login' | 'register' | 'forgotPassword';

export interface AuthNavigationProps {
  onNavigate: (screen: AuthScreen) => void;
  onGoHome: () => void;
} 