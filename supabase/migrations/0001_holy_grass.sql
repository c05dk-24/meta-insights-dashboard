/*
  # Add Comments and Checklists Storage

  1. New Tables
    - `Comments`
      - `id` (uuid, primary key)
      - `text` (text)
      - `card_id` (uuid, foreign key)
      - `user_id` (uuid, foreign key)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `Checklists`
      - `id` (uuid, primary key)
      - `text` (text)
      - `completed` (boolean)
      - `card_id` (uuid, foreign key)
      - `position` (integer)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated users to manage their data
*/

-- Create Comments table
CREATE TABLE IF NOT EXISTS "Comments" (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  text TEXT NOT NULL,
  card_id UUID NOT NULL REFERENCES "Cards"(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES "Users"(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Create Checklists table
CREATE TABLE IF NOT EXISTS "Checklists" (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  text TEXT NOT NULL,
  completed BOOLEAN DEFAULT false,
  card_id UUID NOT NULL REFERENCES "Cards"(id) ON DELETE CASCADE,
  position INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Enable RLS
ALTER TABLE "Comments" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Checklists" ENABLE ROW LEVEL SECURITY;

-- Add RLS policies for Comments
CREATE POLICY "Users can view comments for their company's cards"
  ON "Comments"
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM "Cards" c
      JOIN "Lists" l ON c.list_id = l.id
      JOIN "Boards" b ON l.board_id = b.id
      WHERE c.id = "Comments".card_id
      AND b.company_id = auth.jwt() ->> 'company_id'
    )
  );

CREATE POLICY "Users can create comments for their company's cards"
  ON "Comments"
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM "Cards" c
      JOIN "Lists" l ON c.list_id = l.id
      JOIN "Boards" b ON l.board_id = b.id
      WHERE c.id = card_id
      AND b.company_id = auth.jwt() ->> 'company_id'
    )
  );

-- Add RLS policies for Checklists
CREATE POLICY "Users can view checklists for their company's cards"
  ON "Checklists"
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM "Cards" c
      JOIN "Lists" l ON c.list_id = l.id
      JOIN "Boards" b ON l.board_id = b.id
      WHERE c.id = "Checklists".card_id
      AND b.company_id = auth.jwt() ->> 'company_id'
    )
  );

CREATE POLICY "Users can manage checklists for their company's cards"
  ON "Checklists"
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM "Cards" c
      JOIN "Lists" l ON c.list_id = l.id
      JOIN "Boards" b ON l.board_id = b.id
      WHERE c.id = card_id
      AND b.company_id = auth.jwt() ->> 'company_id'
    )
  );

-- Add indexes
CREATE INDEX idx_comments_card ON "Comments"(card_id);
CREATE INDEX idx_comments_user ON "Comments"(user_id);
CREATE INDEX idx_checklists_card ON "Checklists"(card_id);