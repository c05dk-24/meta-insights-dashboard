/*
  # Card Details Tables

  1. New Tables
    - Labels
      - id (uuid, primary key)
      - name (text)
      - color (text)
      - board_id (uuid, references Boards)
      - created_at (timestamp)
    
    - CardLabels (junction table)
      - card_id (uuid, references Cards)
      - label_id (uuid, references Labels)
      - created_at (timestamp)
      - Primary key (card_id, label_id)
    
    - Comments
      - id (uuid, primary key)
      - text (text)
      - card_id (uuid, references Cards)
      - user_id (uuid, references Users)
      - created_at (timestamp)
      - updated_at (timestamp)
    
    - Checklists
      - id (uuid, primary key)
      - text (text)
      - completed (boolean)
      - card_id (uuid, references Cards)
      - position (integer)
      - created_at (timestamp)
      - updated_at (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for company-based access
*/

-- Create Labels table
CREATE TABLE IF NOT EXISTS "Labels" (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    color TEXT NOT NULL,
    board_id UUID NOT NULL REFERENCES "Boards"(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Create CardLabels junction table
CREATE TABLE IF NOT EXISTS "CardLabels" (
    card_id UUID NOT NULL REFERENCES "Cards"(id) ON DELETE CASCADE,
    label_id UUID NOT NULL REFERENCES "Labels"(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (card_id, label_id)
);

-- Create Comments table
CREATE TABLE IF NOT EXISTS "Comments" (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    text TEXT NOT NULL,
    card_id UUID NOT NULL REFERENCES "Cards"(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES "Users"(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Create Checklists table
CREATE TABLE IF NOT EXISTS "Checklists" (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    text TEXT NOT NULL,
    completed BOOLEAN DEFAULT false,
    card_id UUID NOT NULL REFERENCES "Cards"(id) ON DELETE CASCADE,
    position INTEGER NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Enable RLS
ALTER TABLE "Labels" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "CardLabels" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Comments" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Checklists" ENABLE ROW LEVEL SECURITY;

-- Add RLS policies for Labels
CREATE POLICY "Users can view labels in their company's boards"
    ON "Labels"
    FOR SELECT
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM "Boards"
            WHERE "Boards".id = "Labels".board_id
            AND "Boards".company_id = auth.jwt() ->> 'company_id'
        )
    );

CREATE POLICY "Users can manage labels in their company's boards"
    ON "Labels"
    FOR ALL
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM "Boards"
            WHERE "Boards".id = "Labels".board_id
            AND "Boards".company_id = auth.jwt() ->> 'company_id'
        )
    );

-- Add RLS policies for CardLabels
CREATE POLICY "Users can view card labels in their company's boards"
    ON "CardLabels"
    FOR SELECT
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM "Cards"
            JOIN "Lists" ON "Cards".list_id = "Lists".id
            JOIN "Boards" ON "Lists".board_id = "Boards".id
            WHERE "Cards".id = "CardLabels".card_id
            AND "Boards".company_id = auth.jwt() ->> 'company_id'
        )
    );

CREATE POLICY "Users can manage card labels in their company's boards"
    ON "CardLabels"
    FOR ALL
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM "Cards"
            JOIN "Lists" ON "Cards".list_id = "Lists".id
            JOIN "Boards" ON "Lists".board_id = "Boards".id
            WHERE "Cards".id = "CardLabels".card_id
            AND "Boards".company_id = auth.jwt() ->> 'company_id'
        )
    );

-- Add RLS policies for Comments
CREATE POLICY "Users can view comments in their company's boards"
    ON "Comments"
    FOR SELECT
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM "Cards"
            JOIN "Lists" ON "Cards".list_id = "Lists".id
            JOIN "Boards" ON "Lists".board_id = "Boards".id
            WHERE "Cards".id = "Comments".card_id
            AND "Boards".company_id = auth.jwt() ->> 'company_id'
        )
    );

CREATE POLICY "Users can manage comments in their company's boards"
    ON "Comments"
    FOR ALL
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM "Cards"
            JOIN "Lists" ON "Cards".list_id = "Lists".id
            JOIN "Boards" ON "Lists".board_id = "Boards".id
            WHERE "Cards".id = "Comments".card_id
            AND "Boards".company_id = auth.jwt() ->> 'company_id'
        )
    );

-- Add RLS policies for Checklists
CREATE POLICY "Users can view checklists in their company's boards"
    ON "Checklists"
    FOR SELECT
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM "Cards"
            JOIN "Lists" ON "Cards".list_id = "Lists".id
            JOIN "Boards" ON "Lists".board_id = "Boards".id
            WHERE "Cards".id = "Checklists".card_id
            AND "Boards".company_id = auth.jwt() ->> 'company_id'
        )
    );

CREATE POLICY "Users can manage checklists in their company's boards"
    ON "Checklists"
    FOR ALL
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM "Cards"
            JOIN "Lists" ON "Cards".list_id = "Lists".id
            JOIN "Boards" ON "Lists".board_id = "Boards".id
            WHERE "Cards".id = "Checklists".card_id
            AND "Boards".company_id = auth.jwt() ->> 'company_id'
        )
    );

-- Create indexes
CREATE INDEX idx_labels_board ON "Labels"(board_id);
CREATE INDEX idx_card_labels_card ON "CardLabels"(card_id);
CREATE INDEX idx_card_labels_label ON "CardLabels"(label_id);
CREATE INDEX idx_comments_card ON "Comments"(card_id);
CREATE INDEX idx_comments_user ON "Comments"(user_id);
CREATE INDEX idx_checklists_card ON "Checklists"(card_id);