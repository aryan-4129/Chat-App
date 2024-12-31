import { create } from "zustand";

export const themeStore = create((set) => ({
  theme: localStorage.getItem("chat-theme") || "white",
  setTheme: (theme) => {
    localStorage.setItem("chat-theme", theme);
    set({ theme: theme });
  },
}));