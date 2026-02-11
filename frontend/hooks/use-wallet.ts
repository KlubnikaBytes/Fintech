
import { useQuery } from '@tanstack/react-query';

export interface WalletBalance {
    currency: string;
    amount: number;
    symbol: string;
    flag: string;
}

// Mock API call
const fetchBalances = async (): Promise<WalletBalance[]> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800));
    return [
        { currency: 'USD', amount: 2540.00, symbol: '$', flag: '🇺🇸' },
        { currency: 'EUR', amount: 120.50, symbol: '€', flag: '🇪🇺' },
        { currency: 'GBP', amount: 85.00, symbol: '£', flag: '🇬🇧' },
        { currency: 'NGN', amount: 50000.00, symbol: '₦', flag: '🇳🇬' },
    ];
};

export function useWalletBalances() {
    return useQuery({
        queryKey: ['wallet-balances'],
        queryFn: fetchBalances,
        staleTime: 30000, // 30 seconds
    });
}

// Keep the original hook for backward compatibility if needed, or deprecate it
export function useWalletBalance() {
    return useQuery({
        queryKey: ['wallet-balance'],
        queryFn: async () => {
            const balances = await fetchBalances();
            return balances.find(b => b.currency === 'USD');
        },
        staleTime: 30000,
    });
}
