import { DataTypes } from "sequelize";
import bcrypt from "bcryptjs";
import sequelize from "../config/database.js";
import dbLogger from "../utils/db-logger.js";
import Company from "./Company.js"; // Import the Company model

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    company_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "Companies", // References the Companies table
        key: "id",
      },
    },
    meta_access_token: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    meta_page_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "Users",
    timestamps: true,
    underscored: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

// Instance method to compare passwords
User.prototype.comparePassword = async function (candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    dbLogger.error("Password comparison error:", error);
    return false;
  }
};

// Hash password before save
User.beforeCreate(async (user) => {
  if (user.changed("password")) {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
  }
});

// Define associations
User.associate = (models) => {
  User.belongsTo(models.Company, {
    foreignKey: "company_id",
    as: "company", // Alias for the relationship
  });
};

export default User;
