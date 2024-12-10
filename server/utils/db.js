import { Sequelize } from 'sequelize';
import { User, MetaInsight, Board, List, Card, Label, Comment } from '../models/index.js';

export const validateConnection = async (sequelize) => {
  try {
    await sequelize.authenticate();
    console.log('Database connection validated successfully');
    return true;
  } catch (error) {
    console.error('Database connection validation failed:', error);
    return false;
  }
};

export const syncModels = async (sequelize, force = false) => {
  try {
    // Define the order of model synchronization
    const models = [
      User,
      MetaInsight,
      Board,
      List,
      Card,
      Label,
      Comment
    ];

    // Sync models in order
    for (const model of models) {
      await model.sync({ force });
      console.log(`Synchronized model: ${model.name}`);
    }

    // Create indexes
    await sequelize.query('CREATE INDEX IF NOT EXISTS idx_meta_insights_date ON meta_insights(date)');
    await sequelize.query('CREATE INDEX IF NOT EXISTS idx_meta_insights_user ON meta_insights(user_id)');
    await sequelize.query('CREATE INDEX IF NOT EXISTS idx_lists_board ON lists(board_id)');
    await sequelize.query('CREATE INDEX IF NOT EXISTS idx_cards_list ON cards(list_id)');
    await sequelize.query('CREATE INDEX IF NOT EXISTS idx_comments_card ON comments(card_id)');

    console.log('All models synchronized and indexes created successfully');
    return true;
  } catch (error) {
    console.error('Model synchronization failed:', error);
    return false;
  }
};

export const closeConnection = async (sequelize) => {
  try {
    await sequelize.close();
    console.log('Database connection closed successfully');
    return true;
  } catch (error) {
    console.error('Failed to close database connection:', error);
    return false;
  }
};

export const checkTableExists = async (sequelize, tableName) => {
  try {
    await sequelize.query(`SELECT 1 FROM ${tableName} LIMIT 1`);
    return true;
  } catch (error) {
    return false;
  }
};

export const createInitialData = async () => {
  try {
    // Check if we already have data
    const userCount = await User.count();
    if (userCount > 0) {
      console.log('Initial data already exists, skipping creation');
      return true;
    }

    // Create test user
    const user = await User.create({
      email: 'test@example.com',
      password: 'password123',
      name: 'Test User',
    });

    // Create test board
    const board = await Board.create({
      title: 'Welcome Board',
      userId: user.id,
    });

    // Create initial lists
    const lists = await Promise.all([
      List.create({ title: 'To Do', boardId: board.id, position: 0 }),
      List.create({ title: 'In Progress', boardId: board.id, position: 1 }),
      List.create({ title: 'Done', boardId: board.id, position: 2 }),
    ]);

    // Create sample label
    await Label.create({
      name: 'High Priority',
      color: 'red',
      boardId: board.id,
    });

    // Create welcome card
    const card = await Card.create({
      title: 'Welcome to your board!',
      description: 'This is your first card. Try moving it to another list.',
      listId: lists[0].id,
      position: 0,
    });

    // Add welcome comment
    await Comment.create({
      text: 'Welcome to your new board! Feel free to customize it.',
      cardId: card.id,
      userId: user.id,
    });

    console.log('Initial data created successfully');
    return true;
  } catch (error) {
    console.error('Failed to create initial data:', error);
    return false;
  }
};