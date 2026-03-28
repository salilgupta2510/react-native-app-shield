import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect } from 'react';
import { View } from 'react-native';
import { enableSecureView } from '../native';
export const SecureScreen = ({ enabled, children }) => {
    useEffect(() => {
        enableSecureView(enabled);
        return () => {
            enableSecureView(false);
        };
    }, [enabled]);
    return _jsx(View, { style: { flex: 1 }, children: children });
};
