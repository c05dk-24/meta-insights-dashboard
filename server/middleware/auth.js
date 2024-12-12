import jwt from "jsonwebtoken";
import { User, Company } from "../models/index.js";
import dbLogger from "../utils/db-logger.js";

export const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: "Authentication required" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findOne({
      where: { id: decoded.userId },
      attributes: ["id", "email", "name", "company_id", "meta_page_id"],
      include: [
        {
          model: Company,
          attributes: ["name"],
        },
      ],
    });

    if (!user) {
      dbLogger.warn("Authentication failed: User not found");
      return res.status(401).json({ error: "User not found" });
    }

    // Attach user data to request with company name
    req.user = {
      ...user.toJSON(),
      companyName: user.Company?.name,
    };
    next();
  } catch (error) {
    dbLogger.error("Authentication error:", error.message);
    res.status(401).json({ error: "Invalid token" });
  }
};
