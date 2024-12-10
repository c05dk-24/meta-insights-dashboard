import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const AIContent = sequelize.define('AIContent', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  prompt: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  preferencesId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
});

export default AIContent;