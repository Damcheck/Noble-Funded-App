import { create } from 'zustand';
import {
  mockUser,
  mockAccounts,
  mockPayouts,
  mockAffiliate,
  mockLeaderboard,
  UserProfile,
  TradingAccount,
  PayoutRequest,
  AffiliateData,
  LeaderboardEntry,
} from '@/constants/data';

interface AppState {
  // Auth
  isAuthenticated: boolean;
  user: UserProfile | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;

  // Data
  accounts: TradingAccount[];
  payouts: PayoutRequest[];
  affiliate: AffiliateData;
  leaderboard: LeaderboardEntry[];

  // UI state
  selectedAccountId: string | null;
  setSelectedAccount: (id: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
  // Auth - starts logged in with mock data for development
  isAuthenticated: false,
  user: null,

  login: async (email: string, _password: string) => {
    // TODO: Replace with real API call
    await new Promise((r) => setTimeout(r, 1200)); // Simulate network
    if (email) {
      set({ isAuthenticated: true, user: mockUser });
      return true;
    }
    return false;
  },

  logout: () => set({ isAuthenticated: false, user: null }),

  // Data
  accounts: mockAccounts,
  payouts: mockPayouts,
  affiliate: mockAffiliate,
  leaderboard: mockLeaderboard,

  // UI
  selectedAccountId: mockAccounts[0].id,
  setSelectedAccount: (id) => set({ selectedAccountId: id }),
}));
