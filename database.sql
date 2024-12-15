-- Create Labels table
CREATE TABLE "Labels" (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(50) NOT NULL,
    color VARCHAR(20) NOT NULL,
    board_id UUID NOT NULL REFERENCES "Boards"(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create CardLabels junction table
CREATE TABLE "CardLabels" (
    card_id UUID NOT NULL REFERENCES "Cards"(id) ON DELETE CASCADE,
    label_id UUID NOT NULL REFERENCES "Labels"(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (card_id, label_id)
);

-- Create Checklists table
CREATE TABLE "Checklists" (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    text VARCHAR(255) NOT NULL,
    completed BOOLEAN DEFAULT false,
    card_id UUID NOT NULL REFERENCES "Cards"(id) ON DELETE CASCADE,
    position INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Add indexes
CREATE INDEX idx_labels_board ON "Labels"(board_id);
CREATE INDEX idx_card_labels_card ON "CardLabels"(card_id);
CREATE INDEX idx_card_labels_label ON "CardLabels"(label_id);
CREATE INDEX idx_checklists_card ON "Checklists"(card_id);