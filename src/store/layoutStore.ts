```typescript
import { create } from 'zustand';

interface LayoutState {
  isSidebarOpen: boolean;
  toggleSidebar: (value?: boolean) => void;
}

export const useLayoutStore = create<LayoutState>((set) => ({
  isSidebarOpen: false,
  toggleSidebar: (value) => set((state) => ({ 
    isSidebarOpen: value !== undefined ? value : !state.isSidebarOpen 
  })),
}));
```