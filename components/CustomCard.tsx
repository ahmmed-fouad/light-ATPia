import React from "react";
import { View, StyleSheet, ViewStyle, StyleProp } from "react-native";

export type CustomCardProps = {
  variant?: "elevated" | "outline" | "flat" | "success" | "danger";
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  children?: React.ReactNode;
  [key: string]: any; // Allow passing additional props
};

const getCardVariantStyle = (variant: CustomCardProps["variant"]) => {
  switch (variant) {
    case "outline":
      return {
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#E5E7EB",
      };
    case "success":
      return {
        backgroundColor: "#DCFCE7", // green-100
        borderWidth: 1,
        borderColor: "#22C55E", // green-500
      };
    case "danger":
      return {
        backgroundColor: "#FEE2E2", // red-100
        borderWidth: 1,
        borderColor: "#EF4444", // red-500
      };
    case "flat":
      return {
        backgroundColor: "#fff",
        borderWidth: 0,
        elevation: 0,
        shadowOpacity: 0,
      };
    case "elevated":
    default:
      return {
        backgroundColor: "#fff",
        elevation: 3,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        borderWidth: 0,
      };
  }
};

export const CustomCard = ({
  variant = "elevated",
  style,
  contentStyle,
  header,
  footer,
  children,
  ...props
}: CustomCardProps) => (
  <View style={[styles.card, getCardVariantStyle(variant), style]} {...props}>
    {header && <View style={styles.header}>{header}</View>}
    <View style={[styles.content, contentStyle]}>{children}</View>
    {footer && <View style={styles.footer}>{footer}</View>}
  </View>
);

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 0,
    marginVertical: 8,
    marginHorizontal: 0,
    overflow: "hidden",
  },
  header: {
    padding: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#E5E7EB",
  },
  content: {
    padding: 16,
  },
  footer: {
    padding: 16,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "#E5E7EB",
  },
});

export default CustomCard; 