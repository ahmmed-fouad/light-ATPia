import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Camera, Image as ImageIcon, Upload } from 'lucide-react-native';

interface ImageUploadButtonProps {
  imageUri?: string;
  onCameraPress: () => void;
  onGalleryPress: () => void;
  onUploadPress: () => void;
  isUploading?: boolean;
}

export const ImageUploadButton: React.FC<ImageUploadButtonProps> = ({
  imageUri,
  onCameraPress,
  onGalleryPress,
  onUploadPress,
  isUploading = false,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upload Food Image</Text>
      
      {imageUri ? (
        <View style={styles.imageSection}>
          <Image
            source={{ uri: imageUri }}
            style={styles.image}
            resizeMode="cover"
          />
          <TouchableOpacity
            onPress={onUploadPress}
            disabled={isUploading}
            style={[
              styles.uploadButton,
              isUploading && styles.uploadButtonDisabled
            ]}
            activeOpacity={0.8}
          >
            <Upload size={20} color="white" />
            <Text style={styles.uploadButtonText}>
              {isUploading ? 'Processing...' : 'Scan Image'}
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.buttonSection}>
          <TouchableOpacity
            onPress={onCameraPress}
            style={styles.cameraButton}
            activeOpacity={0.8}
          >
            <Camera size={24} color="white" />
            <Text style={styles.buttonText}>Take Photo</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            onPress={onGalleryPress}
            style={styles.galleryButton}
            activeOpacity={0.8}
          >
            <ImageIcon size={24} color="white" />
            <Text style={styles.buttonText}>Choose from Gallery</Text>
          </TouchableOpacity>
        </View>
      )}
      
      <Text style={styles.hint}>
        Take a clear photo of your food for accurate nutrition analysis
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255,255,255,0.97)',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#a7f3d0',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: Platform.OS === 'ios' ? 0.10 : 0.13,
    shadowRadius: 6,
    elevation: 3,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
  },
  imageSection: {
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 128,
    borderRadius: 12,
    marginBottom: 12,
  },
  uploadButton: {
    backgroundColor: '#059669',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  uploadButtonDisabled: {
    backgroundColor: '#d1d5db',
  },
  uploadButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
    marginLeft: 8,
  },
  buttonSection: {
    gap: 12,
  },
  cameraButton: {
    backgroundColor: '#059669',
    borderRadius: 12,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  galleryButton: {
    backgroundColor: '#8B5CF6',
    borderRadius: 12,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
    marginLeft: 12,
  },
  hint: {
    fontSize: 12,
    color: '#64748b',
    textAlign: 'center',
    marginTop: 12,
  },
}); 