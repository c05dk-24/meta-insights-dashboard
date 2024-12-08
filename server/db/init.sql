-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Drop existing tables if they exist
DROP TABLE IF EXISTS "Users" CASCADE;

-- Create Users table with uppercase name
CREATE TABLE "Users" (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    meta_access_token TEXT,
    meta_page_id VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for Users table
CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON "Users"
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Insert test users with properly hashed passwords
INSERT INTO "Users" (email, password, name) VALUES
    -- Password: Admin123!
    ('admin@example.com', '$2b$10$rPFvFdpXfkgYg9w5F9FSR.YHMmYi2Rr2fy0JhVFJNK9GXS4.qPjnG', 'Admin User'),
    -- Password: Test123!
    ('test@example.com', '$2b$10$6KvSM8.ON/H4KqxWoHdO2.NpRBXIXFLFEuCYXQKqpuEZBkqKPSHKu', 'Test User'),
    -- Password: Demo123!
    ('demo@example.com', '$2b$10$YMxhPLhE7TqHxlh.7RZODOzQPtPXnpD0M1T0.F8qFLZOhUVr4lQPi', 'Demo User');