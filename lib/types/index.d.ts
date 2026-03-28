export interface SecurityStatus {
    isRooted: boolean;
    isEmulator: boolean;
}
export interface AppShieldConfig {
    disableInDev?: boolean;
    enableLogging?: boolean;
}
export interface AppShieldProviderProps {
    blurOnBackground?: boolean;
    children: React.ReactNode;
}
export interface SecureScreenProps {
    enabled: boolean;
    children: React.ReactNode;
}
