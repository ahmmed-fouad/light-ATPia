import React from 'react';
import { 
  View, 
  Text, 
  Image, 
  ScrollView, 
  TouchableOpacity, 
  StyleSheet, 
  Platform,
  Linking,
  Dimensions
} from 'react-native';
import { BlogPostModalProps } from '../types';
import { PopularTopicsChart } from '../components/PopularTopicsChart';

const { width } = Dimensions.get('window');

export const BlogPostModal: React.FC<BlogPostModalProps> = ({ 
  post, 
  visible, 
  onClose, 
  chartData 
}) => {
  if (!post || !visible) return null;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getAuthorName = () => {
    return post.user?.name || post.user?.username || 'Unknown Author';
  };

  const handleReadFull = async () => {
    try {
      await Linking.openURL(post.url);
    } catch (error) {
      console.error('Error opening URL:', error);
    }
  };

  return (
    <View style={styles.overlay}>
      <View style={styles.modal}>
        {/* Close Button */}
        <TouchableOpacity
          style={styles.closeButton}
          onPress={onClose}
          activeOpacity={0.8}
        >
          <Text style={styles.closeButtonText}>×</Text>
        </TouchableOpacity>

        <ScrollView
          style={{}}
          contentContainerStyle={{ paddingBottom: 24 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Cover Image */}
          <Image
            source={{
              uri:
                post.cover_image ||
                'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400',
            }}
            style={styles.coverImage}
            resizeMode="cover"
          />

          {/* Content */}
          <View style={styles.content}>
            <Text style={styles.title}>{post.title}</Text>

            <View style={styles.metaInfo}>
              <Text style={styles.author}>by {getAuthorName()}</Text>
              <Text style={styles.date}>{formatDate(post.published_at)}</Text>
            </View>

            <Text style={styles.description}>{post.description}</Text>

            {/* Read Full Article Button */}
            <TouchableOpacity
              style={styles.readButton}
              onPress={handleReadFull}
              activeOpacity={0.8}
            >
              <Text style={styles.readButtonText}>Read Full Article</Text>
            </TouchableOpacity>

            {/* Popular Topics Chart */}
            <View style={styles.chartSection}>
              <PopularTopicsChart data={chartData} />
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modal: {
    backgroundColor: 'rgba(255,255,255,0.98)',
    borderRadius: 18,
    width: width - 32,
    maxHeight: '90%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 8,
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1001,
  },
  closeButtonText: {
    fontSize: 24,
    color: '#64748b',
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
  },
  coverImage: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#059669',
    marginBottom: 12,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif',
    lineHeight: 32,
  },
  metaInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  author: {
    fontSize: 14,
    color: '#64748b',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif',
  },
  date: {
    fontSize: 14,
    color: '#64748b',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif',
  },
  description: {
    fontSize: 16,
    color: '#374151',
    lineHeight: 24,
    marginBottom: 24,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif',
  },
  readButton: {
    backgroundColor: '#059669',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#059669',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  readButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif',
  },
  chartSection: {
    marginTop: 16,
  },
}); 