```sql
-- Drop all tables in the correct order to handle dependencies
DROP TABLE IF EXISTS "CardLabels" CASCADE;
DROP TABLE IF EXISTS "Comments" CASCADE;
DROP TABLE IF EXISTS "Labels" CASCADE;
DROP TABLE IF EXISTS "Cards" CASCADE;
DROP TABLE IF EXISTS "Lists" CASCADE;
DROP TABLE IF EXISTS "Boards" CASCADE;
DROP TABLE IF EXISTS "MetaInsights" CASCADE;
DROP TABLE IF EXISTS "Users" CASCADE;
DROP TABLE IF EXISTS "Companies" CASCADE;

-- Drop any existing functions and triggers
DROP TRIGGER IF EXISTS update_companies_updated_at ON "Companies";
DROP TRIGGER IF EXISTS update_users_updated_at ON "Users";
DROP TRIGGER IF EXISTS update_boards_updated_at ON "Boards";
DROP TRIGGER IF EXISTS update_lists_updated_at ON "Lists";
DROP TRIGGER IF EXISTS update_cards_updated_at ON "Cards";
DROP TRIGGER IF EXISTS update_comments_updated_at ON "Comments";
DROP TRIGGER IF EXISTS update_meta_insights_updated_at ON "MetaInsights";
DROP FUNCTION IF EXISTS update_updated_at_column() CASCADE;

-- Drop extensions
DROP EXTENSION IF EXISTS "uuid-ossp";
```