import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

type themeStore = { theme: string, setTheme: (theme: string) => void };

export const useThemeStore = create<themeStore>()(
    devtools(
        (set): themeStore => ({
            theme: 'light',
            setTheme: (theme: string) => set((state) => ({ theme }))
        }),{name : 'first'}
    )
)
