import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      profile: null,
      role: null,
      token: null,
      isLoggedIn: false,
      isLoading: false,
      error: null,
      _hasHydrated: false,
      selectedUnit: null,
      userType: null,

      setHasHydrated: (val) => set({ _hasHydrated: val }),
      setUser: (user) => set({ user }),
      setToken: (token) => set({ token }),
      setLoading: (bool) => set({ isLoading: bool }),
      setError: (error) => set({ error }),
      clearError: () => set({ error: null }),

      setSelectedUnit: (unit) =>
        set({
          selectedUnit: unit,
          userType: unit?.memberTypePrimary || null,
          role: unit?.memberTypePrimary || null,
        }),

      setProfile: (profile) => set({ profile, isLoggedIn: true }),

      logout: () =>
        set({
          user: null,
          profile: null,
          role: null,
          token: null,
          isLoggedIn: false,
          isLoading: false,
          error: null,
          selectedUnit: null,
          userType: null,
        }),

      getProfileId: () => get().profile?.profileId || null,
      getMobile: () => get().profile?.mobileNumber || null,
      getFullName: () => {
        const p = get().profile;
        if (!p) return "";
        return `${p.firstName || ""} ${p.lastName || ""}`.trim();
      },
      isRole: (role) => get().role === role,
      hasRole: (roles) => roles.includes(get().role),
    }),
    {
      name: "k2k-auth-store",
      partialize: (state) => ({
        profile: state.profile,
        role: state.role,
        token: state.token,
        isLoggedIn: state.isLoggedIn,
        selectedUnit: state.selectedUnit,
        userType: state.userType,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);

export default useAuthStore;
