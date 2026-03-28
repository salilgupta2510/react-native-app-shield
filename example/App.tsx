import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import {
  AppShieldProvider,
  SecureScreen,
  enableSecureView,
  onScreenRecording,
  getSecurityStatus,
  useScreenRecording,
} from 'react-native-app-shield';

export default function App() {
  const [securityStatus, setSecurityStatus] = useState<{ isRooted: boolean; isEmulator: boolean } | null>(null);
  const isRecording = useScreenRecording();

  useEffect(() => {
    checkSecurity();
  }, []);

  const checkSecurity = async () => {
    const status = await getSecurityStatus();
    setSecurityStatus(status);
  };

  const toggleSecureView = () => {
    enableSecureView(true);
    setTimeout(() => enableSecureView(false), 5000); // Disable after 5 seconds
  };

  return (
    <AppShieldProvider blurOnBackground>
      <View style={styles.container}>
        <Text style={styles.title}>React Native App Shield Demo</Text>

        <Text>Screen Recording: {isRecording ? 'Yes' : 'No'}</Text>

        {securityStatus && (
          <View>
            <Text>Rooted/Jailbroken: {securityStatus.isRooted ? 'Yes' : 'No'}</Text>
            <Text>Emulator: {securityStatus.isEmulator ? 'Yes' : 'No'}</Text>
          </View>
        )}

        <Button title="Enable Secure View (5s)" onPress={toggleSecureView} />

        <SecureScreen enabled>
          <View style={styles.secureArea}>
            <Text style={styles.secureText}>This area is protected from screenshots</Text>
          </View>
        </SecureScreen>

        <Text style={styles.note}>
          Try taking a screenshot or recording the screen to test the features.
          Background the app to test blur protection.
        </Text>
      </View>
    </AppShieldProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  secureArea: {
    padding: 20,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    margin: 20,
  },
  secureText: {
    fontSize: 16,
    textAlign: 'center',
  },
  note: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
  },
});