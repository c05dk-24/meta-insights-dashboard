import jwt from "jsonwebtoken";
import { User, Company } from "../models/index.js";
import dbLogger from "../utils/db-logger.js";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: "VALIDATION_ERROR",
        message: "Email and password are required",
      });
    }

    dbLogger.log(`Login attempt for email: ${email}`);

    const user = await User.findOne({
      where: { email },
      attributes: [
        "id",
        "email",
        "password",
        "name",
        "company_id",
        "meta_page_id",
      ],
      include: [
        {
          model: Company,
          as: "company",
          attributes: ["name"],
        },
      ],
    });

    if (!user) {
      dbLogger.warn(`Login failed: User not found for email: ${email}`);
      return res.status(401).json({
        error: "INVALID_CREDENTIALS",
        message: "Invalid email or password",
      });
    }

    dbLogger.log(`User found: ${JSON.stringify(user)}`);

    const isValid = await user.comparePassword(password);
    if (!isValid) {
      dbLogger.warn(`Login failed: Invalid password for email: ${email}`);
      return res.status(401).json({
        error: "INVALID_CREDENTIALS",
        message: "Invalid email or password",
      });
    }

    if (!process.env.JWT_SECRET) {
      dbLogger.error("JWT_SECRET is not defined in environment variables.");
      return res.status(500).json({
        error: "SERVER_ERROR",
        message: "Internal server configuration error",
      });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || "24h",
    });

    dbLogger.log(`JWT generated for user ID: ${user.id}`);

    const userResponse = {
      id: user.id,
      email: user.email,
      name: user.name,
      company_id: user.company_id,
      companyName: user.company?.name || "N/A",
      meta_page_id: user.meta_page_id,
    };

    dbLogger.log(`User logged in successfully: ${email}`);

    res.json({
      token,
      user: userResponse,
    });
  } catch (error) {
    dbLogger.error("Login error:", error);

    res.status(500).json({
      error: "SERVER_ERROR",
      message: "An unexpected error occurred",
    });
  }
};
