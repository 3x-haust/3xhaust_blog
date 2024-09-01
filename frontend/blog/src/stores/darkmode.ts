import { create } from 'zustand'

type DarkModeState = {
  isDark: boolean
  setIsDark: (isDark: boolean) => void
  toggleDarkMode: () => void
}

const useDarkModeState = create<DarkModeState>((set) => ({
  isDark: false,
  setIsDark: (isDark) => set({ isDark }),
  toggleDarkMode: () => set((state) => ({ isDark: !state.isDark })),
}))

export default useDarkModeState