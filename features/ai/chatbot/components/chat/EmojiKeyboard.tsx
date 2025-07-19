import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import EmojiPicker from 'rn-emoji-keyboard';

interface EmojiKeyboardProps {
  isVisible: boolean;
  onClose: () => void;
  onEmojiSelected: (emoji: string) => void;
}

export const EmojiKeyboard: React.FC<EmojiKeyboardProps> = ({
  isVisible,
  onClose,
  onEmojiSelected,
}) => {
  const handleEmojiSelect = (emoji: { emoji: string }) => {
    onEmojiSelected(emoji.emoji);
    onClose();
  };

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Choose Emoji</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Ionicons name="close" size={24} color="#374151" />
          </TouchableOpacity>
        </View>
        <View style={styles.emojiContainer}>
          <EmojiPicker
            open={isVisible}
            onClose={onClose}
            onEmojiSelected={handleEmojiSelect}
            enableSearchBar={true}
            // You can add more props as needed
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  closeButton: {
    padding: 8,
    borderRadius: 8,
  },
  emojiContainer: {
    flex: 1,
  },
}); 