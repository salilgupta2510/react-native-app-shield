import { NativeModules } from 'react-native';
const { AppShield } = NativeModules;
export const nativeAppShield = AppShield;
export const enableSecureView = (enabled) => {
    nativeAppShield.enableSecureView(enabled);
};
export const enableBackgroundBlur = (enabled) => {
    nativeAppShield.enableBackgroundBlur(enabled);
};
