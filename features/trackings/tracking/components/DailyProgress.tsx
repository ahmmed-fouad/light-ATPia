// import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { FileText } from 'lucide-react-native';

export default function DailyProgress() {
  return (
    <View style={{
      backgroundColor: 'transparent',
      borderRadius: 16,
      padding: 0,
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
    }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#222', marginBottom: 8, textAlign: 'left', width: '100%' }}>
        Today's Progress
      </Text>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginBottom: 4 }}>
        <Text style={{ color: '#444', fontSize: 14 }}>Water</Text>
        <Text style={{ color: '#444', fontSize: 14 }}>2.3L / 3L</Text>
      </View>
      {/* Add more progress bars or content as needed */}
      <TouchableOpacity style={{ marginTop: 10, alignSelf: 'flex-end' }}>
        <FileText size={18} color="#2563eb" />
      </TouchableOpacity>
    </View>
  );
} 