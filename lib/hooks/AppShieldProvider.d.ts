import React from 'react';
import { AppShieldConfig } from '../types';
export declare const useAppShield: () => AppShieldConfig;
interface AppShieldProviderProps {
    blurOnBackground?: boolean;
    children: React.ReactNode;
    config?: AppShieldConfig;
}
export declare const AppShieldProvider: React.FC<AppShieldProviderProps>;
export {};
