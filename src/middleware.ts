const jwt = require("jsonwebtoken");
import { Account } from "./models";
import { Op } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

// Define a middleware for authenticating requests
const authenticate = async (req: any, res: any, next: any) => {
  // Get the JWT from the Authorization header
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Missing authentication token" });
  }

  try {
    // Verify the JWT and get the account ID from the payload
    const { id } = await jwt.verify(token, process.env.JWT_SECRET);

    // Find the account with the given ID
    const account: Account | null = await Account.findOne({
      where: { accountId: { [Op.eq]: id } },
    });

    if (!account) {
      return res.status(401).json({ error: "Invalid authentication token" });
    }

    // Attach the account
    req.account = account;
    next();
  } catch (error) {
    console.error("Error authenticating account:", error);
    res.status(500).json({ error: "Unable to authenticate account" });
  }
};

export { authenticate };
