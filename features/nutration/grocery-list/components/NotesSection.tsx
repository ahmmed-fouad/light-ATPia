import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet,
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useGrocery } from '../hooks/useGrocery';

interface NotesSectionProps {
  onSave?: (notes: string) => void;
}

export const NotesSection: React.FC<NotesSectionProps> = ({ onSave }) => {
  const { notes, setNotes } = useGrocery();
  const [isEditing, setIsEditing] = useState(false);
  const [tempNotes, setTempNotes] = useState(notes);

  const handleEdit = () => {
    setIsEditing(true);
    setTempNotes(notes);
  };

  const handleSave = () => {
    setNotes(tempNotes);
    setIsEditing(false);
    onSave?.(tempNotes);
  };

  const handleCancel = () => {
    setTempNotes(notes);
    setIsEditing(false);
  };

  const handleClear = () => {
    Alert.alert(
      'Clear Notes',
      'Are you sure you want to clear all notes?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Clear', 
          style: 'destructive',
          onPress: () => {
            setNotes('');
            setTempNotes('');
          }
        }
      ]
    );
  };

  const renderQuickNotes = () => {
    const quickNotes = [
      'Don\'t forget to check expiration dates',
      'Look for sales and discounts',
      'Bring reusable bags',
      'Check pantry before shopping',
      'Buy organic when possible'
    ];

    return (
      <View style={styles.quickNotesContainer}>
        <Text style={styles.quickNotesTitle}>Quick Notes</Text>
        <View style={styles.quickNotesList}>
          {quickNotes.map((note, index) => (
            <TouchableOpacity
              key={index}
              style={styles.quickNoteChip}
              onPress={() => {
                const newNotes = tempNotes ? `${tempNotes}\n• ${note}` : `• ${note}`;
                setTempNotes(newNotes);
              }}
            >
              <Text style={styles.quickNoteText}>{note}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Ionicons name="document-text-outline" size={20} color="#6B7280" />
          <Text style={styles.title}>Shopping Notes</Text>
        </View>
        
        <View style={styles.headerActions}>
          {!isEditing ? (
            <>
              <TouchableOpacity style={styles.actionButton} onPress={handleEdit}>
                <Ionicons name="create-outline" size={18} color="#6B7280" />
              </TouchableOpacity>
              {notes.length > 0 && (
                <TouchableOpacity style={styles.actionButton} onPress={handleClear}>
                  <Ionicons name="trash-outline" size={18} color="#EF4444" />
                </TouchableOpacity>
              )}
            </>
          ) : (
            <>
              <TouchableOpacity style={styles.actionButton} onPress={handleCancel}>
                <Ionicons name="close" size={18} color="#6B7280" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton} onPress={handleSave}>
                <Ionicons name="checkmark" size={18} color="#10B981" />
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>

      <View style={styles.content}>
        {isEditing ? (
          <TextInput
            style={styles.textInput}
            value={tempNotes}
            onChangeText={setTempNotes}
            placeholder="Add your shopping notes here..."
            placeholderTextColor="#9CA3AF"
            multiline
            textAlignVertical="top"
            numberOfLines={6}
          />
        ) : (
          <View style={styles.notesDisplay}>
            {notes.length > 0 ? (
              <Text style={styles.notesText}>{notes}</Text>
            ) : (
              <Text style={styles.emptyNotes}>
                No notes yet. Tap edit to add shopping reminders.
              </Text>
            )}
          </View>
        )}

        {isEditing && renderQuickNotes()}
      </View>

      {notes.length > 0 && !isEditing && (
        <View style={styles.footer}>
          <Text style={styles.characterCount}>
            {notes.length} characters
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginLeft: 8,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  actionButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
  },
  content: {
    minHeight: 120,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    color: '#111827',
    backgroundColor: '#F9FAFB',
    minHeight: 120,
  },
  notesDisplay: {
    minHeight: 120,
    justifyContent: 'center',
  },
  notesText: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
  },
  emptyNotes: {
    fontSize: 14,
    color: '#9CA3AF',
    fontStyle: 'italic',
    textAlign: 'center',
  },
  quickNotesContainer: {
    marginTop: 12,
  },
  quickNotesTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280',
    marginBottom: 8,
  },
  quickNotesList: {
    gap: 6,
  },
  quickNoteChip: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  quickNoteText: {
    fontSize: 12,
    color: '#374151',
  },
  footer: {
    marginTop: 8,
    alignItems: 'flex-end',
  },
  characterCount: {
    fontSize: 11,
    color: '#9CA3AF',
  },
}); 