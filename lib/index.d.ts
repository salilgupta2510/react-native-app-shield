import { SecurityStatus } from './types';
declare let config: {
    disableInDev?: boolean;
    enableLogging?: boolean;
};
export declare const configure: (newConfig: typeof config) => void;
export declare const enableSecureView: (enabled: boolean) => void;
export declare const onScreenRecording: (callback: (isRecording: boolean) => void) => (() => void);
export declare const getSecurityStatus: () => Promise<SecurityStatus>;
export { AppShieldProvider, useAppShield, useScreenRecording } from './hooks';
export { SecureScreen } from './components';
export type { SecurityStatus, AppShieldConfig } from './types';
