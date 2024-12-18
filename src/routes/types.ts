```typescript
import { RouteObject } from 'react-router-dom';

export interface AppRoute extends RouteObject {
  title?: string;
  icon?: React.ComponentType;
  children?: AppRoute[];
}

export interface RouterConfig {
  future: {
    v7_startTransition: boolean;
    v7_relativeSplatPath: boolean;
  };
}
```