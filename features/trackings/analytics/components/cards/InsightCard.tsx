import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { AIInsight } from '../../types';
import { AnalyticsService } from '../../services/analyticsService';
import { Lightbulb, TrendingUp, AlertTriangle, Award } from 'lucide-react-native';

interface InsightCardProps {
  insight: AIInsight;
  onPress?: () => void;
  onActionPress?: () => void;
}

export const InsightCard: React.FC<InsightCardProps> = ({ 
  insight, 
  onPress, 
  onActionPress 
}) => {
  const getGradientColors = () => {
    switch (insight.type) {
      case 'achievement':
        return ['rgba(16, 185, 129, 0.1)', 'rgba(34, 197, 94, 0.05)'];
      case 'recommendation':
        return ['rgba(59, 130, 246, 0.1)', 'rgba(96, 165, 250, 0.05)'];
      case 'warning':
        return ['rgba(245, 158, 11, 0.1)', 'rgba(251, 191, 36, 0.05)'];
      case 'pattern':
        return ['rgba(139, 92, 246, 0.1)', 'rgba(168, 85, 247, 0.05)'];
      default:
        return ['rgba(107, 114, 128, 0.1)', 'rgba(156, 163, 175, 0.05)'];
    }
  };

  const getIcon = () => {
    switch (insight.type) {
      case 'achievement':
        return <Award size={20} color="#10B981" />;
      case 'recommendation':
        return <Lightbulb size={20} color="#3B82F6" />;
      case 'warning':
        return <AlertTriangle size={20} color="#F59E0B" />;
      case 'pattern':
        return <TrendingUp size={20} color="#8B5CF6" />;
      default:
        return <Lightbulb size={20} color="#6B7280" />;
    }
  };

  const getConfidenceColor = () => {
    if (insight.confidence >= 90) return '#10B981';
    if (insight.confidence >= 70) return '#F59E0B';
    return '#EF4444';
  };

  const CardContent = () => (
    <View style={styles.container}>
      <LinearGradient
        colors={getGradientColors() as [string, string]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      />
      
      <View style={styles.content}>
        <View style={styles.iconSection}>
          {getIcon()}
        </View>
        <View style={styles.textSection}>
          <View style={styles.header}>
            <Text style={styles.title}>{insight.title}</Text>
            <View style={styles.confidenceSection}>
              <View 
                style={[styles.confidenceDot, { backgroundColor: getConfidenceColor() }]}
              />
              <Text style={styles.confidenceText}>{insight.confidence}%</Text>
            </View>
          </View>
          <Text style={styles.message}>{insight.message}</Text>
        </View>
      </View>

      {/* Category badge */}
      <View style={styles.footer}>
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>{insight.category}</Text>
        </View>
        
        {insight.actionable && insight.actionText && (
          <TouchableOpacity
            onPress={onActionPress}
            style={styles.actionButton}
            activeOpacity={0.8}
          >
            <Text style={styles.actionText}>{insight.actionText}</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  if (onPress) {
    return (
      <TouchableOpacity 
        style={styles.wrapper}
        onPress={onPress}
        activeOpacity={0.8}
      >
        <CardContent />
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.wrapper}>
      <CardContent />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 16,
  },
  container: {
    backgroundColor: 'rgba(255,255,255,0.97)',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#a7f3d0',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: Platform.OS === 'ios' ? 0.10 : 0.13,
    shadowRadius: 6,
    elevation: 3,
    position: 'relative',
  },
  gradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 16,
  },
  content: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  iconSection: {
    marginRight: 12,
    marginTop: 2,
  },
  textSection: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    flex: 1,
  },
  confidenceSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  confidenceDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 4,
  },
  confidenceText: {
    fontSize: 12,
    color: '#64748b',
  },
  message: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  categoryBadge: {
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  categoryText: {
    fontSize: 12,
    color: '#374151',
    textTransform: 'capitalize',
  },
  actionButton: {
    backgroundColor: '#059669',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  actionText: {
    fontSize: 12,
    color: '#ffffff',
    fontWeight: '500',
  },
}); 