-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Drop existing tables if they exist
DROP TABLE IF EXISTS "Comments" CASCADE;
DROP TABLE IF EXISTS "Labels" CASCADE;
DROP TABLE IF EXISTS "Cards" CASCADE;
DROP TABLE IF EXISTS "Lists" CASCADE;
DROP TABLE IF EXISTS "Boards" CASCADE;
DROP TABLE IF EXISTS "MetaInsights" CASCADE;
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

-- Insert test users with bcrypt hashed passwords
INSERT INTO "Users" (email, password, name) VALUES
    -- Password: Admin123!
    ('admin@example.com', '$2b$10$rPFvFdpXfkgYg9w5F9FSR.YHMmYi2Rr2fy0JhVFJNK9GXS4.qPjnG', 'Admin User'),
    -- Password: Test123!
    ('test@example.com', '$2b$10$6KvSM8.ON/H4KqxWoHdO2.NpRBXIXFLFEuCYXQKqpuEZBkqKPSHKu', 'Test User'),
    -- Password: Demo123!
    ('demo@example.com', '$2b$10$YMxhPLhE7TqHxlh.7RZODOzQPtPXnpD0M1T0.F8qFLZOhUVr4lQPi', 'Demo User');

-- Rest of the tables...
[Previous table creation SQL remains the same]