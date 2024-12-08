-- Insert sample companies
INSERT INTO "Companies" (id, name) VALUES
    ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Acme Corp'),
    ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'TechStart Inc'),
    ('cccccccc-cccc-cccc-cccc-cccccccccccc', 'Global Solutions');

-- Insert test users with bcrypt hashed passwords
INSERT INTO "Users" (id, email, password, name, company_id) VALUES
    -- Password: admin@example.com
    ('11111111-1111-1111-1111-111111111111',
     'admin@example.com',
     '$2b$10$zPiXsZ4MMqmGqp7.9lJ6B.xP.JHIzqWQv3Y5XNwZcqy2JXEn8zKlq',
     'Admin User',
     'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa'),
    -- Password: test@example.com  
    ('22222222-2222-2222-2222-222222222222',
     'test@example.com',
     '$2b$10$zPiXsZ4MMqmGqp7.9lJ6B.xP.JHIzqWQv3Y5XNwZcqy2JXEn8zKlq',
     'Test User',
     'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb');

-- Insert sample boards
INSERT INTO "Boards" (id, title, user_id, company_id) VALUES
    ('33333333-3333-3333-3333-333333333333',
     'Welcome Board',
     '11111111-1111-1111-1111-111111111111',
     'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa');

[Rest of the seed data remains the same...]