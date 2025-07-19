import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Platform, Switch } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useFormStore } from '../stores/formStore';
import type { UserFormFields } from '../types/index';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { FormField } from './FormField';

const mealOptions = ['Pizza', 'Burger', 'Pasta', 'Other'];
const commonMealOptions = ['Rice', 'Chicken', 'Fish', 'Other'];
const fruitOptions = ['Apple', 'Banana', 'Orange', 'Other'];
const vegetableOptions = ['Carrot', 'Broccoli', 'Spinach', 'Other'];
const sportOptions = ['Running', 'Swimming', 'Cycling', 'Other'];
const pregnancyMonths = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  age: Yup.string().required('Age is required'),
  gender: Yup.string().oneOf(['male', 'female', '']).required('Gender is required'),
  length: Yup.string().required('Length is required'),
  weight: Yup.string().required('Weight is required'),
  waterPerDay: Yup.string().required('Water per day is required'),
});

export default function UserForm() {
  const { userForm, setUserForm } = useFormStore();

  return (
    <Formik
      initialValues={userForm}
      validationSchema={validationSchema}
      onSubmit={setUserForm}
      enableReinitialize
    >
      {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, errors, touched }) => (
        <KeyboardAwareScrollView contentContainerStyle={{ alignItems: 'center', padding: 20 }} style={{ width: '100%' }}>
          <View style={{
            width: '100%',
            maxWidth: 420,
            backgroundColor: 'rgba(255,255,255,0.96)',
            borderRadius: 18,
            padding: 20,
            shadowColor: '#a7f3d0',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: Platform.OS === 'ios' ? 0.10 : 0.13,
            shadowRadius: 10,
            elevation: 4,
          }}>
            {/* Name */}
            <FormField
              label="Name *"
              value={values.name}
              onChangeText={handleChange('name')}
              placeholder="Enter your name"
              error={errors.name}
              touched={touched.name}
              required
            />

            {/* Age */}
            <FormField
              label="Age *"
              value={values.age}
              onChangeText={handleChange('age')}
              placeholder="Enter your age"
              type="number"
              keyboardType="numeric"
              error={errors.age}
              touched={touched.age}
              required
            />

            {/* Gender */}
            <FormField
              label="Gender *"
              value={values.gender}
              onChangeText={() => {}} // Not used for select
              type="select"
              options={[
                { label: 'Select', value: '' },
                { label: 'Male', value: 'male' },
                { label: 'Female', value: 'female' },
              ]}
              selectedOption={values.gender}
              onSelectOption={(value) => setFieldValue('gender', value)}
              error={errors.gender}
              touched={touched.gender}
              required
            />

            {/* Pregnant (only if female) */}
            {values.gender === 'female' && (
              <View style={{ marginBottom: 16 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 6 }}>
                  <Text style={{ 
                    fontSize: 14, 
                    color: '#374151', 
                    fontWeight: '600',
                    fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif',
                    letterSpacing: 0.2,
                  }}>
                    Pregnant?
                  </Text>
                </View>
                <Switch
                  value={!!values.pregnant}
                  onValueChange={val => { setFieldValue('pregnant', val); }}
                  style={{ marginVertical: 4 }}
                  trackColor={{ false: '#e5e7eb', true: '#059669' }}
                  thumbColor={values.pregnant ? '#fff' : '#f3f4f6'}
                />
              </View>
            )}

            {/* Pregnancy Month (only if pregnant) */}
            {values.gender === 'female' && values.pregnant && (
              <FormField
                label="Pregnancy Month *"
                value={values.pregnancyMonth}
                onChangeText={() => {}} // Not used for select
                type="select"
                options={[
                  { label: 'Select', value: '' },
                  ...pregnancyMonths.map(m => ({ label: m, value: m })),
                ]}
                selectedOption={values.pregnancyMonth}
                onSelectOption={(value) => setFieldValue('pregnancyMonth', value)}
              />
            )}

            {/* Length */}
            <FormField
              label="Length (cm) *"
              value={values.length}
              onChangeText={handleChange('length')}
              placeholder="Enter your height in cm"
              type="number"
              keyboardType="numeric"
              error={errors.length}
              touched={touched.length}
              required
            />

            {/* Weight */}
            <FormField
              label="Weight (kg) *"
              value={values.weight}
              onChangeText={handleChange('weight')}
              placeholder="Enter your weight in kg"
              type="number"
              keyboardType="numeric"
              error={errors.weight}
              touched={touched.weight}
              required
            />

            {/* Water per day */}
            <FormField
              label="Water drunk per day (L) *"
              value={values.waterPerDay}
              onChangeText={handleChange('waterPerDay')}
              placeholder="How much water do you drink per day?"
              type="number"
              keyboardType="numeric"
              error={errors.waterPerDay}
              touched={touched.waterPerDay}
              required
            />

            {/* Meals per day */}
            <FormField
              label="Number of meals per day (optional)"
              value={values.mealsPerDay}
              onChangeText={handleChange('mealsPerDay')}
              placeholder="e.g. 3"
              type="number"
              keyboardType="numeric"
            />

            {/* Favorite meal */}
            <FormField
              label="Favorite meal (optional)"
              value={values.favoriteMeal}
              onChangeText={() => {}} // Not used for select
              type="select"
              options={[
                { label: 'Select', value: '' },
                ...mealOptions.map(m => ({ label: m, value: m })),
              ]}
              selectedOption={values.favoriteMeal}
              onSelectOption={(value) => setFieldValue('favoriteMeal', value)}
            />

            {values.favoriteMeal === 'Other' && (
              <FormField
                label=""
                value={values.favoriteMealOther}
                onChangeText={handleChange('favoriteMealOther')}
                placeholder="Please specify"
              />
            )}

            {/* Common meals */}
            <FormField
              label="Common meals (optional)"
              value={values.commonMeals}
              onChangeText={() => {}} // Not used for select
              type="select"
              options={[
                { label: 'Select', value: '' },
                ...commonMealOptions.map(m => ({ label: m, value: m })),
              ]}
              selectedOption={values.commonMeals}
              onSelectOption={(value) => setFieldValue('commonMeals', value)}
            />

            {values.commonMeals === 'Other' && (
              <FormField
                label=""
                value={values.commonMealsOther}
                onChangeText={handleChange('commonMealsOther')}
                placeholder="Please specify"
              />
            )}

            {/* Favorite fruit */}
            <FormField
              label="Favorite fruit (optional)"
              value={values.favoriteFruit}
              onChangeText={() => {}} // Not used for select
              type="select"
              options={[
                { label: 'Select', value: '' },
                ...fruitOptions.map(m => ({ label: m, value: m })),
              ]}
              selectedOption={values.favoriteFruit}
              onSelectOption={(value) => setFieldValue('favoriteFruit', value)}
            />

            {values.favoriteFruit === 'Other' && (
              <FormField
                label=""
                value={values.favoriteFruitOther}
                onChangeText={handleChange('favoriteFruitOther')}
                placeholder="Please specify"
              />
            )}

            {/* Favorite vegetables */}
            <FormField
              label="Favorite vegetables (optional)"
              value={values.favoriteVegetables}
              onChangeText={() => {}} // Not used for select
              type="select"
              options={[
                { label: 'Select', value: '' },
                ...vegetableOptions.map(m => ({ label: m, value: m })),
              ]}
              selectedOption={values.favoriteVegetables}
              onSelectOption={(value) => setFieldValue('favoriteVegetables', value)}
            />

            {values.favoriteVegetables === 'Other' && (
              <FormField
                label=""
                value={values.favoriteVegetablesOther}
                onChangeText={handleChange('favoriteVegetablesOther')}
                placeholder="Please specify"
              />
            )}

            {/* Favorite sport */}
            <FormField
              label="Favorite sport (optional)"
              value={values.favoriteSport}
              onChangeText={() => {}} // Not used for select
              type="select"
              options={[
                { label: 'Select', value: '' },
                ...sportOptions.map(m => ({ label: m, value: m })),
              ]}
              selectedOption={values.favoriteSport}
              onSelectOption={(value) => setFieldValue('favoriteSport', value)}
            />

            {values.favoriteSport === 'Other' && (
              <FormField
                label=""
                value={values.favoriteSportOther}
                onChangeText={handleChange('favoriteSportOther')}
                placeholder="Please specify"
              />
            )}

            {/* Exercise hours per day */}
            <FormField
              label="Hours of exercise per day (optional)"
              value={values.exerciseHoursPerDay}
              onChangeText={handleChange('exerciseHoursPerDay')}
              placeholder="e.g. 1"
              type="number"
              keyboardType="numeric"
            />

            {/* Submit button */}
            <TouchableOpacity
              onPress={() => handleSubmit()}
              style={{
                backgroundColor: '#059669',
                borderRadius: 14,
                paddingVertical: 14,
                alignItems: 'center',
                marginTop: 16,
                shadowColor: '#059669',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: Platform.OS === 'ios' ? 0.15 : 0.20,
                shadowRadius: 4,
                elevation: 3,
              }}
              activeOpacity={0.85}
            >
              <Text style={{ 
                color: '#fff', 
                fontWeight: 'bold', 
                fontSize: 16,
                fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif',
                letterSpacing: 0.5,
              }}>
                Save Profile
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
      )}
    </Formik>
  );
} 