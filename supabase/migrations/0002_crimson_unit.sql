/*
  # Base Tables Setup

  1. New Tables
    - Companies
      - id (uuid, primary key)
      - name (text, unique)
      - created_at (timestamp)
      - updated_at (timestamp)
    
    - Users
      - id (uuid, primary key)
      - email (text, unique)
      - password (text)
      - name (text)
      - company_id (uuid, references Companies)
      - meta_access_token (text, nullable)
      - meta_page_id (text, nullable)
      - created_at (timestamp)
      - updated_at (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create Companies table
CREATE TABLE IF NOT EXISTS "Companies" (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL UNIQUE,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Create Users table
CREATE TABLE IF NOT EXISTS "Users" (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    name TEXT NOT NULL,
    company_id UUID NOT NULL REFERENCES "Companies"(id) ON DELETE CASCADE,
    meta_access_token TEXT,
    meta_page_id TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Enable RLS
ALTER TABLE "Companies" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Users" ENABLE ROW LEVEL SECURITY;

-- Add RLS policies
CREATE POLICY "Users can view their own company"
    ON "Companies"
    FOR SELECT
    TO authenticated
    USING (id = auth.jwt() ->> 'company_id');

CREATE POLICY "Users can view company members"
    ON "Users"
    FOR SELECT
    TO authenticated
    USING (company_id = auth.jwt() ->> 'company_id');

-- Create indexes
CREATE INDEX idx_users_company ON "Users"(company_id);