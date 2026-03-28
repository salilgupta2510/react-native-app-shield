import { NativeEventEmitter, NativeModules } from 'react-native';
import { nativeAppShield } from './native';
const { AppShield } = NativeModules;
const appShieldEmitter = new NativeEventEmitter(AppShield);
let config = {};
export const configure = (newConfig) => {
    config = Object.assign(Object.assign({}, config), newConfig);
};
export const enableSecureView = (enabled) => {
    if (config.disableInDev && __DEV__)
        return;
    nativeAppShield.enableSecureView(enabled);
};
export const onScreenRecording = (callback) => {
    nativeAppShield.startScreenRecordingDetection();
    const subscription = appShieldEmitter.addListener('onScreenRecording', (event) => {
        callback(event.isRecording);
    });
    return () => {
        subscription.remove();
        nativeAppShield.stopScreenRecordingDetection();
    };
};
export const getSecurityStatus = async () => {
    return await nativeAppShield.getSecurityStatus();
};
export { AppShieldProvider, useAppShield, useScreenRecording } from './hooks';
export { SecureScreen } from './components';
