import User from './User.js';
import MetaInsight from './MetaInsight.js';
import Board from './Board.js';
import List from './List.js';
import Card from './Card.js';
import Label from './Label.js';
import Comment from './Comment.js';
import AIPreference from './AIPreference.js';
import AIContent from './AIContent.js';

// User relationships
User.hasMany(MetaInsight);
User.hasMany(Board);
User.hasMany(Comment);
User.hasMany(AIPreference);
User.hasMany(AIContent);
User.hasMany(Card, { as: 'assignedCards', foreignKey: 'assigneeId' });

// Meta Insights relationships
MetaInsight.belongsTo(User);

// Board relationships
Board.belongsTo(User);
Board.hasMany(List);
Board.hasMany(Label);

// List relationships
List.belongsTo(Board);
List.hasMany(Card);

// Card relationships
Card.belongsTo(List);
Card.belongsTo(User, { as: 'assignee', foreignKey: 'assigneeId' });
Card.hasMany(Comment);
Card.belongsToMany(Label, { through: 'CardLabels' });

// Label relationships
Label.belongsTo(Board);
Label.belongsToMany(Card, { through: 'CardLabels' });

// Comment relationships
Comment.belongsTo(Card);
Comment.belongsTo(User);

// AI relationships
AIPreference.belongsTo(User);
AIContent.belongsTo(User);
AIContent.belongsTo(AIPreference, { as: 'preferences' });

export {
  User,
  MetaInsight,
  Board,
  List,
  Card,
  Label,
  Comment,
  AIPreference,
  AIContent,
};