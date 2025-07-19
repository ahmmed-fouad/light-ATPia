
import { View, Text, ScrollView } from 'react-native';
import { Trophy, Droplet } from 'lucide-react-native';
import { Badge } from '../types/index';

type BadgesProps = {
  demoBadges: Badge[];
};

function renderBadgeIcon(icon: string) {
  switch (icon) {
    case "trophy-yellow":
      return <Trophy size={20} color="#fbbf24" />;
    case "trophy-green":
      return <Trophy size={20} color="#34d399" />;
    case "droplet":
      return <Droplet size={20} color="#38bdf8" />;
    default:
      return null;
  }
}

export default function Badges({ demoBadges }: BadgesProps) {
  return (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 16 }}
      className="mb-6"
    >
      {demoBadges.map((badge, i) => (
        <View
          key={i}
          className="flex-row items-center bg-gradient-to-r from-yellow-100 via-green-100 to-cyan-100 dark:from-yellow-900 dark:via-green-900 dark:to-cyan-900 rounded-full px-4 py-2 mx-2 shadow"
        >
          <View className="mr-2">
            {renderBadgeIcon(badge.icon)}
          </View>
          <Text className="text-sm font-semibold text-zinc-700 dark:text-zinc-200">
            {badge.label}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
} 