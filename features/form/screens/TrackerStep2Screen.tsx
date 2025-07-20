import React from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform, TouchableOpacity, Text } from 'react-native';
import { Banana, Dumbbell, Trophy } from 'lucide-react-native';
import StepHeader from '../components/StepHeader';
import StepTitle from '../components/StepTitle';
import StepFooterButton from '../../../components/StepFooterButton';
import { useFormStore } from '../stores/formStore';
import type { FormStoreState } from '../stores/formStore';
import { useFormNavigation } from '../hooks/useFormNavigation';

const TOTAL_STEPS = 8;

type GoalOption = 'lose-weight' | 'gain-weight' | 'stay-healthy';

const TrackerStep2Screen = () => {
  const { step, nextStep, prevStep } = useFormNavigation();
  const goal = useFormStore((s: FormStoreState) => s.data.goal || '');
  const setData = useFormStore((s: FormStoreState) => s.setData);

  const handleGoalSelect = (selectedGoal: GoalOption) => {
    setData({ goal: selectedGoal });
  };

  const GoalCard = ({ 
    title, 
    icon: Icon, 
    isSelected, 
    onPress, 
    iconColor = '#6B7280' 
  }: {
    title: string;
    icon: React.ComponentType<any>;
    isSelected: boolean;
    onPress: () => void;
    iconColor?: string;
  }) => (
    <TouchableOpacity
      style={[
        styles.goalCard,
        isSelected && styles.goalCardSelected
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.cardContent}>
        <Text style={[
          styles.cardTitle,
          isSelected && styles.cardTitleSelected
        ]}>
          {title}
        </Text>
        <Icon size={32} color={isSelected ? '#22C55E' : iconColor} />
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
          title="What is your goal?"
          highlight="goal?"
          subtitle="We will use this data to give you a better diet type for you"
          step={step}
          total={TOTAL_STEPS}
        />
        
        <View style={styles.optionsContainer}>
          <GoalCard
            title="Lose weight"
            icon={Banana}
            isSelected={goal === 'lose-weight'}
            onPress={() => handleGoalSelect('lose-weight')}
            iconColor="#F97316"
          />
          
          <GoalCard
            title="Gain weight"
            icon={Dumbbell}
            isSelected={goal === 'gain-weight'}
            onPress={() => handleGoalSelect('gain-weight')}
          />
          
          <GoalCard
            title="Stay healthy"
            icon={Trophy}
            isSelected={goal === 'stay-healthy'}
            onPress={() => handleGoalSelect('stay-healthy')}
            iconColor="#6B7280"
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
    marginTop: 40,
    gap: 16,
    maxHeight: 400,
  },
  goalCard: {
    backgroundColor: '#f7f7f7',
    borderRadius: 30,
    padding: 20,
    minHeight: 100,
    maxHeight: 120,
  },
  goalCardSelected: {
    backgroundColor: '#ebf6d6',
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
    fontFamily: 'Inter_600SemiBold',
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
  fallbackContainer: {
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default TrackerStep2Screen; 