import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform, TouchableOpacity, Text, Modal, ScrollView } from 'react-native';
import { Calendar, ChevronDown, ChevronUp } from 'lucide-react-native';
import StepHeader from '../components/StepHeader';
import StepTitle from '../components/StepTitle';
import StepFooterButton from '../../../components/StepFooterButton';
import CustomInput from '../../../components/CustomInput';
import { useFormStore } from '../stores/formStore';
import type { FormStoreState } from '../stores/formStore';
import { useFormNavigation } from '../hooks/useFormNavigation';

const TOTAL_STEPS = 8;

const TrackerStep4Screen = () => {
  const { step, nextStep, prevStep } = useFormNavigation();
  const birthDate = useFormStore((s: FormStoreState) => s.data.birthDate || '');
  const setData = useFormStore((s: FormStoreState) => s.setData);
  
  const [selectedDate, setSelectedDate] = useState(new Date(1999, 1, 23)); // February 23, 1999
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDay, setSelectedDay] = useState(23);
  const [selectedMonth, setSelectedMonth] = useState(1); // 0-indexed
  const [selectedYear, setSelectedYear] = useState(1999);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const years = Array.from({ length: 76 }, (_, i) => 1950 + i); // 1950 to 2025
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  const handleDateConfirm = () => {
    const newDate = new Date(selectedYear, selectedMonth, selectedDay);
    setSelectedDate(newDate);
    setData({ birthDate: newDate.toISOString() });
    setShowDatePicker(false);
  };

  const DatePickerColumn = ({ 
    values, 
    selectedValue, 
    onValueChange, 
    isMonth = false,
    isYear = false
  }: {
    values: (string | number)[];
    selectedValue: number;
    onValueChange: (value: number) => void;
    isMonth?: boolean;
    isYear?: boolean;
  }) => {
    const handleIncrement = () => {
      let newValue: number;
      if (isMonth) {
        newValue = selectedValue < 11 ? selectedValue + 1 : 0;
      } else if (isYear) {
        newValue = selectedValue < 2025 ? selectedValue + 1 : 1950;
      } else {
        newValue = selectedValue < 31 ? selectedValue + 1 : 1;
      }
      onValueChange(newValue);
    };

    const handleDecrement = () => {
      let newValue: number;
      if (isMonth) {
        newValue = selectedValue > 0 ? selectedValue - 1 : 11;
      } else if (isYear) {
        newValue = selectedValue > 1950 ? selectedValue - 1 : 2025;
      } else {
        newValue = selectedValue > 1 ? selectedValue - 1 : 31;
      }
      onValueChange(newValue);
    };

    const getDisplayValue = () => {
      if (isMonth) {
        return values[selectedValue];
      } else if (isYear) {
        return values[selectedValue - 1950];
      } else {
        return values[selectedValue - 1];
      }
    };

    const getLabel = () => {
      if (isMonth) return 'Month';
      if (isYear) return 'Year';
      return 'Day';
    };

    return (
      <View style={styles.pickerColumn}>
        <Text style={styles.pickerLabel}>
          {getLabel()}
        </Text>
        
        <TouchableOpacity
          style={styles.arrowButton}
          onPress={handleDecrement}
        >
          <ChevronUp size={16} color="#6B7280" />
        </TouchableOpacity>
        
        <View style={styles.selectedValueContainer}>
          <Text style={styles.selectedValueText}>
            {getDisplayValue()}
          </Text>
        </View>
        
        <TouchableOpacity
          style={styles.arrowButton}
          onPress={handleIncrement}
        >
          <ChevronDown size={16} color="#6B7280" />
        </TouchableOpacity>
      </View>
    );
  };

  const formatDate = (date: Date) => {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const month = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month} / ${day} / ${year}`;
  };

  const getDayFromDate = (date: Date) => {
    return date.getDate().toString();
  };

  // Helper to calculate age from date of birth
  const getAgeFromDate = (date: Date) => {
    const today = new Date();
    let age = today.getFullYear() - date.getFullYear();
    const m = today.getMonth() - date.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < date.getDate())) {
      age--;
    }
    return age;
  };

  const DayDisplayCard = () => (
    <View style={styles.dayDisplayCard}>
      <Text style={styles.dayNumber}>{getAgeFromDate(selectedDate)}</Text>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: '#fff' }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <StepHeader
        onBack={prevStep}
        onSkip={nextStep}
      />
      <View style={styles.centerArea}>
        <StepTitle
          title="Your date of birth"
          highlight="date of birth"
          subtitle="We will use this data to give you a better diet type for you"
          step={step}
          total={TOTAL_STEPS}
        />
        
        <View style={styles.contentContainer}>
          <DayDisplayCard />
          
          <View style={styles.dateInputContainer}>
            <TouchableOpacity
              style={styles.dateInputTouchable}
              onPress={() => setShowDatePicker(true)}
            >
              <CustomInput
                value={formatDate(selectedDate)}
                onChangeText={() => {}}
                placeholder="Select your date of birth"
                variant="filled"
                inputStyle={styles.dateInputText}
                style={styles.dateInputBox}
                IconRight={Calendar}
                editable={false}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      
      <View style={styles.footerBtnWrap}>
        <StepFooterButton
          progress={step / TOTAL_STEPS}
          onPress={nextStep}
        />
      </View>

      {showDatePicker && (
        <Modal
          transparent={true}
          animationType="fade"
          visible={showDatePicker}
          onRequestClose={() => setShowDatePicker(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Select Date of Birth</Text>
              
              <View style={styles.datePickerContainer}>
                {/* Day Picker */}
                <DatePickerColumn
                  values={days}
                  selectedValue={selectedDay}
                  onValueChange={setSelectedDay}
                />

                {/* Month Picker */}
                <DatePickerColumn
                  values={months}
                  selectedValue={selectedMonth}
                  onValueChange={setSelectedMonth}
                  isMonth={true}
                />

                {/* Year Picker */}
                <DatePickerColumn
                  values={years}
                  selectedValue={selectedYear}
                  onValueChange={setSelectedYear}
                  isYear={true}
                />
              </View>

              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => setShowDatePicker(false)}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.confirmButton}
                  onPress={handleDateConfirm}
                >
                  <Text style={styles.confirmButtonText}>Confirm</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  centerArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  contentContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 40,
  },
  dayDisplayCard: {
    backgroundColor: '#ebf6d6',
    borderRadius: 24,
    padding: 40,
    minHeight: 80,
    minWidth: 375,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  dayNumber: {
    fontSize: 48,
    fontWeight: '700',
    color: '#374151',
    fontFamily: 'Inter_700Bold',
  },
  dateInputContainer: {
    width: '100%',
    alignItems: 'center',
  },
  dateInputTouchable: {
    width: '100%',
  },
  dateInputBox: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    borderColor: 'transparent',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 0,
    minHeight: 48,
  },
  dateInputText: {
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    paddingVertical: 10,
    fontFamily: 'Inter_600SemiBold',
    color: '#374151',
    // backgroundColor: 'red',
  },
  footerBtnWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 36,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    width: '100%',
    maxWidth: 320,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 24,
    fontFamily: 'Inter_600SemiBold',
    textAlign: 'center',
  },
  datePickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 24,
  },
  pickerColumn: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  pickerLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#6B7280',
    marginBottom: 8,
    fontFamily: 'Inter_500Medium',
  },
  arrowButton: {
    padding: 6,
    borderRadius: 4,
    backgroundColor: '#f9fafb',
    marginVertical: 4,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 28,
    minHeight: 28,
  },
  selectedValueContainer: {
    backgroundColor: '#f0f9ff',
    borderRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 6,
    marginVertical: 6,
    minWidth: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#22C55E',
  },
  selectedValueText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#22C55E',
    fontFamily: 'Inter_600SemiBold',
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 4,
  },
  cancelButton: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#22C55E',
    borderRadius: 6,
    backgroundColor: 'white',
  },
  cancelButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#22C55E',
    fontFamily: 'Inter_500Medium',
  },
  confirmButton: {
    backgroundColor: '#22C55E',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  confirmButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    fontFamily: 'Inter_600SemiBold',
  },
});

export default TrackerStep4Screen; 