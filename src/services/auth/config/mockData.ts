export const MOCK_USERS = [
  {
    id: '11111111-1111-1111-1111-111111111111',
    email: 'admin@example.com',
    password: 'admin123', // In real app, this would be hashed
    name: 'Admin User',
    company_id: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    companyName: 'Acme Corp'
  },
  {
    id: '22222222-2222-2222-2222-222222222222',
    email: 'test@example.com',
    password: 'test123',
    name: 'Test User',
    company_id: 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
    companyName: 'TechStart Inc'
  }
];

export const MOCK_TOKEN = 'mock-jwt-token';