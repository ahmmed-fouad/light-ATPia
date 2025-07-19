# ATPia - Health & Nutrition App

A React Native app built with Expo Router and NativeWind for health tracking and nutrition management.

## Features

- **Authentication**: Welcome, Register, Login screens
- **AI Chatbot**: Powered by OpenRouter API with real-time streaming
- **Health Tracking**: Progress tracking and analytics
- **Nutrition**: Diet calculator and meal plans
- **Social**: Community features and forums

## Environment Setup

### For AI Chatbot

1. Get an API key from [OpenRouter](https://openrouter.ai/)
2. Create a `.env` file in the root directory:
   ```
   EXPO_PUBLIC_OPENROUTER_API_KEY=your_api_key_here
   ```
3. Update the `HTTP-Referer` in `features/ai/services/streamApi.tsx` to your app's URL

### Android Emulator Recommendations

For optimal streaming performance with OpenRouter.ai, we recommend:

#### **Recommended Emulators:**
- **Pixel 9** (API 34/35) - Best performance for streaming
- **Pixel 8 Pro** (API 34) - Excellent compatibility
- **Galaxy S24** (API 34) - Good performance
- **Pixel 7a** (API 33) - Reliable streaming

#### **Avoid These Emulators:**
- **Pixel 5** (API 30) - May have streaming issues
- **Older API versions** (API < 30) - Limited streaming support
- **Low-end devices** - May struggle with real-time updates

#### **Why These Recommendations:**
1. **Better Network Stack**: Newer API versions have improved HTTP/2 and streaming support
2. **Memory Management**: More RAM available for handling streaming connections
3. **JavaScript Engine**: V8 improvements in newer Android versions
4. **Fetch API**: Better native support for streaming responses

### Implementation Details

The AI chatbot uses a **fetch-based streaming approach** instead of Server-Sent Events (SSE) for better compatibility:

#### **Key Features:**
- ✅ **Native Fetch API**: Uses React Native's built-in fetch with ReadableStream
- ✅ **AbortController**: Proper connection cleanup and cancellation
- ✅ **TypeScript Support**: Full type safety with proper interfaces
- ✅ **Error Handling**: Comprehensive error handling for network issues
- ✅ **Memory Management**: Automatic cleanup of streaming connections
- ✅ **Cross-Platform**: Works consistently on both Android and iOS

#### **Technical Implementation:**
```typescript
// Uses native fetch with ReadableStream
const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
  method: "POST",
  headers: { /* ... */ },
  body: JSON.stringify({ /* ... */ }),
  signal: abortController.signal, // For cancellation
});

const reader = response.body.getReader();
// Process streaming data chunk by chunk
```

#### **Benefits Over SSE:**
- 🔥 **Better Android Compatibility**: Works on all Android emulators
- 🔥 **No External Dependencies**: Uses native APIs only
- 🔥 **Better Error Handling**: More predictable error scenarios
- 🔥 **Memory Efficient**: Automatic cleanup prevents memory leaks
- 🔥 **TypeScript Support**: Full type safety throughout

## Installation

```bash
npm install
npm start
```

## Project Structure

- `app/` - Expo Router screens and layouts
- `components/` - Reusable UI components
- `features/` - Feature-specific components and logic
- `hooks/` - Custom React hooks
- `shared/` - Shared utilities and data

# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
