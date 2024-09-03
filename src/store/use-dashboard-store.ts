import { create } from 'zustand';

// Define the type for the store
interface DashboardStoreType {
    isSidebarOpen: boolean;
    toggleSidebar: () => void;
}

const useDashboardStore = create<DashboardStoreType>((set) => ({
    isSidebarOpen: false,
    toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
}));

export default useDashboardStore;