import React from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform, TouchableOpacity, Text } from 'react-native';
import { User, UserCheck } from 'lucide-react-native';
import StepHeader from '../components/StepHeader';
import StepTitle from '../components/StepTitle';
import StepFooterButton from '@/components/StepFooterButton';
import { useFormStore } from '../stores/formStore';
import type { FormStoreState } from '../stores/formStore';
import { useFormNavigation } from '../hooks/useFormNavigation';

const TOTAL_STEPS = 8;

type GenderOption = 'male' | 'female';

const TrackerStep3Screen = () => {
  const { step, nextStep, prevStep } = useFormNavigation();
  const gender = useFormStore((s: FormStoreState) => s.data.gender || '');
  const setData = useFormStore((s: FormStoreState) => s.setData);

  const handleGenderSelect = (selectedGender: GenderOption) => {
    setData({ gender: selectedGender });
  };

  const GenderCard = ({ 
    title, 
    icon: Icon, 
    isSelected, 
    onPress 
  }: {
    title: string;
    icon: React.ComponentType<any>;
    isSelected: boolean;
    onPress: () => void;
  }) => (
    <TouchableOpacity
      style={[
        styles.genderCard,
        isSelected && styles.genderCardSelected
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.cardContent}>
        <Icon 
          size={48} 
          color={isSelected ? '#22C55E' : '#6B7280'} 
        />
        <Text style={[
          styles.cardTitle,
          isSelected && styles.cardTitleSelected
        ]}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
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
          title="What is your gender?"
          highlight="gender?"
          subtitle="We will use this data to give you a better diet type for you"
          step={step}
          total={TOTAL_STEPS}
        />
        
        <View style={styles.optionsContainer}>
          <GenderCard
            title="Male"
            icon={User}
            isSelected={gender === 'male'}
            onPress={() => handleGenderSelect('male')}
          />
          
          <GenderCard
            title="Female"
            icon={UserCheck}
            isSelected={gender === 'female'}
            onPress={() => handleGenderSelect('female')}
          />
        </View>
      </View>
      
      <View style={styles.footerBtnWrap}>
        <StepFooterButton
          progress={step / TOTAL_STEPS}
          onPress={nextStep}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  centerArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 50,
  },
  optionsContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
    marginTop: 40,
  },
  genderCard: {
    backgroundColor: '#f7f7f7',
    borderRadius: 30,
    padding: 20,
    flex: 1,
    minHeight: 100,
    maxHeight: 200,
    maxWidth: 180,
    alignItems: 'center',
    justifyContent: 'center',
  },
  genderCardSelected: {
    backgroundColor: '#ebf6d6',
  },
  cardContent: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
    fontFamily: 'Inter_600SemiBold',
    marginTop: 12,
    textAlign: 'center',
  },
  cardTitleSelected: {
    color: '#22C55E',
    fontWeight: '700',
    fontFamily: 'Inter_700Bold',
  },
  footerBtnWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 36,
  },
});

export default TrackerStep3Screen; 