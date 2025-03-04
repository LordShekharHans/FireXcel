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
          setCookie("fdmtoken", response.token, {
            maxAge: 30 * 24 * 60 * 60,
            domain: window.location.hostname,
          });
          setCookie("fdmuser", user, {
            maxAge: 30 * 24 * 60 * 60,
            domain: window.location.hostname,
          });
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

          authApi.setAuthToken(response.token);
          setCookie("fdmtoken", response.token, {
            maxAge: 30 * 24 * 60 * 60,
            domain: window.location.hostname,
          });
          setCookie("fdmuser", user, {
            maxAge: 30 * 24 * 60 * 60,
            domain: window.location.hostname,
          });
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
        localStorage.clear();
        sessionStorage.clear();
        deleteCookie("fdmtoken", {
          domain: window.location.hostname,
        });
        deleteCookie("fdmuser", {
          domain: window.location.hostname,
        });
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({ user: state.user, token: state.token }),
    }
  )
);
