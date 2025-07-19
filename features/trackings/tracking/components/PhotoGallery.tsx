
import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, Platform } from 'react-native';
import { Camera } from 'lucide-react-native';
import type { PhotoGalleryProps } from '../types/index';

export default function PhotoGallery({ gallery }: PhotoGalleryProps) {
  return (
    <View style={{
      backgroundColor: 'transparent',
      borderRadius: 16,
      padding: 0,
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      minHeight: 180,
    }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
        <Camera size={20} color="#34d399" />
        <Text style={{ fontSize: 17, fontWeight: 'bold', color: '#222', marginLeft: 6 }}>
          Progress Photos
        </Text>
      </View>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 8 }}
        style={{ width: '100%' }}
      >
        {gallery.map((src: string, i: number) => (
          <View key={i} style={{ marginRight: 10 }}>
            <Image
              source={{ uri: src }}
              style={{
                width: 56,
                height: 56,
                borderRadius: 12,
                backgroundColor: '#e5e7eb',
                marginBottom: 2,
              }}
              resizeMode="cover"
            />
          </View>
        ))}
      </ScrollView>
      <TouchableOpacity style={{ alignSelf: 'flex-end', marginTop: 8 }}>
        <Camera size={18} color="#2563eb" />
      </TouchableOpacity>
    </View>
  );
} 