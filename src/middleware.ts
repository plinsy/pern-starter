const jwt = require("jsonwebtoken");
import { Account, Student } from "./models";
import { Op } from "sequelize";
import dotenv from "dotenv";
import { TokenExpiredError } from "jsonwebtoken";
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
      // Find the student with the given NIE
      const { nie } = await jwt.verify(token, process.env.JWT_SECRET);

      const student: Student | null = await Student.findOne({
        where: {
          nie: { [Op.eq]: nie },
        },
      });

      if (!student) {
        return res.status(401).json({ error: "Invalid authentication token" });
      }
    }

    // Attach the account
    req.account = account;
    next();
  } catch (error: any) {
    // console.error("Error authenticating account:", error);
    res
      .status(401)
      .json({
        error: "Unable to authenticate account",
        message: error.message,
      });
  }
};

export { authenticate };
