import { useCallback, useState } from 'react';
import { AuthValidation, ValidationResult } from '../types';

export const useAuthValidation = () => {
  const [validation, setValidation] = useState<AuthValidation>({
    email: { isValid: true, message: '' },
    password: { isValid: true, message: '' },
    name: { isValid: true, message: '' },
    confirmPassword: { isValid: true, message: '' },
  });

  const validateEmail = useCallback((email: string): ValidationResult => {
    if (!email) {
      return { isValid: false, message: 'Email is required' };
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return { isValid: false, message: 'Please enter a valid email' };
    }
    
    return { isValid: true, message: '' };
  }, []);

  const validatePassword = useCallback((password: string): ValidationResult => {
    if (!password) {
      return { isValid: false, message: 'Password is required' };
    }
    
    if (password.length < 6) {
      return { isValid: false, message: 'Password must be at least 6 characters' };
    }
    
    return { isValid: true, message: '' };
  }, []);

  const validateName = useCallback((name: string): ValidationResult => {
    if (!name) {
      return { isValid: false, message: 'Name is required' };
    }
    
    if (name.length < 2) {
      return { isValid: false, message: 'Name must be at least 2 characters' };
    }
    
    return { isValid: true, message: '' };
  }, []);

  const validateConfirmPassword = useCallback((password: string, confirmPassword: string): ValidationResult => {
    if (!confirmPassword) {
      return { isValid: false, message: 'Please confirm your password' };
    }
    
    if (password !== confirmPassword) {
      return { isValid: false, message: 'Passwords do not match' };
    }
    
    return { isValid: true, message: '' };
  }, []);

  const updateValidation = useCallback((field: keyof AuthValidation, result: ValidationResult) => {
    setValidation(prev => ({
      ...prev,
      [field]: result,
    }));
  }, []);

  const isFormValid = useCallback((formData: { email: string; password: string; name?: string; confirmPassword?: string }) => {
    const emailValidation = validateEmail(formData.email);
    const passwordValidation = validatePassword(formData.password);
    
    updateValidation('email', emailValidation);
    updateValidation('password', passwordValidation);
    
    let isValid = emailValidation.isValid && passwordValidation.isValid;
    
    if (formData.name) {
      const nameValidation = validateName(formData.name);
      updateValidation('name', nameValidation);
      isValid = isValid && nameValidation.isValid;
    }
    
    if (formData.confirmPassword) {
      const confirmPasswordValidation = validateConfirmPassword(formData.password, formData.confirmPassword);
      updateValidation('confirmPassword', confirmPasswordValidation);
      isValid = isValid && confirmPasswordValidation.isValid;
    }
    
    return isValid;
  }, [validateEmail, validatePassword, validateName, validateConfirmPassword, updateValidation]);

  return {
    validation,
    validateEmail,
    validatePassword,
    validateName,
    validateConfirmPassword,
    updateValidation,
    isFormValid,
  };
}; 