# 🔒 React Native App Shield

[![npm version](https://badge.fury.io/js/react-native-app-shield.svg)](https://badge.fury.io/js/react-native-app-shield)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React Native](https://img.shields.io/badge/React%20Native-0.72+-blue.svg)](https://reactnative.dev/)

**Protect your React Native app from screenshots, screen recordings, and unauthorized access.**

React Native App Shield is a comprehensive security library that helps safeguard sensitive user data by preventing unauthorized screen captures and detecting device tampering. Perfect for banking, healthcare, e-commerce, and any app handling sensitive information.

## ✨ Features

- 🛡️ **Screenshot Blocking** - Prevent unauthorized screenshots on both iOS and Android
- 📹 **Screen Recording Detection** - Real-time detection of screen recording attempts
- 🌫️ **Background Blur** - Automatic blur overlay when app goes to background
- 🔍 **Root/Jailbreak Detection** - Identify compromised devices
- 📱 **Secure Screen Component** - Easy-to-use wrapper for protected content
- ⚙️ **Configurable** - Disable in development, enable logging
- 🎯 **TypeScript First** - Full TypeScript support with clean APIs
- 🚀 **Production Ready** - Minimal dependencies, stable and reliable

## 📦 Installation

```bash
npm install react-native-app-shield
# or
yarn add react-native-app-shield
```

### iOS Setup

Add the pod to your Podfile:

```ruby
pod 'react-native-app-shield', :path => '../node_modules/react-native-app-shield'
```

Then run:

```bash
cd ios && pod install
```

### Android Setup

No additional setup required for Android.

## 🚀 Quick Start

Wrap your app with `AppShieldProvider` and start protecting your content:

```tsx
import { AppShieldProvider } from 'react-native-app-shield';

export default function App() {
  return (
    <AppShieldProvider blurOnBackground>
      {/* Your app content */}
    </AppShieldProvider>
  );
}
```

## 📖 Usage

### Screenshot Protection

```tsx
import { enableSecureView } from 'react-native-app-shield';

// Enable screenshot blocking
enableSecureView(true);
```

### Screen Recording Detection

```tsx
import { onScreenRecording } from 'react-native-app-shield';

const unsubscribe = onScreenRecording((isRecording) => {
  if (isRecording) {
    // Handle recording detection
    console.log('Screen recording detected!');
  }
});

// Don't forget to unsubscribe
unsubscribe();
```

### Device Security Check

```tsx
import { getSecurityStatus } from 'react-native-app-shield';

const checkDevice = async () => {
  const { isRooted, isEmulator } = await getSecurityStatus();

  if (isRooted) {
    // Handle rooted device
  }
};
```

### Secure Screen Component

```tsx
import { SecureScreen } from 'react-native-app-shield';

export default function SensitiveScreen() {
  return (
    <SecureScreen enabled>
      <Text>This content is protected from screenshots</Text>
    </SecureScreen>
  );
}
```

### Using Hooks

```tsx
import { useScreenRecording, useAppShield } from 'react-native-app-shield';

function MyComponent() {
  const isRecording = useScreenRecording();
  const config = useAppShield();

  return (
    <View>
      <Text>Recording: {isRecording ? 'Active' : 'Inactive'}</Text>
    </View>
  );
}
```

## ⚙️ Configuration

```tsx
import { configure } from 'react-native-app-shield';

configure({
  disableInDev: true,    // Skip protections in development
  enableLogging: false,  // Disable console logging
});
```

## 📋 API Reference

### Functions

| Function | Description | Parameters |
|----------|-------------|------------|
| `enableSecureView(enabled: boolean)` | Enable/disable screenshot blocking | `enabled`: boolean |
| `onScreenRecording(callback)` | Listen for screen recording events | `callback(isRecording: boolean)` |
| `getSecurityStatus()` | Check device security status | Returns: `Promise<{isRooted: boolean, isEmulator: boolean}>` |
| `configure(config)` | Configure library settings | `config: {disableInDev?, enableLogging?}` |

### Components

| Component | Props | Description |
|-----------|-------|-------------|
| `AppShieldProvider` | `blurOnBackground?: boolean, children: ReactNode` | Context provider for app-wide settings |
| `SecureScreen` | `enabled: boolean, children: ReactNode` | Wrapper for protected screen content |

### Hooks

| Hook | Returns | Description |
|------|---------|-------------|
| `useAppShield()` | `AppShieldConfig` | Access current configuration |
| `useScreenRecording()` | `boolean` | Current screen recording state |

## 🌍 Platform Support

| Feature | iOS | Android |
|---------|-----|---------|
| Screenshot Blocking | ✅ Secure overlay | ✅ FLAG_SECURE |
| Screen Recording Detection | ✅ Reliable | ⚠️ Best effort |
| Background Blur | ✅ Visual effect | ✅ FLAG_SECURE |
| Root/Jailbreak Detection | ✅ Multiple checks | ✅ Multiple checks |
| Emulator Detection | ✅ Simulator check | ✅ Property checks |

### Requirements

- React Native 0.72+
- iOS 11+
- Android API 21+

## ⚠️ Platform Limitations

### iOS
- Screenshot blocking uses secure overlay (may not prevent all capture methods)
- Screen recording detection is highly reliable
- Background blur applies visual effect when app backgrounds

### Android
- Screenshot blocking prevents all screenshots via system flag
- Screen recording detection has limitations with third-party apps
- Root detection is best-effort and can be bypassed by advanced methods

## 🎯 Use Cases

- **Banking Apps** - Protect sensitive financial data
- **Healthcare Apps** - Secure patient information
- **E-commerce** - Prevent payment detail screenshots
- **Enterprise Apps** - Company data protection
- **Social Apps** - Privacy-focused features

## 🔧 Development

```bash
# Install dependencies
npm install

# Build TypeScript
npm run build

# Run example app
cd example && npm install && npm start
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with ❤️ for the React Native community
- Inspired by the need for better mobile app security

---

**Made with security in mind.** Protect your users, protect your data. 🔐