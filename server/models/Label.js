import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Label = sequelize.define('Label', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  color: {
    type: DataTypes.STRING(20),
    allowNull: false
  },
  board_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Boards',
      key: 'id'
    }
  }
}, {
  tableName: 'Labels',
  timestamps: true,
  underscored: true,
  createdAt: 'created_at',
  updatedAt: false // Labels don't have updated_at
});

export default Label;