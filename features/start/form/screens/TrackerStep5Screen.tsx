import React, { useRef, useState, useEffect } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform, TouchableOpacity, Text, FlatList, Animated, Dimensions } from 'react-native';
import StepHeader from '../components/StepHeader';
import StepTitle from '../components/StepTitle';
import StepFooterButton from '@/components/StepFooterButton';
import { useFormStore } from '../stores/formStore';
import type { FormStoreState } from '../stores/formStore';
import { useFormNavigation } from '../hooks/useFormNavigation';

const TOTAL_STEPS = 8;
const { width: screenWidth } = Dimensions.get('window');
const CARD_WIDTH = 80;
const CARD_SPACING = 16;
const RULER_ITEM_WIDTH = 24;
const CENTER_OFFSET = (screenWidth - RULER_ITEM_WIDTH) / 2;

const TrackerStep5Screen = () => {
  const { step, nextStep, prevStep } = useFormNavigation();
  const height = useFormStore((s: FormStoreState) => s.data.height || 175);
  const heightUnit = useFormStore((s: FormStoreState) => s.data.heightUnit || 'cm');
  const setData = useFormStore((s: FormStoreState) => s.setData);

  const [selectedHeight, setSelectedHeight] = useState(height);
  const [selectedUnit, setSelectedUnit] = useState<'cm' | 'ft'>(heightUnit);
  const flatListRef = useRef<FlatList>(null);
  const scrollX = useRef(new Animated.Value(0)).current;

  // Generate height values based on unit
  const getHeightValues = () => {
    if (selectedUnit === 'cm') {
      return Array.from({ length: 101 }, (_, i) => 120 + i); // 120cm to 220cm
    } else {
      return Array.from({ length: 61 }, (_, i) => +(4 + i * 0.1).toFixed(1)); // 4.0ft to 10.0ft
    }
  };
  const heightValues = getHeightValues();
  const selectedIndex = heightValues.indexOf(selectedHeight);

  // Snap to selected value on mount or unit change
  useEffect(() => {
    if (flatListRef.current && selectedIndex >= 0) {
      flatListRef.current.scrollToOffset({
        offset: selectedIndex * RULER_ITEM_WIDTH,
        animated: false,
      });
    }
  }, [selectedUnit]);

  // Handle scroll and snap
  const onMomentumScrollEnd = (event: any) => {
    const x = event.nativeEvent.contentOffset.x;
    const index = Math.round(x / RULER_ITEM_WIDTH);
    const clampedIndex = Math.max(0, Math.min(heightValues.length - 1, index));
    const value = heightValues[clampedIndex];
    setSelectedHeight(value);
    setData({ height: value, heightUnit: selectedUnit });
    // Snap to center
    flatListRef.current?.scrollToOffset({
      offset: clampedIndex * RULER_ITEM_WIDTH,
      animated: true,
    });
  };

  const handleUnitChange = (unit: 'cm' | 'ft') => {
    let newHeight: number;
    if (unit === 'cm' && selectedUnit === 'ft') {
      newHeight = Math.round(selectedHeight * 30.48);
    } else if (unit === 'ft' && selectedUnit === 'cm') {
      newHeight = Math.round((selectedHeight / 30.48) * 10) / 10;
    } else {
      newHeight = selectedHeight;
    }
    if (unit === 'cm') {
      newHeight = Math.max(120, Math.min(220, newHeight));
    } else {
      newHeight = Math.max(4.0, Math.min(10.0, newHeight));
    }
    setSelectedUnit(unit);
    setSelectedHeight(newHeight);
    setData({ height: newHeight, heightUnit: unit });
  };

  // Render each ruler mark
  const renderItem = ({ item, index }: { item: number; index: number }) => {
    const isMajor = selectedUnit === 'cm' ? item % 10 === 0 : (item * 10) % 10 === 0;
    const isSelected = item === selectedHeight;
    return (
      <View style={{ width: RULER_ITEM_WIDTH, alignItems: 'center' }}>
        <View
          style={{
            width: 4,
            height: isMajor ? 36 : 18,
            backgroundColor: isMajor ? '#22C55E' : '#d1d5db',
            borderRadius: 2,
            marginBottom: 2,
          }}
        />
        {isMajor && (
          <Text style={{ fontSize: 12, color: isSelected ? '#22C55E' : '#1A2C23', fontWeight: isSelected ? '700' : '400' }}>
            {selectedUnit === 'cm' ? item : item.toFixed(1)}
          </Text>
        )}
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: '#fff' }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <StepHeader onBack={prevStep} onSkip={nextStep} />
      <View style={styles.centerArea}>
        <StepTitle
          title="How tall are you?"
          highlight="tall"
          subtitle="We will use this data to give you a better diet type for you"
          step={step}
          total={TOTAL_STEPS}
        />
        <View style={styles.contentContainer}>
          {/* Unit Toggle */}
          <View style={styles.unitToggle}>
            <TouchableOpacity
              style={[
                styles.unitButton,
                selectedUnit === 'ft' && styles.unitButtonSelected
              ]}
              onPress={() => handleUnitChange('ft')}
            >
              <Text style={[
                styles.unitButtonText,
                selectedUnit === 'ft' && styles.unitButtonTextSelected
              ]}>
                ft
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.unitButton,
                selectedUnit === 'cm' && styles.unitButtonSelected
              ]}
              onPress={() => handleUnitChange('cm')}
            >
              <Text style={[
                styles.unitButtonText,
                selectedUnit === 'cm' && styles.unitButtonTextSelected
              ]}>
                cm
              </Text>
            </TouchableOpacity>
          </View>

          {/* Centered Card Row for Selected, Previous, and Next Values */}
          <View style={styles.cardRow}>
            {/* Previous card */}
            {selectedIndex > 0 ? (
              <View style={styles.sideCard}>
                <Text style={styles.sideCardText}>
                  {selectedUnit === 'cm' ? Math.round(heightValues[selectedIndex - 1]) : heightValues[selectedIndex - 1].toFixed(1)}
                </Text>
              </View>
            ) : <View style={styles.sideCardPlaceholder} />}
            {/* Current (selected) card */}
            <View style={styles.selectedCard}>
              <Text style={styles.selectedCardText}>
                {selectedUnit === 'cm' ? Math.round(selectedHeight) : selectedHeight.toFixed(1)}
              </Text>
            </View>
            {/* Next card */}
            {selectedIndex < heightValues.length - 1 ? (
              <View style={styles.sideCard}>
                <Text style={styles.sideCardText}>
                  {selectedUnit === 'cm' ? Math.round(heightValues[selectedIndex + 1]) : heightValues[selectedIndex + 1].toFixed(1)}
                </Text>
              </View>
            ) : <View style={styles.sideCardPlaceholder} />}
          </View>
          {/* Down arrow indicator */}
          <View style={styles.arrowDown} />

          {/* Custom Ruler */}
          <View style={{ width: screenWidth, alignItems: 'center', position: 'relative', height: 80 }}>
            <Animated.FlatList
              ref={flatListRef}
              data={heightValues}
              keyExtractor={item => item.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: CENTER_OFFSET }}
              renderItem={renderItem}
              getItemLayout={(_, index) => ({ length: RULER_ITEM_WIDTH, offset: RULER_ITEM_WIDTH * index, index })}
              snapToInterval={RULER_ITEM_WIDTH}
              decelerationRate="fast"
              onMomentumScrollEnd={onMomentumScrollEnd}
              onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                { useNativeDriver: false }
              )}
              initialScrollIndex={selectedIndex >= 0 ? selectedIndex : 0}
            />
            {/* Center indicator */}
            <View style={styles.rulerIndicator} />
          </View>
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
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  contentContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: 40,
  },
  unitToggle: {
    flexDirection: "row",
    backgroundColor: "#f3f4f6",
    borderRadius: 18,
    padding: 4,
    marginBottom: 32,
  },
  unitButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 18,
  },
  unitButtonSelected: {
    backgroundColor: "#22C55E",
    borderRadius: 18,
    width: 60,
  },
  unitButtonText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#6b7280",
  },
  unitButtonTextSelected: {
    color: "#ffffff",
    fontWeight: "600",
  },
  cardRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  sideCard: {
    backgroundColor: "#f7dcdc",
    borderRadius: 16,
    paddingHorizontal: 18,
    paddingVertical: 16,
    minWidth: 90,
    height: 150,
    alignItems: "center",
    justifyContent: "center",
    opacity: 0.5,
    marginHorizontal: 4,
  },
  sideCardText: {
    fontSize: 24,
    fontWeight: "500",
    // color: "#607d79",
  },
  sideCardPlaceholder: {
    width: 60,
    height: 56,
    marginHorizontal: 4,
    backgroundColor: "transparent",
  },
  selectedCard: {
    backgroundColor: "#ebf6d6",
    borderRadius: 20,
    paddingHorizontal: 32,
    paddingVertical: 24,
    minWidth: 140,
    height: 210,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 4,
  },
  selectedCardText: {
    fontSize: 40,
    fontWeight: "700",
    color: "#1A2C23",
  },
  arrowDown: {
    width: 0,
    height: 0,
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 12,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "#22C55E",
    marginTop: -4,
  },
  rulerIndicator: {
    position: "absolute",
    top: 0,
    left: "50%",
    width: 4,
    height: 60,
    backgroundColor: "#22C55E",
    marginLeft: -2,
    zIndex: 1,
  },
  footerBtnWrap: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 36,
  },
});

export default TrackerStep5Screen; 