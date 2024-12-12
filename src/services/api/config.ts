```typescript
export const API_CONFIG = {
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001',
  timeout: 10000,
  retries: 3,
  retryDelay: 1000,
  headers: {
    'Content-Type': 'application/json'
  },
  endpoints: {
    auth: '/auth',
    boards: '/boards',
    lists: (boardId: string) => `/boards/${boardId}/lists`,
    cards: (boardId: string, listId: string) => `/boards/${boardId}/lists/${listId}/cards`
  }
} as const;
```