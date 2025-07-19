
import React from 'react';
import { View, Text, Platform, Dimensions } from 'react-native';
import { TrendingUp, Flame, Footprints, Droplet } from 'lucide-react-native';
import type { Stat } from '../types/index';

const { width: screenWidth } = Dimensions.get('window');
const cardWidth = (screenWidth - 64) / 3; // 3 per row, 2 rows

function renderIcon(icon: string) {
  switch (icon) {
    case "trendingUp":
      return <TrendingUp size={24} color="#34d399" />;
    case "flame-orange":
      return <Flame size={24} color="#fb923c" />;
    case "flame-red":
      return <Flame size={24} color="#f87171" />;
    case "footprints":
      return <Footprints size={24} color="#60a5fa" />;
    case "droplet":
      return <Droplet size={24} color="#38bdf8" />;
    default:
      return null;
  }
}

export default function StatCards({ demoStats }: { demoStats: Stat[] }) {
  // Split into 2 rows: 3 in first, 2 in second
  const firstRow = demoStats.slice(0, 3);
  const secondRow = demoStats.slice(3);

  return (
    <View style={{ width: '100%', alignItems: 'center' }}>
      <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 12 }}>
        {firstRow.map((stat, i) => (
          <View
            key={i}
            style={{
              backgroundColor: 'rgba(255,255,255,0.85)',
              borderRadius: 16,
              borderWidth: 1,
              borderColor: '#e5e7eb',
              alignItems: 'center',
              justifyContent: 'center',
              paddingVertical: 10,
              paddingHorizontal: 6,
              marginHorizontal: 6,
              width: cardWidth,
              minWidth: 100,
              maxWidth: 140,
              shadowColor: '#a78bfa',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: Platform.OS === 'ios' ? 0.10 : 0.13,
              shadowRadius: 6,
              elevation: 2,
            }}
          >
            <View style={{ marginBottom: 8 }}>{renderIcon(stat.icon)}</View>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#222', fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif', marginBottom: 2 }}>
              {stat.value}
              <Text style={{ fontSize: 13, fontWeight: 'normal', color: '#64748b', fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif' }}>
                {stat.unit}
              </Text>
            </Text>
            <Text style={{ fontSize: 13, color: '#64748b', marginTop: 4, fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif', textAlign: 'center', flexWrap: 'wrap' }}>
              {stat.label}
            </Text>
          </View>
        ))}
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        {secondRow.map((stat, i) => (
          <View
            key={i}
            style={{
              backgroundColor: 'rgba(255,255,255,0.85)',
              borderRadius: 16,
              borderWidth: 1,
              borderColor: '#e5e7eb',
              alignItems: 'center',
              justifyContent: 'center',
              paddingVertical: 10,
              paddingHorizontal: 6,
              marginHorizontal: 6,
              width: cardWidth,
              minWidth: 100,
              maxWidth: 140,
              shadowColor: '#a78bfa',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: Platform.OS === 'ios' ? 0.10 : 0.13,
              shadowRadius: 6,
              elevation: 2,
            }}
          >
            <View style={{ marginBottom: 8 }}>{renderIcon(stat.icon)}</View>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#222', fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif', marginBottom: 2 }}>
              {stat.value}
              <Text style={{ fontSize: 13, fontWeight: 'normal', color: '#64748b', fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif' }}>
                {stat.unit}
              </Text>
            </Text>
            <Text style={{ fontSize: 13, color: '#64748b', marginTop: 4, fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif', textAlign: 'center', flexWrap: 'wrap' }}>
              {stat.label}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
} 