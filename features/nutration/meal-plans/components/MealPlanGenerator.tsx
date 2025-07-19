import { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView, 
  TouchableOpacity,
  TextInput,
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AIPreferences } from '../types';

interface MealPlanGeneratorProps {
  onClose: () => void;
  onGenerate: (preferences: AIPreferences) => Promise<void>;
  isGenerating: boolean;
}

export const MealPlanGenerator: React.FC<MealPlanGeneratorProps> = ({
  onClose,
  onGenerate,
  isGenerating
}) => {
  const [preferences, setPreferences] = useState<AIPreferences>({
    dietaryRestrictions: [],
    allergies: [],
    preferredCuisines: ['mediterranean'],
    cookingSkill: 'beginner',
    availableTime: 'moderate',
    budget: 'moderate',
    mealPrepPreference: 'weekly',
    familySize: 1,
    goals: ['weight-loss']
  });

  const [selectedGoals, setSelectedGoals] = useState<string[]>(['weight-loss']);
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>(['mediterranean']);

  const goals = [
    { id: 'weight-loss', label: 'Weight Loss', icon: 'trending-down' },
    { id: 'muscle-gain', label: 'Muscle Gain', icon: 'fitness' },
    { id: 'healthy-eating', label: 'Healthy Eating', icon: 'leaf' },
    { id: 'energy-boost', label: 'Energy Boost', icon: 'flash' },
    { id: 'digestive-health', label: 'Digestive Health', icon: 'medical' }
  ];

  const cuisines = [
    { id: 'mediterranean', label: 'Mediterranean', icon: 'restaurant' },
    { id: 'asian', label: 'Asian', icon: 'restaurant' },
    { id: 'italian', label: 'Italian', icon: 'restaurant' },
    { id: 'mexican', label: 'Mexican', icon: 'restaurant' },
    { id: 'indian', label: 'Indian', icon: 'restaurant' },
    { id: 'american', label: 'American', icon: 'restaurant' }
  ];

  const cookingSkills = [
    { id: 'beginner', label: 'Beginner', description: 'Simple recipes' },
    { id: 'intermediate', label: 'Intermediate', description: 'Moderate complexity' },
    { id: 'advanced', label: 'Advanced', description: 'Complex recipes' }
  ];

  const timeOptions = [
    { id: 'quick', label: 'Quick (< 30 min)', description: 'Fast preparation' },
    { id: 'moderate', label: 'Moderate (30-60 min)', description: 'Balanced time' },
    { id: 'extensive', label: 'Extensive (> 60 min)', description: 'Detailed cooking' }
  ];

  const budgetOptions = [
    { id: 'budget-friendly', label: 'Budget Friendly', description: 'Cost-effective' },
    { id: 'moderate', label: 'Moderate', description: 'Balanced cost' },
    { id: 'premium', label: 'Premium', description: 'High-quality ingredients' }
  ];

  const handleGoalToggle = (goalId: string) => {
    setSelectedGoals(prev => 
      prev.includes(goalId) 
        ? prev.filter(id => id !== goalId)
        : [...prev, goalId]
    );
  };

  const handleCuisineToggle = (cuisineId: string) => {
    setSelectedCuisines(prev => 
      prev.includes(cuisineId) 
        ? prev.filter(id => id !== cuisineId)
        : [...prev, cuisineId]
    );
  };

  const handleGenerate = async () => {
    if (selectedGoals.length === 0) {
      Alert.alert('Error', 'Please select at least one goal');
      return;
    }

    if (selectedCuisines.length === 0) {
      Alert.alert('Error', 'Please select at least one cuisine preference');
      return;
    }

    const updatedPreferences: AIPreferences = {
      ...preferences,
      goals: selectedGoals,
      preferredCuisines: selectedCuisines
    };

    await onGenerate(updatedPreferences);
  };

  const renderSelectionGrid = (
    items: any[],
    selectedItems: string[],
    onToggle: (id: string) => void,
    multiSelect: boolean = true
  ) => (
    <View style={styles.selectionGrid}>
      {items.map((item) => (
        <TouchableOpacity
          key={item.id}
          style={[
            styles.selectionItem,
            selectedItems.includes(item.id) && styles.selectionItemSelected
          ]}
          onPress={() => onToggle(item.id)}
        >
          <Ionicons 
            name={item.icon as any} 
            size={20} 
            color={selectedItems.includes(item.id) ? 'white' : '#6B7280'} 
          />
          <Text style={[
            styles.selectionLabel,
            selectedItems.includes(item.id) && styles.selectionLabelSelected
          ]}>
            {item.label}
          </Text>
          {item.description && (
            <Text style={[
              styles.selectionDescription,
              selectedItems.includes(item.id) && styles.selectionDescriptionSelected
            ]}>
              {item.description}
            </Text>
          )}
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Ionicons name="close" size={24} color="#6B7280" />
        </TouchableOpacity>
        <Text style={styles.title}>Generate Meal Plan</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Goals Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>What are your goals?</Text>
          <Text style={styles.sectionSubtitle}>
            Select one or more goals to personalize your meal plan
          </Text>
          {renderSelectionGrid(goals, selectedGoals, handleGoalToggle)}
        </View>

        {/* Cuisine Preferences */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Cuisine Preferences</Text>
          <Text style={styles.sectionSubtitle}>
            Choose your favorite cuisines
          </Text>
          {renderSelectionGrid(cuisines, selectedCuisines, handleCuisineToggle)}
        </View>

        {/* Cooking Skill */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Cooking Skill Level</Text>
          <Text style={styles.sectionSubtitle}>
            How experienced are you in the kitchen?
          </Text>
          {renderSelectionGrid(cookingSkills, [preferences.cookingSkill], (id) => 
            setPreferences(prev => ({ ...prev, cookingSkill: id as any }))
          )}
        </View>

        {/* Available Time */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Available Time</Text>
          <Text style={styles.sectionSubtitle}>
            How much time can you spend on meal prep?
          </Text>
          {renderSelectionGrid(timeOptions, [preferences.availableTime], (id) => 
            setPreferences(prev => ({ ...prev, availableTime: id as any }))
          )}
        </View>

        {/* Budget */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Budget Preference</Text>
          <Text style={styles.sectionSubtitle}>
            What's your budget for ingredients?
          </Text>
          {renderSelectionGrid(budgetOptions, [preferences.budget], (id) => 
            setPreferences(prev => ({ ...prev, budget: id as any }))
          )}
        </View>

        {/* Family Size */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Family Size</Text>
          <Text style={styles.sectionSubtitle}>
            How many people are you cooking for?
          </Text>
          <View style={styles.familySizeContainer}>
            {[1, 2, 3, 4, 5].map((size) => (
              <TouchableOpacity
                key={size}
                style={[
                  styles.familySizeButton,
                  preferences.familySize === size && styles.familySizeButtonSelected
                ]}
                onPress={() => setPreferences(prev => ({ ...prev, familySize: size }))}
              >
                <Text style={[
                  styles.familySizeText,
                  preferences.familySize === size && styles.familySizeTextSelected
                ]}>
                  {size}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.generateButton, isGenerating && styles.generateButtonDisabled]}
          onPress={handleGenerate}
          disabled={isGenerating}
        >
          {isGenerating ? (
            <>
              <Ionicons name="hourglass-outline" size={20} color="white" />
              <Text style={styles.generateButtonText}>Generating...</Text>
            </>
          ) : (
            <>
              <Ionicons name="sparkles" size={20} color="white" />
              <Text style={styles.generateButtonText}>Generate Meal Plan</Text>
            </>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  closeButton: {
    padding: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  placeholder: {
    width: 32,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 16,
    lineHeight: 20,
  },
  selectionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  selectionItem: {
    width: '48%',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  selectionItemSelected: {
    backgroundColor: '#10B981',
    borderColor: '#10B981',
  },
  selectionLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginTop: 4,
    textAlign: 'center',
  },
  selectionLabelSelected: {
    color: 'white',
  },
  selectionDescription: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 2,
  },
  selectionDescriptionSelected: {
    color: 'rgba(255, 255, 255, 0.8)',
  },
  familySizeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  familySizeButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  familySizeButtonSelected: {
    backgroundColor: '#10B981',
    borderColor: '#10B981',
  },
  familySizeText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
  },
  familySizeTextSelected: {
    color: 'white',
  },
  footer: {
    padding: 16,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  generateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#10B981',
    paddingVertical: 16,
    borderRadius: 8,
  },
  generateButtonDisabled: {
    backgroundColor: '#9CA3AF',
  },
  generateButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
}); 