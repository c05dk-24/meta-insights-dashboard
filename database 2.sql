-- Drop existing tables if they exist
DROP TABLE IF EXISTS comments CASCADE;
DROP TABLE IF EXISTS labels CASCADE;
DROP TABLE IF EXISTS cards CASCADE;
DROP TABLE IF EXISTS lists CASCADE;
DROP TABLE IF EXISTS boards CASCADE;
DROP TABLE IF EXISTS meta_insights CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- Create Users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    meta_access_token TEXT,
    meta_page_id VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create Meta Insights table
CREATE TABLE meta_insights (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    impressions INTEGER DEFAULT 0,
    reach INTEGER DEFAULT 0,
    engagement INTEGER DEFAULT 0,
    clicks INTEGER DEFAULT 0,
    page_id VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, date, page_id)
);

-- Create Boards table
CREATE TABLE boards (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create Lists table
CREATE TABLE lists (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    board_id UUID NOT NULL REFERENCES boards(id) ON DELETE CASCADE,
    position INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create Cards table
CREATE TABLE cards (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    list_id UUID NOT NULL REFERENCES lists(id) ON DELETE CASCADE,
    position INTEGER NOT NULL,
    due_date DATE,
    assignee_id UUID REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create Labels table
CREATE TABLE labels (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(50) NOT NULL,
    color VARCHAR(20) NOT NULL,
    board_id UUID NOT NULL REFERENCES boards(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create Comments table
CREATE TABLE comments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    text TEXT NOT NULL,
    card_id UUID NOT NULL REFERENCES cards(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX idx_meta_insights_date ON meta_insights(date);
CREATE INDEX idx_meta_insights_user ON meta_insights(user_id);
CREATE INDEX idx_lists_board ON lists(board_id);
CREATE INDEX idx_cards_list ON cards(list_id);
CREATE INDEX idx_comments_card ON comments(card_id);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add triggers
CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_boards_updated_at
    BEFORE UPDATE ON boards
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_lists_updated_at
    BEFORE UPDATE ON lists
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_cards_updated_at
    BEFORE UPDATE ON cards
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_comments_updated_at
    BEFORE UPDATE ON comments
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data
-- Insert test user (password is 'password123' hashed)
INSERT INTO users (email, password, name)
VALUES (
    'test@example.com',
    '$2a$10$6KvSM8.ON/H4KqxWoHdO2.NpRBXIXFLFEuCYXQKqpuEZBkqKPSHKu',
    'Test User'
) RETURNING id;

-- Get the user ID for foreign key references
DO $$ 
DECLARE
    user_id UUID;
    board_id UUID;
    list_id UUID;
    card_id UUID;
BEGIN
    SELECT id INTO user_id FROM users WHERE email = 'test@example.com';

    -- Insert test board
    INSERT INTO boards (title, user_id)
    VALUES ('Welcome Board', user_id)
    RETURNING id INTO board_id;

    -- Insert test lists
    INSERT INTO lists (title, board_id, position)
    VALUES 
        ('To Do', board_id, 0),
        ('In Progress', board_id, 1),
        ('Done', board_id, 2);

    -- Get first list ID
    SELECT id INTO list_id FROM lists WHERE board_id = board_id LIMIT 1;

    -- Insert test card
    INSERT INTO cards (title, description, list_id, position)
    VALUES (
        'Welcome to your board!',
        'This is your first card. Try moving it to another list.',
        list_id,
        0
    ) RETURNING id INTO card_id;

    -- Insert test label
    INSERT INTO labels (name, color, board_id)
    VALUES ('High Priority', 'red', board_id);

    -- Insert test comment
    INSERT INTO comments (text, card_id, user_id)
    VALUES (
        'Welcome to your new board! Feel free to customize it.',
        card_id,
        user_id
    );

    -- Insert sample Meta insights
    INSERT INTO meta_insights (user_id, date, impressions, reach, engagement, clicks, page_id)
    VALUES
        (user_id, CURRENT_DATE, 1500, 1200, 300, 150, 'page123'),
        (user_id, CURRENT_DATE - INTERVAL '1 day', 1200, 1000, 250, 120, 'page123'),
        (user_id, CURRENT_DATE - INTERVAL '2 days', 1300, 1100, 280, 130, 'page123');
END $$;