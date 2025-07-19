import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ChevronDown } from 'lucide-react-native';

interface FormFieldProps {
  label: string;
  value: string | number;
  onChangeText: (text: string) => void;
  placeholder?: string;
  error?: string;
  type?: 'text' | 'number' | 'select';
  options?: Array<{ label: string; value: any; description?: string }>;
  onSelectOption?: (value: any) => void;
  selectedOption?: any;
  keyboardType?: 'default' | 'numeric' | 'email-address' | 'phone-pad';
  maxLength?: number;
  min?: number;
  max?: number;
  unit?: string;
  required?: boolean;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
  error,
  type = 'text',
  options,
  onSelectOption,
  selectedOption,
  keyboardType = 'default',
  maxLength,
  min,
  max,
  unit,
  required = false
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);

  const handleTextChange = (text: string) => {
    if (type === 'number') {
      const numValue = parseFloat(text);
      if (isNaN(numValue) || (min !== undefined && numValue < min) || (max !== undefined && numValue > max)) {
        return;
      }
    }
    onChangeText(text);
  };

  const getSelectedOptionLabel = () => {
    if (!selectedOption || !options) return placeholder || 'Select an option';
    const option = options.find(opt => opt.value === selectedOption);
    return option ? option.label : placeholder || 'Select an option';
  };

  const renderInput = () => {
    if (type === 'select' && options) {
      return (
        <TouchableOpacity
          onPress={() => setIsDropdownOpen(!isDropdownOpen)}
          style={styles.selectInput}
          activeOpacity={0.8}
        >
          <Text style={styles.selectText}>
            {getSelectedOptionLabel()}
          </Text>
          <ChevronDown 
            size={20} 
            color="#64748b" 
            style={{ transform: [{ rotate: isDropdownOpen ? '180deg' : '0deg' }] }}
          />
        </TouchableOpacity>
      );
    }

    return (
      <View style={styles.inputContainer}>
        <TextInput
          value={value?.toString() || ''}
          onChangeText={handleTextChange}
          placeholder={placeholder}
          placeholderTextColor="#9CA3AF"
          keyboardType={keyboardType}
          maxLength={maxLength}
          style={styles.textInput}
        />
        {unit && (
          <Text style={styles.unitText}>{unit}</Text>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>{label}</Text>
        {required && <Text style={styles.required}>*</Text>}
      </View>
      
      <View style={styles.inputWrapper}>
        {renderInput()}
        
        {error && (
          <Text style={styles.errorText}>{error}</Text>
        )}
      </View>

      {/* Dropdown Options */}
      {type === 'select' && isDropdownOpen && options && (
        <View style={styles.dropdown}>
          {options.map((option, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                onSelectOption?.(option.value);
                setIsDropdownOpen(false);
              }}
              style={[
                styles.dropdownItem,
                index === options.length - 1 && styles.dropdownItemLast
              ]}
              activeOpacity={0.8}
            >
              <Text style={styles.dropdownItemText}>{option.label}</Text>
              {option.description && (
                <Text style={styles.dropdownItemDescription}>{option.description}</Text>
              )}
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  required: {
    fontSize: 16,
    color: '#ef4444',
    marginLeft: 4,
  },
  inputWrapper: {
    position: 'relative',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#111827',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  unitText: {
    fontSize: 16,
    color: '#64748b',
    fontWeight: '500',
    marginLeft: 8,
  },
  selectInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  selectText: {
    fontSize: 16,
    color: '#111827',
    flex: 1,
  },
  errorText: {
    fontSize: 12,
    color: '#ef4444',
    marginTop: 4,
    marginLeft: 4,
  },
  dropdown: {
    marginTop: 8,
    backgroundColor: 'rgba(255,255,255,0.98)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    maxHeight: 160,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  dropdownItem: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  dropdownItemLast: {
    borderBottomWidth: 0,
  },
  dropdownItemText: {
    fontSize: 16,
    color: '#111827',
    fontWeight: '500',
  },
  dropdownItemDescription: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 2,
  },
}); 