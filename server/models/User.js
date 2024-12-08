import { DataTypes } from 'sequelize';
import bcrypt from 'bcryptjs';
import sequelize from '../config/database.js';
import dbLogger from '../utils/db-logger.js';

const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  metaAccessToken: {
    type: DataTypes.TEXT,
    allowNull: true,
    field: 'meta_access_token'
  },
  metaPageId: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'meta_page_id'
  }
}, {
  tableName: 'Users', // Updated to match the correct table name
  timestamps: true,
  underscored: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

// Instance method to compare passwords
User.prototype.comparePassword = async function(candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    dbLogger.error('Password comparison error:', error);
    return false;
  }
};

// Hash password before save
User.beforeSave(async (user) => {
  if (user.changed('password')) {
    try {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
    } catch (error) {
      dbLogger.error('Password hashing error:', error);
      throw new Error('Error hashing password');
    }
  }
});

export default User;