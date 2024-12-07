import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Label = sequelize.define('Label', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  color: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  boardId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
});

export default Label;