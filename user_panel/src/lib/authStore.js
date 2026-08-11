import { create } from "zustand";
import { persist } from "zustand/middleware";
import { axiosInstance } from "./axiosInstance";
import toast from "react-hot-toast";

const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,
      isHydrated: false,
      isAuthLoading: false,

      setHydrated: () => set({ isHydrated: true }),

      setAuth: (accessToken, user) => set({ accessToken, user }),

      logoutLocal: () => set({ accessToken: null, user: null }),

      logout: async () => {
        try {
          await axiosInstance.post("/auth/logout");
          toast.success("Logged out successfully");
        } catch (e) {
          console.error("Logout error:", e);
        } finally {
          set({ accessToken: null, user: null });
          localStorage.removeItem("auth-storage");
        }
      },

      refresh: async () => {
        try {
          set({ isAuthLoading: true });
          const { data } = await axiosInstance.post("/auth/refresh");

          const accessToken = data?.data?.accessToken;
          const user = data?.data?.user;

          if (!accessToken || !user)
            throw new Error("Invalid refresh response");

          set({ accessToken, user });
          return { accessToken, user };
          // eslint-disable-next-line no-unused-vars
        } catch (error) {
          set({ accessToken: null, user: null });
          return null;
        } finally {
          set({ isAuthLoading: false });
        }
      },

      isLoggedIn: () => Boolean(get().accessToken && get().user),
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated?.();
        console.log("HYDRATED AUTH STATE:", state);
      },
    }
  )
);

export default useAuthStore;
