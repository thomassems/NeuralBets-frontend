import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';
import { getWallet, Wallet } from '../api/walletApi';

interface WalletContextType {
    wallet: Wallet | null;
    loading: boolean;
    refreshWallet: () => Promise<void>;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const useWallet = () => {
    const context = useContext(WalletContext);
    if (!context) {
        throw new Error('useWallet must be used within a WalletProvider');
    }
    return context;
};

interface WalletProviderProps {
    children: ReactNode;
}

export const WalletProvider: React.FC<WalletProviderProps> = ({ children }) => {
    const { currentUser } = useAuth();
    const [wallet, setWallet] = useState<Wallet | null>(null);
    const [loading, setLoading] = useState(true);

    const refreshWallet = async () => {
        if (!currentUser) {
            setWallet(null);
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            const walletData = await getWallet(currentUser.uid);
            setWallet(walletData);
        } catch (err) {
            console.error('Error fetching wallet:', err);
            setWallet(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        refreshWallet();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentUser]);

    const value: WalletContextType = {
        wallet,
        loading,
        refreshWallet
    };

    return (
        <WalletContext.Provider value={value}>
            {children}
        </WalletContext.Provider>
    );
};
