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
export declare const nativeAppShield: NativeAppShield;
export declare const enableSecureView: (enabled: boolean) => void;
export declare const enableBackgroundBlur: (enabled: boolean) => void;
