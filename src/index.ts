import { NativeEventEmitter, NativeModules } from 'react-native';
import { nativeAppShield } from './native';
import { SecurityStatus } from './types';

const { AppShield } = NativeModules;
const appShieldEmitter = new NativeEventEmitter(AppShield);

let config: { disableInDev?: boolean; enableLogging?: boolean } = {};

export const configure = (newConfig: typeof config) => {
  config = { ...config, ...newConfig };
};

export const enableSecureView = (enabled: boolean) => {
  if (config.disableInDev && __DEV__) return;
  nativeAppShield.enableSecureView(enabled);
};

export const onScreenRecording = (callback: (isRecording: boolean) => void): (() => void) => {
  nativeAppShield.startScreenRecordingDetection();

  const subscription = appShieldEmitter.addListener('onScreenRecording', (event) => {
    callback(event.isRecording);
  });

  return () => {
    subscription.remove();
    nativeAppShield.stopScreenRecordingDetection();
  };
};

export const getSecurityStatus = async (): Promise<SecurityStatus> => {
  return await nativeAppShield.getSecurityStatus();
};

export { AppShieldProvider, useAppShield, useScreenRecording } from './hooks';
export { SecureScreen } from './components';
export type { SecurityStatus, AppShieldConfig } from './types';