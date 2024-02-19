import { create } from 'zustand'

interface useSidebarInterface {
    sidebar: boolean,
    setSidebar: () => void,
}

const useSidebarStore = create<useSidebarInterface>((set) => ({
    sidebar: true,
    setSidebar: () => set((state: any) => ({ sidebar: !state.sidebar })),
}))

export default useSidebarStore