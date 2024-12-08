import { Board, List, Card, Label, Comment, User } from '../models/index.js';
import dbLogger from '../utils/db-logger.js';

export const getBoardsForCompany = async (companyId) => {
  try {
    return await Board.findAll({
      where: { company_id: companyId },
      include: [
        {
          model: List,
          separate: true,
          order: [['position', 'ASC']],
          include: [
            {
              model: Card,
              separate: true,
              order: [['position', 'ASC']],
              include: [
                {
                  model: User,
                  as: 'assignee',
                  attributes: ['id', 'name', 'email']
                },
                {
                  model: Label,
                  attributes: ['id', 'name', 'color']
                },
                {
                  model: Comment,
                  separate: true,
                  order: [['created_at', 'DESC']],
                  include: [{
                    model: User,
                    attributes: ['id', 'name']
                  }]
                }
              ]
            }
          ]
        }
      ],
      order: [['created_at', 'DESC']]
    });
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

    return await getBoardById(board.id);
  } catch (error) {
    dbLogger.error('Error creating board:', error);
    throw error;
  }
};

export const getBoardById = async (boardId) => {
  try {
    return await Board.findByPk(boardId, {
      include: [
        {
          model: List,
          include: [Card]
        },
        {
          model: Label,
          attributes: ['id', 'name', 'color', 'board_id', 'created_at']
        }
      ]
    });
  } catch (error) {
    dbLogger.error('Error fetching board:', error);
    throw error;
  }
};