import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const MetaInsight = sequelize.define('MetaInsight', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  user_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id'
    }
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  impressions: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  reach: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  engagement: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  clicks: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  page_id: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'MetaInsights',
  timestamps: true,
  underscored: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  indexes: [
    {
      unique: true,
      fields: ['user_id', 'date', 'page_id']
    }
  ]
});

export default MetaInsight;