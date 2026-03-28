import { NativeModules, Platform } from 'react-native';

const { AppShield } = NativeModules;

export interface NativeAppShield {
  enableSecureView(enabled: boolean): void;
  enableBackgroundBlur(enabled: boolean): void;
  startScreenRecordingDetection(): void;
  stopScreenRecordingDetection(): void;
  getSecurityStatus(): Promise<{
    isRooted: boolean;
    isEmulator: boolean;
  }>;
  ping(): string;
}

export const nativeAppShield: NativeAppShield = AppShield;

export const enableSecureView = (enabled: boolean) => {
  nativeAppShield.enableSecureView(enabled);
};

export const enableBackgroundBlur = (enabled: boolean) => {
  nativeAppShield.enableBackgroundBlur(enabled);
};