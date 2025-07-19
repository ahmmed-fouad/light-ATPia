import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Calculator, User, Activity, Target, Utensils } from 'lucide-react-native';
import { useCalculator } from '../../hooks/useCalculator';
import { FormField } from './FormField';

export const CalculatorForm: React.FC = () => {
  const {
    form,
    handleFormChange,
    validateField,
    activityLevels,
    goals,
    dietaryPreferences
  } = useCalculator();

  const handleFieldChange = (field: keyof typeof form, value: any) => {
    handleFormChange(field, value);
  };

  return (
    <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        {/* Personal Information Section */}
        <View style={styles.formSection}>
          <View style={styles.sectionHeader}>
            <User size={20} color="#059669" />
            <Text style={styles.sectionTitle}>Personal Information</Text>
          </View>

          <View style={styles.fieldsContainer}>
            <FormField
              label="Age"
              value={form.age}
              onChangeText={(text) => handleFieldChange('age', parseInt(text) || 0)}
              placeholder="Enter your age"
              type="number"
              keyboardType="numeric"
              min={10}
              max={100}
              required
              error={validateField('age')}
            />

            <FormField
              label="Gender"
              value={form.gender}
              onChangeText={(text) => handleFieldChange('gender', text)}
              type="select"
              options={[
                { label: 'Female', value: 'female' },
                { label: 'Male', value: 'male' }
              ]}
              selectedOption={form.gender}
              onSelectOption={(value) => handleFieldChange('gender', value)}
              required
              error={validateField('gender')}
            />

            <FormField
              label="Height"
              value={form.height}
              onChangeText={(text) => handleFieldChange('height', parseInt(text) || 0)}
              placeholder="Enter height"
              type="number"
              keyboardType="numeric"
              min={100}
              max={250}
              unit="cm"
              required
              error={validateField('height')}
            />

            <FormField
              label="Weight"
              value={form.weight}
              onChangeText={(text) => handleFieldChange('weight', parseInt(text) || 0)}
              placeholder="Enter weight"
              type="number"
              keyboardType="numeric"
              min={30}
              max={250}
              unit="kg"
              required
              error={validateField('weight')}
            />
          </View>
        </View>

        {/* Activity & Goals Section */}
        <View style={styles.formSection}>
          <View style={styles.sectionHeader}>
            <Activity size={20} color="#3B82F6" />
            <Text style={styles.sectionTitle}>Activity & Goals</Text>
          </View>

          <View style={styles.fieldsContainer}>
            <FormField
              label="Activity Level"
              value={form.activity}
              onChangeText={(text) => handleFieldChange('activity', parseFloat(text) || 0)}
              type="select"
              options={activityLevels.map(level => ({
                label: level.label,
                value: level.value,
                description: level.description
              }))}
              selectedOption={form.activity}
              onSelectOption={(value) => handleFieldChange('activity', value)}
              required
              error={validateField('activity')}
            />

            <FormField
              label="Goal"
              value={form.goal}
              onChangeText={(text) => handleFieldChange('goal', parseInt(text) || 0)}
              type="select"
              options={goals.map(goal => ({
                label: goal.label,
                value: goal.value,
                description: goal.description
              }))}
              selectedOption={form.goal}
              onSelectOption={(value) => handleFieldChange('goal', value)}
              required
              error={validateField('goal')}
            />
          </View>
        </View>

        {/* Dietary Preferences Section */}
        <View style={styles.formSection}>
          <View style={styles.sectionHeader}>
            <Utensils size={20} color="#F59E0B" />
            <Text style={styles.sectionTitle}>Dietary Preferences</Text>
          </View>

          <View style={styles.fieldsContainer}>
            <FormField
              label="Dietary Preference"
              value={form.dietaryPref}
              onChangeText={(text) => handleFieldChange('dietaryPref', text)}
              type="select"
              options={dietaryPreferences.map(pref => ({
                label: pref.label,
                value: pref.value,
                description: pref.description
              }))}
              selectedOption={form.dietaryPref}
              onSelectOption={(value) => handleFieldChange('dietaryPref', value)}
              required
              error={validateField('dietaryPref')}
            />

            <FormField
              label="Meals per Day"
              value={form.meals}
              onChangeText={(text) => handleFieldChange('meals', parseInt(text) || 0)}
              placeholder="Number of meals"
              type="number"
              keyboardType="numeric"
              min={1}
              max={8}
              required
              error={validateField('meals')}
            />

            <FormField
              label="Allergies (optional)"
              value={form.allergies}
              onChangeText={(text) => handleFieldChange('allergies', text)}
              placeholder="e.g. peanuts, gluten, dairy"
              type="text"
              maxLength={200}
            />
          </View>
        </View>

        {/* Optional Measurements Section */}
        <View style={styles.formSection}>
          <View style={styles.sectionHeader}>
            <Calculator size={20} color="#10B981" />
            <Text style={styles.sectionTitle}>Optional Measurements</Text>
          </View>

          <View style={styles.fieldsContainer}>
            <FormField
              label="Body Fat % (optional)"
              value={form.bodyFat || ''}
              onChangeText={(text) => handleFieldChange('bodyFat', text ? parseFloat(text) : undefined)}
              placeholder="Body fat percentage"
              type="number"
              keyboardType="numeric"
              min={5}
              max={60}
              unit="%"
              error={validateField('bodyFat')}
            />

            <FormField
              label="Waist (optional)"
              value={form.waist || ''}
              onChangeText={(text) => handleFieldChange('waist', text ? parseInt(text) : undefined)}
              placeholder="Waist circumference"
              type="number"
              keyboardType="numeric"
              min={40}
              max={200}
              unit="cm"
              error={validateField('waist')}
            />

            <FormField
              label="Hip (optional)"
              value={form.hip || ''}
              onChangeText={(text) => handleFieldChange('hip', text ? parseInt(text) : undefined)}
              placeholder="Hip circumference"
              type="number"
              keyboardType="numeric"
              min={40}
              max={200}
              unit="cm"
              error={validateField('hip')}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 16,
  },
  formSection: {
    backgroundColor: 'rgba(255,255,255,0.97)',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#a7f3d0',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: Platform.OS === 'ios' ? 0.10 : 0.13,
    shadowRadius: 6,
    elevation: 3,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginLeft: 8,
  },
  fieldsContainer: {
    gap: 16,
  },
}); 