import { FontAwesome5 } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface SelectPlanButtonProps {
  onPress: () => void;
}

const SelectPlanButton: React.FC<SelectPlanButtonProps> = ({ onPress }) => (
  <TouchableOpacity
    style={styles.button}
    onPress={onPress}
    activeOpacity={0.85}
  >
    <View style={styles.row}>
      <Text style={styles.text}>Select plan</Text>
      <FontAwesome5
        name="chevron-right"
        size={22}
        color="#18b888"
        // style={{ marginLeft: 8 }}
      />
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#173430',
    borderRadius: 38,
    paddingVertical: 22,
    paddingHorizontal: 28,
    alignItems: 'center',
    marginTop: 18,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    // backgroundColor: 'red',
    width: '100%',
    justifyContent: 'space-between',
  },
  text: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 18,
  },
});

export default SelectPlanButton; 