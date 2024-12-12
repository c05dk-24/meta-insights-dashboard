import sequelize from "../config/database.js";
import User from "./User.js";
import Company from "./Company.js";
import MetaInsight from "./MetaInsight.js";
import Board from "./Board.js";
import List from "./List.js";
import Card from "./Card.js";
import Label from "./Label.js";
import Comment from "./Comment.js";

// Company relationships
Company.hasMany(User, { foreignKey: "company_id", as: "users" });
Company.hasMany(Board, { foreignKey: "company_id", as: "boards" });

// User relationships
User.belongsTo(Company, { foreignKey: "company_id", as: "company" });
User.hasMany(MetaInsight, { foreignKey: "user_id", as: "metaInsights" });
User.hasMany(Board, { foreignKey: "user_id", as: "boards" });
User.hasMany(Comment, { foreignKey: "user_id", as: "comments" });
User.hasMany(Card, { as: "assignedCards", foreignKey: "assignee_id" });

// Board relationships
Board.belongsTo(User, { foreignKey: "user_id", as: "user" });
Board.belongsTo(Company, { foreignKey: "company_id", as: "company" });
Board.hasMany(List, { foreignKey: "board_id", as: "lists" });
Board.hasMany(Label, { foreignKey: "board_id", as: "labels" });

// List relationships
List.belongsTo(Board, { foreignKey: "board_id", as: "board" });
List.hasMany(Card, { foreignKey: "list_id", as: "cards" });

// Card relationships
Card.belongsTo(List, { foreignKey: "list_id", as: "list" });
Card.belongsTo(User, { as: "assignee", foreignKey: "assignee_id" });
Card.hasMany(Comment, { foreignKey: "card_id", as: "comments" });
Card.belongsToMany(Label, {
  through: "CardLabels",
  timestamps: false, // CardLabels junction table has no timestamps
  as: "labels",
});

// Label relationships
Label.belongsTo(Board, { foreignKey: "board_id", as: "board" });
Label.belongsToMany(Card, {
  through: "CardLabels",
  timestamps: false, // CardLabels junction table has no timestamps
  as: "cards",
});

// Comment relationships
Comment.belongsTo(Card, { foreignKey: "card_id", as: "card" });
Comment.belongsTo(User, { foreignKey: "user_id", as: "user" });

// MetaInsight relationships
MetaInsight.belongsTo(User, { foreignKey: "user_id", as: "user" });

export {
  sequelize,
  Company,
  User,
  MetaInsight,
  Board,
  List,
  Card,
  Label,
  Comment,
};
