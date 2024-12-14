```typescript
import { create } from 'zustand';

interface LayoutStore {
  isSidebarOpen: boolean;
  toggleSidebar: (value?: boolean) => void;
}

export const useLayoutStore = create<LayoutStore>((set) => ({
  isSidebarOpen: false,
  toggleSidebar: (value) => set((state) => ({ 
    isSidebarOpen: value !== undefined ? value : !state.isSidebarOpen 
  })),
}));
```