
import { apiClient } from '@/lib/api/client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// --- Types ---

export interface User {
    id: string;
    name: string;
    email: string;
    phone: string;
    avatarUrl?: string;
    isVerified: boolean;
}

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (user: User) => void;
    logout: () => void;
    updateUser: (updates: Partial<User>) => void;
}

// --- Store ---

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            login: (user) => set({ user, isAuthenticated: true }),
            logout: () => set({ user: null, isAuthenticated: false }),
            updateUser: (updates) =>
                set((state) => ({
                    user: state.user ? { ...state.user, ...updates } : null,
                })),
        }),
        {
            name: 'auth-storage', // name of the item in the storage (must be unique)
            partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }), // persist only user and auth status
        }
    )
);

// --- Service ---

export const authService = {
    async login(phone: string, pin: string): Promise<User> {
        // In a real app, this would call the API
        // return apiClient.post<User>('/auth/login', { phone, pin });

        // Mock response for now
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate delay

        if (phone === '0000000000') { // trigger error for testing
            throw new Error('Invalid credentials');
        }

        const mockUser: User = {
            id: 'usr_123456789',
            name: 'John Doe',
            email: 'john.doe@example.com',
            phone: phone,
            isVerified: true,
            avatarUrl: 'https://ui-avatars.com/api/?name=John+Doe&background=random',
        };

        useAuthStore.getState().login(mockUser);
        return mockUser;
    },

    async signup(data: { name: string; email: string; phone: string }): Promise<void> {
        // await apiClient.post('/auth/signup', data);
        await new Promise(resolve => setTimeout(resolve, 1000));
    },

    async verifyOtp(phone: string, otp: string): Promise<User> {
        // const user = await apiClient.post<User>('/auth/verify-otp', { phone, otp });
        await new Promise(resolve => setTimeout(resolve, 1000));

        const mockUser: User = {
            id: 'usr_987654321',
            name: 'New User',
            email: 'new.user@example.com',
            phone: phone,
            isVerified: true,
        };

        useAuthStore.getState().login(mockUser);
        return mockUser;
    },

    async logout(): Promise<void> {
        // await apiClient.post('/auth/logout');
        useAuthStore.getState().logout();
    }
};
