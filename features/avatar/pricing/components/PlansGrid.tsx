import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { plans } from '../services/planService';
import { PlanType } from '../types/planTypes';
import PlanCard from './PlanCard';

const PlansGrid: React.FC = () => {
  const [selected, setSelected] = useState<string>('beginner');

  return (
    <View style={{ marginBottom: 8 }}>
      {plans.map((plan: PlanType, idx) => (
        <TouchableOpacity
          key={plan.id}
          activeOpacity={0.92}
          onPress={() => setSelected(plan.id)}
          style={{
            marginBottom: idx === plans.length - 1 ? 0 : 18,
            borderRadius: 28,
            overflow: 'hidden',
          }}
        >
          <PlanCard
            plan={plan}
            selected={selected === plan.id}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default PlansGrid; 