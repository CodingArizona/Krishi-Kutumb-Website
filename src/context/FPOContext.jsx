import React, { createContext, useContext, useState, useCallback } from "react";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { STORAGE_KEYS } from "../config/constants";

// ─── Zustand Store for FPO ────────────────────────────────────────────────────
export const useFPOStore = create(
  persist(
    (set, get) => ({
      // ── State ──────────────────────────────────────────────────────────
      currentFPO: null, // selected FPO unit
      fpoList: [], // all FPOs
      members: [], // FPO members
      isLoading: false,
      error: null,

      // ── Setters ────────────────────────────────────────────────────────
      setCurrentFPO: (fpo) => set({ currentFPO: fpo }),
      setFPOList: (list) => set({ fpoList: list }),
      setMembers: (members) => set({ members }),
      setLoading: (bool) => set({ isLoading: bool }),
      setError: (error) => set({ error }),
      clearError: () => set({ error: null }),

      // ── Reset ──────────────────────────────────────────────────────────
      resetFPO: () =>
        set({
          currentFPO: null,
          fpoList: [],
          members: [],
          isLoading: false,
          error: null,
        }),

      // ── Getters ────────────────────────────────────────────────────────
      getFPOById: (id) => get().fpoList.find((f) => f.fpoId === id) || null,
      getMemberCount: () => get().members.length,
    }),
    {
      name: STORAGE_KEYS.FPO,
      partialize: (state) => ({
        currentFPO: state.currentFPO,
      }),
    },
  ),
);

// ─── Context ──────────────────────────────────────────────────────────────────
const FPOContext = createContext(null);

// ─── Provider ─────────────────────────────────────────────────────────────────
export const FPOProvider = ({ children }) => {
  const {
    currentFPO,
    fpoList,
    members,
    isLoading,
    error,
    setCurrentFPO,
    setFPOList,
    setMembers,
    setLoading,
    setError,
    clearError,
    resetFPO,
  } = useFPOStore();

  // FPO select karo
  const selectFPO = useCallback((fpo) => {
    setCurrentFPO(fpo);
  }, []);

  const value = {
    currentFPO,
    fpoList,
    members,
    isLoading,
    error,
    selectFPO,
    setFPOList,
    setMembers,
    setLoading,
    setError,
    clearError,
    resetFPO,
  };

  return <FPOContext.Provider value={value}>{children}</FPOContext.Provider>;
};

export const useFPO = () => {
  const ctx = useContext(FPOContext);
  if (!ctx) throw new Error("useFPO must be used within FPOProvider");
  return ctx;
};

export default FPOContext;
