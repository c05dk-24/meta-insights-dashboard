-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Update Users table to work with Supabase Auth
ALTER TABLE "Users" 
ADD COLUMN IF NOT EXISTS auth_id UUID UNIQUE,
ADD COLUMN IF NOT EXISTS last_sign_in_at TIMESTAMPTZ;

-- Add RLS policies for authenticated users
CREATE POLICY "Users can read own data"
ON "Users"
FOR SELECT
TO authenticated
USING (
  auth.uid() = auth_id
  OR company_id = (
    SELECT company_id 
    FROM "Users" 
    WHERE auth_id = auth.uid()
  )
);

CREATE POLICY "Users can update own data"
ON "Users"
FOR UPDATE
TO authenticated
USING (auth.uid() = auth_id)
WITH CHECK (auth.uid() = auth_id);

-- Create function to handle new user registration
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE "Users"
  SET auth_id = NEW.id
  WHERE email = NEW.email;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user registration
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION handle_new_user();