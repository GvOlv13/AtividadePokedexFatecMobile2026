import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { apiIntegration, UserProfile } from "@/integration/api";

type AuthContextData = {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: (username: string, password?: string) => Promise<void>;
  register: (username: string, password?: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      const storedUserId = await AsyncStorage.getItem("@Auth:userId");

      if (storedUserId) {
        try {
            const profile = await apiIntegration.getProfile(storedUserId);
            setUser(profile);
        } catch(e) {
            await AsyncStorage.removeItem("@Auth:userId");
        }
      }

      setIsLoading(false);
    }

    loadUser();
  }, []);

  async function signIn(username: string, password?: string) {
    const profile = await apiIntegration.login(username, password || "");
    setUser(profile);
    await AsyncStorage.setItem("@Auth:userId", profile.id);
  }

  async function register(username: string, password?: string) {
    const profile = await apiIntegration.register(username, password || "");
    setUser(profile);
    await AsyncStorage.setItem("@Auth:userId", profile.id);
  }

  async function signOut() {
    setUser(null);
    await AsyncStorage.removeItem("@Auth:userId");
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        signIn,
        register,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}