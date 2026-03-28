import React, { createContext, useContext, useEffect, useState } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import { enableBackgroundBlur } from '../native';
import { AppShieldConfig } from '../types';

const AppShieldContext = createContext<AppShieldConfig>({});

export const useAppShield = () => {
  const context = useContext(AppShieldContext);
  if (!context) {
    throw new Error('useAppShield must be used within AppShieldProvider');
  }
  return context;
};

interface AppShieldProviderProps {
  blurOnBackground?: boolean;
  children: React.ReactNode;
  config?: AppShieldConfig;
}

export const AppShieldProvider: React.FC<AppShieldProviderProps> = ({
  blurOnBackground = false,
  children,
  config = {}
}) => {
  useEffect(() => {
    enableBackgroundBlur(blurOnBackground);
  }, [blurOnBackground]);

  return (
    <AppShieldContext.Provider value={config}>
      {children}
    </AppShieldContext.Provider>
  );
};