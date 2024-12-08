```sql
-- Insert sample companies
INSERT INTO "Companies" (id, name) VALUES
    ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Acme Corp'),
    ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'TechStart Inc'),
    ('cccccccc-cccc-cccc-cccc-cccccccccccc', 'Global Solutions');

-- Insert test users with bcrypt hashed passwords
INSERT INTO "Users" (id, email, password, name, company_id) VALUES
    -- Password: admin123
    ('11111111-1111-1111-1111-111111111111',
     'admin@example.com',
     '$2b$10$rPFvFdpXfkgYg9w5F9FSR.YHMmYi2Rr2fy0JhVFJNK9GXS4.qPjnG',
     'Admin User',
     'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa'),
    -- Password: test123  
    ('22222222-2222-2222-2222-222222222222',
     'test@example.com',
     '$2b$10$6KvSM8.ON/H4KqxWoHdO2.NpRBXIXFLFEuCYXQKqpuEZBkqKPSHKu',
     'Test User',
     'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb');

-- Insert sample boards
INSERT INTO "Boards" (id, title, user_id, company_id) VALUES
    ('33333333-3333-3333-3333-333333333333',
     'Welcome Board',
     '11111111-1111-1111-1111-111111111111',
     'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa'),
    ('44444444-4444-4444-4444-444444444444',
     'Project Board',
     '22222222-2222-2222-2222-222222222222',
     'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb');

-- Insert sample lists
INSERT INTO "Lists" (id, title, board_id, position) VALUES
    ('55555555-5555-5555-5555-555555555555', 'To Do', '33333333-3333-3333-3333-333333333333', 0),
    ('66666666-6666-6666-6666-666666666666', 'In Progress', '33333333-3333-3333-3333-333333333333', 1),
    ('77777777-7777-7777-7777-777777777777', 'Done', '33333333-3333-3333-3333-333333333333', 2);

-- Insert sample cards
INSERT INTO "Cards" (id, title, description, list_id, position) VALUES
    ('88888888-8888-8888-8888-888888888888',
     'Welcome to your board!',
     'This is your first card. Try moving it to another list.',
     '55555555-5555-5555-5555-555555555555',
     0);

-- Insert sample labels
INSERT INTO "Labels" (id, name, color, board_id) VALUES
    ('99999999-9999-9999-9999-999999999999',
     'High Priority',
     'red',
     '33333333-3333-3333-3333-333333333333');

-- Insert sample comments
INSERT INTO "Comments" (id, text, card_id, user_id) VALUES
    ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaab',
     'Welcome to your new board! Feel free to customize it.',
     '88888888-8888-8888-8888-888888888888',
     '11111111-1111-1111-1111-111111111111');
```