import { useRouter } from 'expo-router';
import { useState } from 'react';

export const useSettingsDropdown = () => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState<'ar' | 'en'>('en');
  const [currentMode, setCurrentMode] = useState<'light' | 'dark'>('light');

  const router = useRouter();

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const closeDropdown = () => {
    setIsDropdownVisible(false);
  };

  const handleLanguageChange = (language: 'ar' | 'en') => {
    setCurrentLanguage(language);
    // Here you would typically call your language change service
    console.log('Language changed to:', language);
  };

  const handleModeChange = (mode: 'light' | 'dark') => {
    setCurrentMode(mode);
    // Here you would typically call your theme change service
    console.log('Mode changed to:', mode);
  };

  const handleSettingsPress = () => {
    // Here you would navigate to the full settings screen
    router.push('/(main)/settings');
  };

  return {
    isDropdownVisible,
    currentLanguage,
    currentMode,
    toggleDropdown,
    closeDropdown,
    handleLanguageChange,
    handleModeChange,
    handleSettingsPress,
  };
}; 