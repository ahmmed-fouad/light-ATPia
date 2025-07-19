import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { DrawerBodyProps } from '../../types/drawer';
import { ChatHistoryItem } from './ChatHistoryItem';

export const DrawerBody: React.FC<DrawerBodyProps> = ({
  chatHistory,
  selectedSection,
  isHistoryExpanded,
  onNewChat,
  onSelectChat,
  onSelectSection,
  onToggleHistory,
  onDeleteChat,
  onDeleteAllChats,
}) => {
  const renderSectionItem = (
    icon: string,
    title: string,
    section: 'chats' | 'library' | 'explore',
    badge?: number
  ) => (
    <TouchableOpacity
      style={[
        styles.sectionItem,
        selectedSection === section && styles.selectedSectionItem
      ]}
      onPress={() => onSelectSection(section)}
      activeOpacity={0.7}
    >
      <View style={styles.sectionIconContainer}>
        <Ionicons
          name={icon as any}
          size={20}
          color={selectedSection === section ? '#3B82F6' : '#6B7280'}
        />
      </View>
      <Text style={[
        styles.sectionTitle,
        selectedSection === section && styles.selectedSectionTitle
      ]}>
        {title}
      </Text>
      {badge && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{badge}</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* New Chat Button */}
      <TouchableOpacity style={styles.newChatButton} onPress={onNewChat}>
        <Ionicons name="add" size={20} color="#FFFFFF" />
        <Text style={styles.newChatText}>New Chat</Text>
      </TouchableOpacity>

      {/* Navigation Sections */}
      <View style={styles.sectionsContainer}>
        {renderSectionItem('chatbubbles-outline', 'Library', 'library')}
        {renderSectionItem('compass-outline', 'Explore GPTs', 'explore')}
      </View>

      {/* Chat History */}
      <View style={styles.historyContainer}>
        <View style={styles.historyHeader}>
          <Text style={styles.historyTitle}>Recent</Text>
          
          <View style={styles.historyControls}>
            {isHistoryExpanded && chatHistory.length > 0 && onDeleteAllChats && (
              <TouchableOpacity
                style={styles.deleteAllButton}
                onPress={onDeleteAllChats}
                activeOpacity={0.7}
              >
                <Ionicons name="trash-outline" size={18} color="#EF4444" />
              </TouchableOpacity>
            )}
            
            <TouchableOpacity
              style={styles.historyToggle}
              onPress={onToggleHistory}
              activeOpacity={0.7}
            >
              <Ionicons
                name={isHistoryExpanded ? 'chevron-up' : 'chevron-down'}
                size={20}
                color="#6B7280"
              />
            </TouchableOpacity>
          </View>
        </View>

        {isHistoryExpanded && (
          <View style={styles.historyList}>
            {chatHistory.length === 0 ? (
              <View style={styles.emptyState}>
                <Ionicons name="chatbubble-outline" size={48} color="#D1D5DB" />
                <Text style={styles.emptyStateText}>No conversations yet</Text>
                <Text style={styles.emptyStateSubtext}>
                  Start a new chat to begin
                </Text>
              </View>
            ) : (
              chatHistory.map((item) => (
                <ChatHistoryItem
                  key={item.id}
                  item={item}
                  isSelected={false}
                  onPress={onSelectChat}
                  onDelete={onDeleteChat}
                />
              ))
            )}
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  newChatButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3B82F6',
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 8,
  },
  newChatText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  sectionsContainer: {
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  sectionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    marginVertical: 2,
  },
  selectedSectionItem: {
    backgroundColor: '#EFF6FF',
  },
  sectionIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  sectionTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: '#374151',
  },
  selectedSectionTitle: {
    color: '#3B82F6',
  },
  badge: {
    backgroundColor: '#EF4444',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
    minWidth: 20,
    alignItems: 'center',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  historyContainer: {
    flex: 1,
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  historyToggle: {
    padding: 4,
  },
  historyTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
  },
  historyControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deleteAllButton: {
    padding: 4,
    borderRadius: 4,
  },
  historyList: {
    flex: 1,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 16,
  },
  emptyStateText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#6B7280',
    marginTop: 12,
    marginBottom: 4,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#9CA3AF',
  },
}); 