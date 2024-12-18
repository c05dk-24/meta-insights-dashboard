```typescript
import { Board } from '../../types/meta';

export interface BoardPageProps {
  board?: Board;
  isLoading?: boolean;
  error?: Error | null;
}
```