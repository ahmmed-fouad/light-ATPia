import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { ChevronDown } from 'lucide-react-native';

interface FormFieldProps {
  label: string;
  value: string | number;
  onChangeText: (text: string) => void;
  placeholder?: string;
  error?: string;
  touched?: boolean;
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
  touched,
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
          style={[
            styles.selectInput,
            error && touched && styles.selectInputError
          ]}
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
          style={[
            styles.textInput,
            error && touched && styles.textInputError
          ]}
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
        
        {error && touched && (
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
    marginBottom: 6,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif',
    letterSpacing: 0.2,
  },
  required: {
    fontSize: 14,
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
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 15,
    color: '#374151',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    minHeight: 44,
  },
  textInputError: {
    borderWidth: 1.5,
    borderColor: '#ef4444',
  },
  unitText: {
    fontSize: 15,
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
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    minHeight: 44,
  },
  selectInputError: {
    borderWidth: 1.5,
    borderColor: '#ef4444',
  },
  selectText: {
    fontSize: 15,
    color: '#374151',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif',
    flex: 1,
  },
  errorText: {
    fontSize: 12,
    color: '#ef4444',
    marginTop: 4,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif',
  },
  dropdown: {
    marginTop: 8,
    backgroundColor: 'rgba(255,255,255,0.98)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    maxHeight: 160,
    shadowColor: '#a7f3d0',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  dropdownItem: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  dropdownItemLast: {
    borderBottomWidth: 0,
  },
  dropdownItemText: {
    fontSize: 15,
    color: '#374151',
    fontWeight: '500',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif',
  },
  dropdownItemDescription: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 2,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif',
  },
}); 