declare interface CustomBtnProps extends TouchableOpacityProps {
    onPress: () => void;
    title: string;
    bgVariant?: "primary" | "secondary" | "danger" | "success" | "outline" | "ghost";
    textVariant?: "primary" | "secondary" | "danger" | "success" | "outline" | "default";
    IconLeft?: React.ComponentType<any>;
    IconRight?: React.ComponentType<any>;
    className?: string;
    [key: string]: any;
}

declare interface CustomInputProps extends TextInputProps {
    label?: string;
    placeholder?: string;
    value?: string;
    onChangeText?: (text: string) => void;
    variant?: "outline" | "filled" | "error";
    labelVariant?: "default" | "error" | "success";
    secureTextEntry?: boolean;
    keyboardType?: KeyboardTypeOptions;
    autoCapitalize?: "none" | "sentences" | "words" | "characters";
    autoCorrect?: boolean;
    IconLeft?: React.ComponentType<any>;
    IconRight?: React.ComponentType<any>;
    className?: string;
    error?: string;
    [key: string]: any;
}

declare interface CustomCheckboxProps extends TouchableOpacityProps {
    checked: boolean;
    onPress: () => void;
    label: React.ReactNode;
    className?: string;
    [key: string]: any;
}