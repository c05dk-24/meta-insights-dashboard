-- Insert test users with bcrypt hashed passwords
INSERT INTO "Users" (email, password, name) VALUES
    -- Password: admin@example.com
    ('admin@example.com', '$2b$10$zPiXsZ4MMqmGqp7.9lJ6B.xP.JHIzqWQv3Y5XNwZcqy2JXEn8zKlq', 'Admin User'),
    -- Password: test@example.com
    ('test@example.com', '$2b$10$zPiXsZ4MMqmGqp7.9lJ6B.xP.JHIzqWQv3Y5XNwZcqy2JXEn8zKlq', 'Test User'),
    -- Password: demo@example.com
    ('demo@example.com', '$2b$10$zPiXsZ4MMqmGqp7.9lJ6B.xP.JHIzqWQv3Y5XNwZcqy2JXEn8zKlq', 'Demo User');

-- Get user IDs for foreign key references
DO $$ 
DECLARE
    admin_id UUID;
    test_id UUID;
    demo_id UUID;
    board_id UUID;
    list_id UUID;
    card_id UUID;
BEGIN
    -- Get user IDs
    SELECT id INTO admin_id FROM "Users" WHERE email = 'admin@example.com';
    SELECT id INTO test_id FROM "Users" WHERE email = 'test@example.com';
    SELECT id INTO demo_id FROM "Users" WHERE email = 'demo@example.com';

    -- Insert sample Meta insights
    INSERT INTO "MetaInsights" (user_id, date, impressions, reach, engagement, clicks, page_id)
    VALUES
        (admin_id, CURRENT_DATE, 1500, 1200, 300, 150, 'page123'),
        (admin_id, CURRENT_DATE - INTERVAL '1 day', 1200, 1000, 250, 120, 'page123'),
        (admin_id, CURRENT_DATE - INTERVAL '2 days', 1300, 1100, 280, 130, 'page123');

    -- Insert test board
    INSERT INTO "Boards" (title, user_id)
    VALUES ('Welcome Board', admin_id)
    RETURNING id INTO board_id;

    -- Insert test lists
    INSERT INTO "Lists" (title, board_id, position)
    VALUES 
        ('To Do', board_id, 0),
        ('In Progress', board_id, 1),
        ('Done', board_id, 2);

    -- Get first list ID
    SELECT id INTO list_id FROM "Lists" WHERE board_id = board_id AND position = 0;

    -- Insert test card
    INSERT INTO "Cards" (title, description, list_id, position)
    VALUES (
        'Welcome to your board!',
        'This is your first card. Try moving it to another list.',
        list_id,
        0
    ) RETURNING id INTO card_id;

    -- Insert test label
    INSERT INTO "Labels" (name, color, board_id)
    VALUES ('High Priority', 'red', board_id);

    -- Insert test comment
    INSERT INTO "Comments" (text, card_id, user_id)
    VALUES (
        'Welcome to your new board! Feel free to customize it.',
        card_id,
        admin_id
    );
END $$;