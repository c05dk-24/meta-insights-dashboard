-- Clear existing users
a
-- Insert test users with bcrypt hashed passwords
INSERT INTO users (id, email, password, name, created_at, updated_at)
VALUES
  -- Password: Admin123!
  ('11111111-1111-1111-1111-111111111111', 
   'admin@example.com',
   '$2b$10$rPFvFdpXfkgYg9w5F9FSR.YHMmYi2Rr2fy0JhVFJNK9GXS4.qPjnG',
   'Admin User',
   CURRENT_TIMESTAMP,
   CURRENT_TIMESTAMP),
   
  -- Password: Test123!
  ('22222222-2222-2222-2222-222222222222',
   'test@example.com',
   '$2b$10$6KvSM8.ON/H4KqxWoHdO2.NpRBXIXFLFEuCYXQKqpuEZBkqKPSHKu',
   'Test User',
   CURRENT_TIMESTAMP,
   CURRENT_TIMESTAMP),
   
  -- Password: Demo123!
  ('33333333-3333-3333-3333-333333333333',
   'demo@example.com',
   '$2b$10$YMxhPLhE7TqHxlh.7RZODOzQPtPXnpD0M1T0.F8qFLZOhUVr4lQPi',
   'Demo User',
   CURRENT_TIMESTAMP,
   CURRENT_TIMESTAMP);