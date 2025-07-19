import { Check } from 'lucide-react-native';
import { TouchableOpacity, View } from 'react-native';

export const CustomCheckbox = ({
  checked,
  onPress,
  label,
  className,
  ...props
}: CustomCheckboxProps) => {
  return (
    <TouchableOpacity 
      className={`flex-row items-start ${className}`} 
      onPress={onPress}
      {...props}
    >
      <View className={`w-5 h-5 border-2 rounded mr-3 mt-0.5 items-center justify-center ${
        checked ? 'bg-blue-500 border-blue-500' : 'border-gray-300'
      }`}>
        {checked && <Check size={12} color="white" />}
      </View>
      <View className="flex-1">{label}</View>
    </TouchableOpacity>
  );
};

export default CustomCheckbox; 