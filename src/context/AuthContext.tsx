import { createContext } from "react";
import type { User } from "@supabase/supabase-js";

export type AuthContextType = {
  user: User | null;
  loading: boolean;
  logout: () => Promise<void>;
};

export const AuthContext =
  createContext<AuthContextType>({
    user: null,
    loading: true,
    logout: async () => {},
  });