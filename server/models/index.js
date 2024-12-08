import sequelize from '../config/database.js';
import User from './User.js';
import Company from './Company.js';
import MetaInsight from './MetaInsight.js';
import Board from './Board.js';
import List from './List.js';
import Card from './Card.js';
import Label from './Label.js';
import Comment from './Comment.js';

// Company relationships
Company.hasMany(User, { foreignKey: 'company_id' });
Company.hasMany(Board, { foreignKey: 'company_id' });

// User relationships
User.belongsTo(Company, { foreignKey: 'company_id' });
User.hasMany(MetaInsight, { foreignKey: 'user_id' });
User.hasMany(Board, { foreignKey: 'user_id' });
User.hasMany(Comment, { foreignKey: 'user_id' });
User.hasMany(Card, { as: 'assignedCards', foreignKey: 'assignee_id' });

// Board relationships
Board.belongsTo(User, { foreignKey: 'user_id' });
Board.belongsTo(Company, { foreignKey: 'company_id' });
Board.hasMany(List, { foreignKey: 'board_id' });
Board.hasMany(Label, { foreignKey: 'board_id' });

// List relationships
List.belongsTo(Board, { foreignKey: 'board_id' });
List.hasMany(Card, { foreignKey: 'list_id' });

// Card relationships
Card.belongsTo(List, { foreignKey: 'list_id' });
Card.belongsTo(User, { as: 'assignee', foreignKey: 'assignee_id' });
Card.hasMany(Comment, { foreignKey: 'card_id' });
Card.belongsToMany(Label, { through: 'CardLabels' });

// Label relationships
Label.belongsTo(Board, { foreignKey: 'board_id' });
Label.belongsToMany(Card, { through: 'CardLabels' });

// Comment relationships
Comment.belongsTo(Card, { foreignKey: 'card_id' });
Comment.belongsTo(User, { foreignKey: 'user_id' });

// MetaInsight relationships
MetaInsight.belongsTo(User, { foreignKey: 'user_id' });

export {
  sequelize,
  Company,
  User,
  MetaInsight,
  Board,
  List,
  Card,
  Label,
  Comment
};