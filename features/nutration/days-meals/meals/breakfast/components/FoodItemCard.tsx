import { Feather } from '@expo/vector-icons';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FoodItem } from '../types/breakfastTypes';

interface FoodItemCardProps {
  item: FoodItem;
  onRemove?: (itemId: string) => void;
  onEdit?: () => void;
  onDone?: () => void;
  isDone?: boolean;
}

const FoodItemCard: React.FC<FoodItemCardProps> = ({ item, onRemove, onEdit, onDone, isDone }) => {
  const getFoodEmoji = (name: string) => {
    const lowerName = name.toLowerCase();
    if (lowerName.includes('chicken')) return '🍗';
    if (lowerName.includes('taco')) return '🌮';
    if (lowerName.includes('oatmeal')) return '🥣';
    if (lowerName.includes('yogurt')) return '🥛';
    if (lowerName.includes('bread')) return '🍞';
    if (lowerName.includes('egg')) return '🥚';
    if (lowerName.includes('apple')) return '🍎';
    if (lowerName.includes('banana')) return '🍌';
    return '🍽️'; // default food emoji
  };

  return (
    <View style={[styles.container, isDone ? { opacity: 0.5 } : null, { marginHorizontal: 24 }]}>
      <View style={styles.leftSection}>
        <View style={{flexDirection: 'row', alignItems: 'center', flex: 1, paddingBottom: 12}}>
         <Image source={{uri: item.image}} style={{width: 50, height: 50, borderRadius: 10, marginRight: 12}} />
          {/* <Text style={styles.emoji}>{getFoodEmoji(item.name)}</Text> */}
          <View style={styles.info}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.serving}>1 serving</Text>
          </View>
        </View>

        <View style={styles.macrosSection}>
          <View style={styles.macroItem}>
            <View style={[styles.dot, { backgroundColor: "#18b888" }]} />
            <Text style={styles.macroText}>{item.kcal} kcal</Text>
          </View>
          <View style={styles.macroItem}>
            <View style={[styles.dot, { backgroundColor: "#ef4444" }]} />
            <Text style={styles.macroText}>{item.carbs} g</Text>
          </View>
          <View style={styles.macroItem}>
            <View style={[styles.dot, { backgroundColor: "#f59e0b" }]} />
            <Text style={styles.macroText}>{item.fat} g</Text>
          </View>
          <View style={styles.macroItem}>
            <View style={[styles.dot, { backgroundColor: "#8b5cf6" }]} />
            <Text style={styles.macroText}>{item.protein} g</Text>
          </View>
        </View>
      </View>

      <View style={styles.rightSection}>
        {onRemove && (
          <TouchableOpacity
            style={styles.removeButton}
            onPress={() => onRemove(item.id)}
            activeOpacity={0.7}
          >
            <Feather name="x" size={25} color="#ef4444" />
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={styles.editButton}
          onPress={onDone ? onDone : onEdit}
          activeOpacity={0.7}
        >
          {onDone ? (
            isDone ? (
              <Feather name="corner-up-left" size={25} color="#18b888" />
            ) : (
              <Feather name="check" size={25} color="#18b888" />
            )
          ) : (
            <Feather name="plus" size={25} color="#18b888" />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",

    alignItems: "center",
    backgroundColor: "#f7f7f7",
    borderRadius: 26,
    // padding: 16,
    paddingHorizontal: 8,
    paddingVertical: 24,
    // marginBottom: 22,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  leftSection: {
      //  paddingBottom: 12,

  },
  emoji: {
    fontSize: 37,
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    // width: 200,
    // borderWidth: 1,
    fontWeight: "600",
    
    color: "#173430",
    marginBottom: 2,
  },
  serving: {
    fontSize: 16,
    color: "#6b7280",
    fontWeight: "400",
  },
  macrosSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    // marginRight: 19,
  },
  macroItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  macroText: {
    fontSize: 16,
    color: "#6b7280",
    fontWeight: "500",
  },
  rightSection: {
    // alignItems: "center",
    // borderWidth: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 80,
    gap: 8,
  },
  removeButton: {

    borderRadius: 12,
    backgroundColor: "#fef2f2",
    alignItems: "center",
    justifyContent: "center",
  },
  editButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#f0fdf4",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default FoodItemCard; 