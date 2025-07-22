import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Modal,
  StyleSheet,
  Platform,
} from 'react-native';
import { Globe, Moon, Sun, Settings, ChevronRight } from 'lucide-react-native';

interface SettingsDropdownProps {
  isVisible: boolean;
  onClose: () => void;
  onLanguageChange?: (language: 'ar' | 'en') => void;
  onModeChange?: (mode: 'light' | 'dark') => void;
  onSettingsPress?: () => void;
  currentLanguage?: 'ar' | 'en';
  currentMode?: 'light' | 'dark';
}

const PILL_BG = '#f3f4f6';
const PILL_ACTIVE = '#6366f1';
const CARD_BG = '#fff';
const DIVIDER = '#e5e7eb';
const SHADOW = Platform.OS === 'ios' ? {
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 8 },
  shadowOpacity: 0.15,
  shadowRadius: 16,
} : {
  elevation: 12,
};

const SettingsDropdown: React.FC<SettingsDropdownProps> = ({
  isVisible,
  onClose,
  onLanguageChange,
  onModeChange,
  onSettingsPress,
  currentLanguage = 'en',
  currentMode = 'light',
}) => {
  const [animation] = useState(new Animated.Value(0));
  const [scaleAnimation] = useState(new Animated.Value(0.95));

  React.useEffect(() => {
    if (isVisible) {
      Animated.parallel([
        Animated.timing(animation, {
          toValue: 1,
          duration: 180,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnimation, {
          toValue: 1,
          tension: 120,
          friction: 10,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(animation, {
          toValue: 0,
          duration: 120,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnimation, {
          toValue: 0.95,
          duration: 120,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isVisible]);

  const handleLanguageToggle = () => {
    const newLanguage = currentLanguage === 'en' ? 'ar' : 'en';
    onLanguageChange?.(newLanguage);
  };

  const handleModeToggle = () => {
    const newMode = currentMode === 'light' ? 'dark' : 'light';
    onModeChange?.(newMode);
  };

  const handleSettingsPress = () => {
    onSettingsPress?.();
    onClose();
  };

  if (!isVisible) return null;

  return (
    <Modal
      transparent
      visible={isVisible}
      animationType="none"
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.18)' }}
        activeOpacity={1}
        onPress={onClose}
      >
        <Animated.View
          style={[
            styles.dropdown,
            SHADOW,
            {
              opacity: animation,
              transform: [
                { scale: scaleAnimation },
                { translateY: animation.interpolate({ inputRange: [0, 1], outputRange: [-16, 0] }) },
              ],
            },
          ]}
        >
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerText}>Quick Settings</Text>
          </View>

          {/* Language */}
          <View style={styles.section}>
            <View style={styles.row}>
              <View style={styles.iconCircleBlue}>
                <Globe size={20} color="#3b82f6" />
              </View>
              <Text style={styles.label}>Language</Text>
              <View style={{ flex: 1 }} />
              <View style={styles.pillGroup}>
                <TouchableOpacity
                  style={[styles.pill, currentLanguage === 'en' && styles.pillActive]}
                  onPress={() => onLanguageChange?.('en')}
                  activeOpacity={0.8}
                >
                  <Text style={[styles.pillText, currentLanguage === 'en' && styles.pillTextActive]}>EN</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.pill, currentLanguage === 'ar' && styles.pillActive]}
                  onPress={() => onLanguageChange?.('ar')}
                  activeOpacity={0.8}
                >
                  <Text style={[styles.pillText, currentLanguage === 'ar' && styles.pillTextActive]}>AR</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Divider */}
          <View style={styles.divider} />

          {/* Mode */}
          <View style={styles.section}>
            <View style={styles.row}>
              <View style={styles.iconCirclePurple}>
                {currentMode === 'light' ? (
                  <Sun size={20} color="#a78bfa" />
                ) : (
                  <Moon size={20} color="#a78bfa" />
                )}
              </View>
              <Text style={styles.label}>Mode</Text>
              <View style={{ flex: 1 }} />
              <View style={styles.pillGroup}>
                <TouchableOpacity
                  style={[styles.pill, currentMode === 'light' && styles.pillActive]}
                  onPress={() => onModeChange?.('light')}
                  activeOpacity={0.8}
                >
                  <Text style={[styles.pillText, currentMode === 'light' && styles.pillTextActive]}>Light</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.pill, currentMode === 'dark' && styles.pillActive]}
                  onPress={() => onModeChange?.('dark')}
                  activeOpacity={0.8}
                >
                  <Text style={[styles.pillText, currentMode === 'dark' && styles.pillTextActive]}>Dark</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Divider */}
          <View style={styles.divider} />

          {/* Settings */}
          <TouchableOpacity style={styles.section} onPress={handleSettingsPress} activeOpacity={0.7}>
            <View style={styles.row}>
              <View style={styles.iconCircleGreen}>
                <Settings size={20} color="#10b981" />
              </View>
              <Text style={styles.label}>Settings</Text>
              <View style={{ flex: 1 }} />
              <ChevronRight size={18} color="#9ca3af" />
            </View>
          </TouchableOpacity>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Tap outside to close</Text>
          </View>
        </Animated.View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  dropdown: {
    position: 'absolute',
    top: 140,
    right: 7,
    minWidth: 300,
    backgroundColor: CARD_BG,
    borderRadius: 18,
    overflow: 'hidden',
  },
  header: {
    paddingVertical: 5,
    paddingHorizontal: 22,
    backgroundColor: '#f1f5f9',
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
  },
  headerText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#334155',
    letterSpacing: 0.2,
  },
  section: {
    paddingVertical: 14,
    paddingHorizontal: 22,
    backgroundColor: CARD_BG,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconCircleBlue: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#dbeafe',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  iconCirclePurple: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#ede9fe',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  iconCircleGreen: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#d1fae5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  label: {
    fontSize: 16,
    color: '#334155',
    fontWeight: '600',
  },
  pillGroup: {
    flexDirection: 'row',
    backgroundColor: PILL_BG,
    borderRadius: 20,
    padding: 2,
    marginLeft: 10,
  },
  pill: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: 'transparent',
    marginHorizontal: 1,
  },
  pillActive: {
    backgroundColor: PILL_ACTIVE,
  },
  pillText: {
    fontSize: 14,
    color: '#64748b',
    fontWeight: '600',
  },
  pillTextActive: {
    color: '#fff',
  },
  divider: {
    height: 1,
    backgroundColor: DIVIDER,
    marginHorizontal: 0,
  },
  footer: {
    backgroundColor: '#f9fafb',
    paddingVertical: 5,
    alignItems: 'center',
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
  },
  footerText: {
    color: '#94a3b8',
    fontSize: 13,
    fontWeight: '500',
  },
});

export default SettingsDropdown; 