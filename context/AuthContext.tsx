import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type AuthContextData = {
  user: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: (username: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      const storedUser = await AsyncStorage.getItem("@Auth:user");

      if (storedUser) {
        setUser(storedUser);
      }

      setIsLoading(false);
    }

    loadUser();
  }, []);

  async function signIn(username: string) {
    setUser(username);
    await AsyncStorage.setItem("@Auth:user", username);
  }

  async function signOut() {
    setUser(null);
    await AsyncStorage.removeItem("@Auth:user");
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        signIn,
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