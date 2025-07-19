// import React from 'react';
import { TouchableOpacity, Text, View, Platform } from 'react-native';
import { FileText } from 'lucide-react-native';

export default function ExportButton() {
  return (
    <View style={{ alignItems: 'center', marginTop: 8 }}>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: '#059669',
          borderRadius: 24,
          paddingHorizontal: 28,
          paddingVertical: 12,
          shadowColor: '#059669',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: Platform.OS === 'ios' ? 0.10 : 0.13,
          shadowRadius: 6,
          elevation: 2,
        }}
        onPress={() => {}}
        activeOpacity={0.85}
      >
        <FileText size={20} color="#fff" />
        <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16, marginLeft: 10 }}>
          Export Data
        </Text>
      </TouchableOpacity>
    </View>
  );
} 