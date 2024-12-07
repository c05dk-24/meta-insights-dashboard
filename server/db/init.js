import { initDatabase } from '../config/database.js';
import { User, Board, List, Card, Label, Comment } from '../models/index.js';
import bcrypt from 'bcryptjs';
import dbLogger from '../utils/db-logger.js';

const initializeDatabase = async () => {
  try {
    await initDatabase();
    
    dbLogger.log('Creating initial data...');
    
    // Create a test user with hashed password
    const hashedPassword = await bcrypt.hash('password123', 10);
    const user = await User.create({
      email: 'test@example.com',
      password: hashedPassword,
      name: 'Test User',
    });

    // Create a test board
    const board = await Board.create({
      title: 'Welcome Board',
      userId: user.id,
    });

    // Create some lists
    const lists = await Promise.all([
      List.create({
        title: 'To Do',
        boardId: board.id,
        position: 0,
      }),
      List.create({
        title: 'In Progress',
        boardId: board.id,
        position: 1,
      }),
      List.create({
        title: 'Done',
        boardId: board.id,
        position: 2,
      }),
    ]);

    // Create some sample labels
    await Label.create({
      name: 'High Priority',
      color: 'red',
      boardId: board.id,
    });

    // Create some cards
    const card = await Card.create({
      title: 'Welcome to your board!',
      description: 'This is your first card. Try moving it to another list.',
      listId: lists[0].id,
      position: 0,
    });

    // Add a sample comment
    await Comment.create({
      text: 'Welcome to your new board! Feel free to customize it.',
      cardId: card.id,
      userId: user.id,
    });

    dbLogger.log('Database initialized successfully with test data');
    process.exit(0);
  } catch (error) {
    dbLogger.error('Failed to initialize database:', error);
    process.exit(1);
  }
};

initializeDatabase();