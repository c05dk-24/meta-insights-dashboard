import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const AIPreference = sequelize.define('AIPreference', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  industry: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  tone: {
    type: DataTypes.ENUM('professional', 'casual', 'friendly', 'humorous'),
    allowNull: false,
  },
  ageRange: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
});

export default AIPreference;