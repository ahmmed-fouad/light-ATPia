const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");
const path = require("path");

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Add path aliases
config.resolver.alias = {
  "@assets": path.resolve(__dirname, "assets"),
  "@": path.resolve(__dirname),
};

module.exports = withNativeWind(config, { input: "./global.css" });
