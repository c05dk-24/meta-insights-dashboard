import { Board, List, Card, Label, Comment, User } from '../models/index.js';
import dbLogger from '../utils/db-logger.js';

export const getBoardsForCompany = async (companyId) => {
  dbLogger.log(`Fetching boards for company: ${companyId}`);
  
  try {
    const boards = await Board.findAll({
      where: { company_id: companyId },
      include: [{
        model: List,
        include: [{
          model: Card,
          include: [
            {
              model: User,
              as: 'assignee',
              attributes: ['id', 'name', 'email']
            },
            {
              model: Label,
              through: { attributes: [] }
            },
            {
              model: Comment,
              include: [{
                model: User,
                attributes: ['id', 'name']
              }]
            }
          ]
        }]
      }],
      order: [
        ['created_at', 'DESC'],
        [List, 'position', 'ASC'],
        [List, Card, 'position', 'ASC']
      ]
    });

    return boards;
  } catch (error) {
    dbLogger.error('Error fetching boards:', error);
    throw error;
  }
};

export const createBoard = async (title, userId, companyId) => {
  try {
    const board = await Board.create({
      title: title.trim(),
      user_id: userId,
      company_id: companyId
    });

    // Create default lists
    await List.bulkCreate([
      { title: 'To Do', board_id: board.id, position: 0 },
      { title: 'In Progress', board_id: board.id, position: 1 },
      { title: 'Done', board_id: board.id, position: 2 }
    ]);

    // Fetch the created board with all relationships
    return await getBoardById(board.id);
  } catch (error) {
    dbLogger.error('Error creating board:', error);
    throw error;
  }
};

export const getBoardById = async (boardId) => {
  try {
    return await Board.findByPk(boardId, {
      include: [{
        model: List,
        include: [{
          model: Card,
          include: [
            {
              model: User,
              as: 'assignee',
              attributes: ['id', 'name', 'email']
            },
            {
              model: Label,
              through: { attributes: [] }
            },
            {
              model: Comment,
              include: [{
                model: User,
                attributes: ['id', 'name']
              }]
            }
          ]
        }]
      }],
      order: [
        [List, 'position', 'ASC'],
        [List, Card, 'position', 'ASC']
      ]
    });
  } catch (error) {
    dbLogger.error('Error fetching board:', error);
    throw error;
  }
};