-- Drop existing tables if they exist
DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS labels;
DROP TABLE IF EXISTS cards;
DROP TABLE IF EXISTS lists;
DROP TABLE IF EXISTS boards;
DROP TABLE IF EXISTS meta_insights;
DROP TABLE IF EXISTS users;

-- Create Users table
CREATE TABLE users (
    id VARCHAR(36) PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    meta_access_token TEXT,
    meta_page_id VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create Meta Insights table
CREATE TABLE meta_insights (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) NOT NULL,
    date DATE NOT NULL,
    impressions INT DEFAULT 0,
    reach INT DEFAULT 0,
    engagement INT DEFAULT 0,
    clicks INT DEFAULT 0,
    page_id VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY unique_daily_insight (user_id, date, page_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Create Boards table
CREATE TABLE boards (
    id VARCHAR(36) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    user_id VARCHAR(36) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Create Lists table
CREATE TABLE lists (
    id VARCHAR(36) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    board_id VARCHAR(36) NOT NULL,
    position INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (board_id) REFERENCES boards(id) ON DELETE CASCADE
);

-- Create Cards table
CREATE TABLE cards (
    id VARCHAR(36) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    list_id VARCHAR(36) NOT NULL,
    position INT NOT NULL,
    due_date DATE,
    assignee_id VARCHAR(36),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (list_id) REFERENCES lists(id) ON DELETE CASCADE,
    FOREIGN KEY (assignee_id) REFERENCES users(id) ON DELETE SET NULL
);

-- Create Labels table
CREATE TABLE labels (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    color VARCHAR(20) NOT NULL,
    board_id VARCHAR(36) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (board_id) REFERENCES boards(id) ON DELETE CASCADE
);

-- Create Comments table
CREATE TABLE comments (
    id VARCHAR(36) PRIMARY KEY,
    text TEXT NOT NULL,
    card_id VARCHAR(36) NOT NULL,
    user_id VARCHAR(36) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (card_id) REFERENCES cards(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Create indexes for better query performance
CREATE INDEX idx_meta_insights_date ON meta_insights(date);
CREATE INDEX idx_meta_insights_user ON meta_insights(user_id);
CREATE INDEX idx_lists_board ON lists(board_id);
CREATE INDEX idx_cards_list ON cards(list_id);
CREATE INDEX idx_comments_card ON comments(card_id);

-- Insert test data
-- Insert test user (password is 'password123' hashed)
INSERT INTO users (id, email, password, name) 
VALUES (
    UUID(),
    'test@example.com',
    '$2a$10$6KvSM8.ON/H4KqxWoHdO2.NpRBXIXFLFEuCYXQKqpuEZBkqKPSHKu',
    'Test User'
);

-- Get the user ID for foreign key references
SET @user_id = (SELECT id FROM users WHERE email = 'test@example.com');

-- Insert test board
INSERT INTO boards (id, title, user_id)
VALUES (UUID(), 'Welcome Board', @user_id);

-- Get the board ID for foreign key references
SET @board_id = (SELECT id FROM boards WHERE user_id = @user_id LIMIT 1);

-- Insert test lists
INSERT INTO lists (id, title, board_id, position)
VALUES 
    (UUID(), 'To Do', @board_id, 0),
    (UUID(), 'In Progress', @board_id, 1),
    (UUID(), 'Done', @board_id, 2);

-- Get the first list ID for cards
SET @list_id = (SELECT id FROM lists WHERE board_id = @board_id LIMIT 1);

-- Insert test cards
INSERT INTO cards (id, title, description, list_id, position)
VALUES (
    UUID(),
    'Welcome to your board!',
    'This is your first card. Try moving it to another list.',
    @list_id,
    0
);

-- Get the card ID for comments
SET @card_id = (SELECT id FROM cards WHERE list_id = @list_id LIMIT 1);

-- Insert test label
INSERT INTO labels (id, name, color, board_id)
VALUES (UUID(), 'High Priority', 'red', @board_id);

-- Insert test comment
INSERT INTO comments (id, text, card_id, user_id)
VALUES (
    UUID(),
    'Welcome to your new board! Feel free to customize it.',
    @card_id,
    @user_id
);

-- Insert sample Meta insights
INSERT INTO meta_insights (id, user_id, date, impressions, reach, engagement, clicks, page_id)
VALUES
    (UUID(), @user_id, CURDATE(), 1500, 1200, 300, 150, 'page123'),
    (UUID(), @user_id, DATE_SUB(CURDATE(), INTERVAL 1 DAY), 1200, 1000, 250, 120, 'page123'),
    (UUID(), @user_id, DATE_SUB(CURDATE(), INTERVAL 2 DAY), 1300, 1100, 280, 130, 'page123');