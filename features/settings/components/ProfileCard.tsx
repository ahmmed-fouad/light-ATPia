import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator, KeyboardAvoidingView, Platform, Alert, Image } from 'react-native';
import { useSettingsStore } from '../stores/settingsStore';
import * as ImagePicker from 'expo-image-picker';
import { Pencil } from 'lucide-react-native';

const ProfileCard = () => {
  const profile = useSettingsStore(s => s.profile);
  const setProfile = useSettingsStore(s => s.setProfile);
  const setPhoto = useSettingsStore(s => s.setPhoto);

  const [editing, setEditing] = useState(false);
  const [localProfile, setLocalProfile] = useState(profile);
  const [loading, setLoading] = useState(false);

  // Handle avatar/photo change
  const pickImage = async () => {
    setLoading(true);
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.7,
      });
      if (!result.canceled && result.assets && result.assets[0].uri) {
        setPhoto(result.assets[0].uri);
        setLocalProfile(p => ({ ...p, photo: result.assets[0].uri }));
      }
    } catch (e) {
      Alert.alert('Error', 'Could not pick image.');
    } finally {
      setLoading(false);
    }
  };

  // Handle field change
  const handleChange = (key: keyof typeof localProfile, value: string) => {
    setLocalProfile(prev => ({ ...prev, [key]: value }));
  };

  // Basic validation
  const validate = () => {
    if (!localProfile.name.trim()) return 'Name is required.';
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(localProfile.email)) return 'Invalid email.';
    if (isNaN(Number(localProfile.age)) || Number(localProfile.age) <= 0) return 'Invalid age.';
    if (!localProfile.gender.trim()) return 'Gender is required.';
    if (isNaN(Number(localProfile.height)) || Number(localProfile.height) <= 0) return 'Invalid height.';
    if (isNaN(Number(localProfile.weight)) || Number(localProfile.weight) <= 0) return 'Invalid weight.';
    return null;
  };

  // Save changes
  const save = () => {
    const error = validate();
    if (error) {
      Alert.alert('Validation Error', error);
      return;
    }
    setProfile(localProfile);
    setEditing(false);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{ width: '100%' }}
    >
      <View style={styles.card}>
        <View style={styles.avatarRow}>
          {loading ? (
            <View style={styles.avatarPlaceholder}>
              <ActivityIndicator size="small" color="#6366f1" />
            </View>
          ) : (
            <TouchableOpacity onPress={pickImage} style={styles.avatarBtn} disabled={loading}>
              {profile.photo ? (
                <Image source={{ uri: localProfile.photo }} style={styles.avatarImg} />
              ) : (
                <View style={styles.avatarPlaceholder} />
              )}
              <View style={styles.editIcon}><Pencil size={16} color="#6366f1" /></View>
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.fields}>
          {['name', 'email', 'age', 'gender', 'height', 'weight'].map(key => (
            <View key={key} style={styles.inputRow}>
              <Text style={styles.label}>{key.charAt(0).toUpperCase() + key.slice(1)}:</Text>
              <TextInput
                style={styles.input}
                value={String(localProfile[key as keyof typeof localProfile])}
                onChangeText={v => handleChange(key as keyof typeof localProfile, v)}
                editable={editing}
                keyboardType={['age', 'height', 'weight'].includes(key) ? 'numeric' : 'default'}
                autoCapitalize={key === 'email' ? 'none' : 'words'}
                autoCorrect={false}
                placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
              />
            </View>
          ))}
        </View>
        <View style={styles.actionsRow}>
          {editing ? (
            <>
              <TouchableOpacity style={styles.saveBtn} onPress={save}>
                <Text style={styles.saveText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelBtn} onPress={() => { setLocalProfile(profile); setEditing(false); }}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity style={styles.editBtn} onPress={() => setEditing(true)}>
              <Text style={styles.editText}>Edit</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
    width: '100%',
  },
  avatarRow: { alignItems: 'center', marginBottom: 12 },
  avatarBtn: { position: 'relative' },
  avatarPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#e0e7ef',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarImg: {
    width: 80,
    height: 80,
    borderRadius: 40,
    resizeMode: 'cover',
  },
  editIcon: {
    position: 'absolute',
    right: 2,
    bottom: 2,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 2,
    borderWidth: 1,
    borderColor: '#e0e7ef',
  },
  fields: { width: '100%', marginTop: 4 },
  inputRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  label: { width: 80, fontSize: 15, color: '#64748b', fontWeight: '600' },
  input: {
    flex: 1,
    fontSize: 15,
    color: '#334155',
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginLeft: 6,
  },
  actionsRow: { flexDirection: 'row', justifyContent: 'center', marginTop: 10, gap: 10 },
  editBtn: {
    backgroundColor: '#6366f1',
    borderRadius: 8,
    paddingHorizontal: 18,
    paddingVertical: 8,
  },
  editText: { color: '#fff', fontWeight: '700', fontSize: 15 },
  saveBtn: {
    backgroundColor: '#22c55e',
    borderRadius: 8,
    paddingHorizontal: 18,
    paddingVertical: 8,
  },
  saveText: { color: '#fff', fontWeight: '700', fontSize: 15 },
  cancelBtn: {
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#e0e7ef',
  },
  cancelText: { color: '#334155', fontWeight: '700', fontSize: 15 },
});

export default ProfileCard; 