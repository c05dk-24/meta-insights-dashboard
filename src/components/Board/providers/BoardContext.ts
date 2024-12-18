```typescript
import { createContext } from 'react';
import { Board } from '../../../types/meta';

interface BoardContextValue {
  board: Board | null;
  isLoading: boolean;
  error: Error | null;
  initialized: boolean;
}

export const BoardContext = createContext<BoardContextValue | undefined>(undefined);
```