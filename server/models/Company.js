import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import User from "./User.js"; // Import the User model for association

const Company = sequelize.define(
  "Company",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    tableName: "Companies",
    timestamps: true,
    underscored: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

// Define associations
Company.associate = (models) => {
  Company.hasMany(models.User, {
    foreignKey: "company_id",
    as: "users", // Alias for the relationship
  });
};

export default Company;
