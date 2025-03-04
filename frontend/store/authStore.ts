"use client";

import { create } from "zustand";
import { User, AuthState } from "@/types/auth";
import { authApi } from "@/lib/api";
import { persist } from "zustand/middleware";
import { deleteCookie, setCookie } from "cookies-next";

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isLoading: false,
      token: null,

      login: async (email: string, password: string) => {
        set({ isLoading: true });
        try {
          const response = await authApi.login({ email, password });

          const user: User = {
            id: response.user.userId.toString(),
            name: response.user.name,
            email: response.user.email,
            role: response.role.roleName as User["role"],
          };

          authApi.setAuthToken(response.token);

          if (typeof window !== "undefined") {
            const domain = window.location.hostname;
            setCookie("fdmtoken", response.token, { maxAge: 30 * 24 * 60 * 60, domain });
            setCookie("fdmuser", JSON.stringify(user), { maxAge: 30 * 24 * 60 * 60, domain }); // Convert object to string
          }

          set({ user, token: response.token, isLoading: false });
          return user;
        } catch (error) {
          set({ isLoading: false });
          console.error("Login failed:", error);
          throw error;
        }
      },

      register: async (name: string, email: string, password: string) => {
        set({ isLoading: true });
        try {
          const response = await authApi.register({ name, email, password });

          const user: User = {
            id: response.newUser.userId.toString(),
            name: response.newUser.name,
            email: response.newUser.email,
            role: response.userRole.roleName as User["role"],
          };

          if (typeof window !== "undefined") {
            const domain = window.location.hostname;
            setCookie("fdmtoken", response.token, { maxAge: 30 * 24 * 60 * 60, domain });
            setCookie("fdmuser", JSON.stringify(user), { maxAge: 30 * 24 * 60 * 60, domain });
          }

          set({ user, token: response.token, isLoading: false });
          return user;
        } catch (error) {
          set({ isLoading: false });
          console.error("Registration failed:", error);
          throw error;
        }
      },

      logout: () => {
        authApi.clearAuthToken();
        set({ user: null, token: null });

        if (typeof window !== "undefined") {
          localStorage.clear();
          sessionStorage.clear();
          sessionStorage.removeItem("auth-storage"); // ✅ Remove Zustand persist storage
          
          const domain = window.location.hostname;
          deleteCookie("fdmtoken", { domain });
          deleteCookie("fdmuser", { domain });
        }
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({ user: state.user, token: state.token }),
    }
  )
);
