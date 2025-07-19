import { Eye, EyeOff } from 'lucide-react-native';
import { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';

const getInputVariantStyle = (variant: CustomInputProps["variant"]) => {
    switch (variant) {
        case "outline":
            return "border-neutral-300 border-[1px] bg-white";
        case "filled":
            return "bg-gray-100 border-0";
        case "error":
            return "border-red-500 border-[1px] bg-white";
        default:
            return "border-neutral-300 border-[1px] bg-white";
    }
}

const getLabelVariantStyle = (variant: CustomInputProps["labelVariant"]) => {
    switch (variant) {
        case "error":
            return "text-red-500";
        case "success":
            return "text-green-600";
        default:
            return "text-gray-700";
    }
}

export const CustomInput = ({
    label,
    placeholder,
    value,
    onChangeText,
    variant = "outline",
    labelVariant = "default",
    secureTextEntry = false,
    keyboardType = "default",
    autoCapitalize = "none",
    autoCorrect = false,
    IconLeft,
    IconRight,
    className,
    error,
    ...props
}: CustomInputProps) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    const finalVariant = error ? "error" : variant;
    const finalLabelVariant = error ? "error" : labelVariant;

    return (
        <View className={`mb-4 ${className}`}>
            {label && (
                <Text className={`text-sm font-semibold mb-2 ${getLabelVariantStyle(finalLabelVariant)}`}>
                    {label}
                </Text>
            )}
            <View className={`relative flex-row items-center rounded-xl px-4 py-3 ${getInputVariantStyle(finalVariant)} ${isFocused ? 'border-blue-500 border-[1.5px]' : ''}`}>
                {IconLeft && (
                    <View className="mr-3">
                        <IconLeft size={20} color={error ? "#ef4444" : "#6b7280"} />
                    </View>
                )}
                <TextInput
                    className="flex-1 text-base text-gray-900"
                    placeholder={placeholder}
                    placeholderTextColor="#9ca3af"
                    value={value}
                    onChangeText={onChangeText}
                    secureTextEntry={secureTextEntry && !isPasswordVisible}
                    keyboardType={keyboardType}
                    autoCapitalize={autoCapitalize}
                    autoCorrect={autoCorrect}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    {...props}
                />
                {secureTextEntry && (
                    <TouchableOpacity onPress={togglePasswordVisibility} className="ml-3">
                        {isPasswordVisible ? (
                            <EyeOff size={20} color="#6b7280" />
                        ) : (
                            <Eye size={20} color="#6b7280" />
                        )}
                    </TouchableOpacity>
                )}
                {IconRight && !secureTextEntry && (
                    <View className="ml-3">
                        <IconRight size={20} color={error ? "#ef4444" : "#6b7280"} />
                    </View>
                )}
            </View>
            {error && (
                <Text className="text-red-500 text-sm mt-1 ml-1">{error}</Text>
            )}
        </View>
    );
};

export default CustomInput; 