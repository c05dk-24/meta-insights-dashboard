-- Insert test user (password is 'password123' hashed)
INSERT INTO users (email, password, name)
VALUES (
    'test@example.com',
    '$2a$10$6KvSM8.ON/H4KqxWoHdO2.NpRBXIXFLFEuCYXQKqpuEZBkqKPSHKu',
    'Test User'
);

-- Get the user ID
WITH user_data AS (
    SELECT id FROM users WHERE email = 'test@example.com'
),
-- Insert board and get ID
board_data AS (
    INSERT INTO boards (title, user_id)
    SELECT 'Welcome Board', id FROM user_data
    RETURNING id
),
-- Insert lists and get first list ID
list_data AS (
    INSERT INTO lists (title, board_id, position)
    SELECT title, board_id, position
    FROM (
        VALUES 
            ('To Do', 0),
            ('In Progress', 1),
            ('Done', 2)
    ) AS t(title, position)
    CROSS JOIN board_data
    RETURNING id, position
),
-- Insert card and get ID
card_data AS (
    INSERT INTO cards (title, description, list_id, position)
    SELECT 
        'Welcome to your board!',
        'This is your first card. Try moving it to another list.',
        id,
        0
    FROM list_data
    WHERE position = 0
    RETURNING id
)
-- Insert remaining data
SELECT
    -- Insert label
    (INSERT INTO labels (name, color, board_id)
    SELECT 'High Priority', 'red', id FROM board_data),
    -- Insert comment
    (INSERT INTO comments (text, card_id, user_id)
    SELECT 
        'Welcome to your new board! Feel free to customize it.',
        card_data.id,
        user_data.id
    FROM card_data, user_data),
    -- Insert meta insights
    (INSERT INTO meta_insights (user_id, date, impressions, reach, engagement, clicks, page_id)
    SELECT 
        user_data.id,
        generate_series(
            CURRENT_DATE - INTERVAL '2 days',
            CURRENT_DATE,
            INTERVAL '1 day'
        ),
        1000 + random() * 500,
        800 + random() * 400,
        200 + random() * 100,
        100 + random() * 50,
        'page123'
    FROM user_data);