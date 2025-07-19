import React from 'react';
import { View, Text } from 'react-native';

interface Counter {
  label: string;
  value: number;
}

interface CountersProps {
  counters: Counter[];
  counterAnim: number[];
}

const Counters: React.FC<CountersProps> = ({ counters, counterAnim }) => {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'center', marginVertical: 8 }}>
      {counters.map((counter, idx) => (
        <View key={counter.label} style={{ alignItems: 'center', marginHorizontal: 12 }}>
          <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#6366f1' }}>{counterAnim[idx]}</Text>
          <Text style={{ fontSize: 13, color: '#555', marginTop: 2 }}>{counter.label}</Text>
        </View>
      ))}
    </View>
  );
};

export default Counters; 