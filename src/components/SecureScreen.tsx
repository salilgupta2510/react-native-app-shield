import React, { useEffect } from 'react';
import { View } from 'react-native';
import { enableSecureView } from '../native';

interface SecureScreenProps {
  enabled: boolean;
  children: React.ReactNode;
}

export const SecureScreen: React.FC<SecureScreenProps> = ({ enabled, children }) => {
  useEffect(() => {
    enableSecureView(enabled);
    return () => {
      enableSecureView(false);
    };
  }, [enabled]);

  return <View style={{ flex: 1 }}>{children}</View>;
};