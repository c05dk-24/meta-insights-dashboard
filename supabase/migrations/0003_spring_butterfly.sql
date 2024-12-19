/*
  # Board Management Tables

  1. New Tables
    - Boards
      - id (uuid, primary key)
      - title (text)
      - user_id (uuid, references Users)
      - company_id (uuid, references Companies)
      - created_at (timestamp)
      - updated_at (timestamp)
    
    - Lists
      - id (uuid, primary key)
      - title (text)
      - board_id (uuid, references Boards)
      - position (integer)
      - created_at (timestamp)
      - updated_at (timestamp)
    
    - Cards
      - id (uuid, primary key)
      - title (text)
      - description (text, nullable)
      - list_id (uuid, references Lists)
      - position (integer)
      - due_date (date, nullable)
      - assignee_id (uuid, references Users)
      - created_at (timestamp)
      - updated_at (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for company-based access
*/

-- Create Boards table
CREATE TABLE IF NOT EXISTS "Boards" (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    user_id UUID NOT NULL REFERENCES "Users"(id) ON DELETE CASCADE,
    company_id UUID NOT NULL REFERENCES "Companies"(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Create Lists table
CREATE TABLE IF NOT EXISTS "Lists" (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    board_id UUID NOT NULL REFERENCES "Boards"(id) ON DELETE CASCADE,
    position INTEGER NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Create Cards table
CREATE TABLE IF NOT EXISTS "Cards" (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT,
    list_id UUID NOT NULL REFERENCES "Lists"(id) ON DELETE CASCADE,
    position INTEGER NOT NULL,
    due_date DATE,
    assignee_id UUID REFERENCES "Users"(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Enable RLS
ALTER TABLE "Boards" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Lists" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Cards" ENABLE ROW LEVEL SECURITY;

-- Add RLS policies for Boards
CREATE POLICY "Users can view their company's boards"
    ON "Boards"
    FOR SELECT
    TO authenticated
    USING (company_id = auth.jwt() ->> 'company_id');

CREATE POLICY "Users can manage their company's boards"
    ON "Boards"
    FOR ALL
    TO authenticated
    USING (company_id = auth.jwt() ->> 'company_id');

-- Add RLS policies for Lists
CREATE POLICY "Users can view lists in their company's boards"
    ON "Lists"
    FOR SELECT
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM "Boards"
            WHERE "Boards".id = "Lists".board_id
            AND "Boards".company_id = auth.jwt() ->> 'company_id'
        )
    );

CREATE POLICY "Users can manage lists in their company's boards"
    ON "Lists"
    FOR ALL
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM "Boards"
            WHERE "Boards".id = "Lists".board_id
            AND "Boards".company_id = auth.jwt() ->> 'company_id'
        )
    );

-- Add RLS policies for Cards
CREATE POLICY "Users can view cards in their company's boards"
    ON "Cards"
    FOR SELECT
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM "Lists"
            JOIN "Boards" ON "Lists".board_id = "Boards".id
            WHERE "Lists".id = "Cards".list_id
            AND "Boards".company_id = auth.jwt() ->> 'company_id'
        )
    );

CREATE POLICY "Users can manage cards in their company's boards"
    ON "Cards"
    FOR ALL
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM "Lists"
            JOIN "Boards" ON "Lists".board_id = "Boards".id
            WHERE "Lists".id = "Cards".list_id
            AND "Boards".company_id = auth.jwt() ->> 'company_id'
        )
    );

-- Create indexes
CREATE INDEX idx_boards_company ON "Boards"(company_id);
CREATE INDEX idx_boards_user ON "Boards"(user_id);
CREATE INDEX idx_lists_board ON "Lists"(board_id);
CREATE INDEX idx_cards_list ON "Cards"(list_id);
CREATE INDEX idx_cards_assignee ON "Cards"(assignee_id);