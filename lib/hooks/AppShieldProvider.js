import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useEffect } from 'react';
import { enableBackgroundBlur } from '../native';
const AppShieldContext = createContext({});
export const useAppShield = () => {
    const context = useContext(AppShieldContext);
    if (!context) {
        throw new Error('useAppShield must be used within AppShieldProvider');
    }
    return context;
};
export const AppShieldProvider = ({ blurOnBackground = false, children, config = {} }) => {
    useEffect(() => {
        enableBackgroundBlur(blurOnBackground);
    }, [blurOnBackground]);
    return (_jsx(AppShieldContext.Provider, { value: config, children: children }));
};
