import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const List = sequelize.define('List', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  board_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Boards',
      key: 'id'
    }
  },
  position: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'Lists',
  timestamps: true,
  underscored: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

export default List;