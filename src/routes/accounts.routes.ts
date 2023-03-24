const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const { verifyToken } = require("../middleware");
const router = express.Router({ mergeParams: true });
router.use(express.json());
router.use(cors());
const bcrypt = require("bcryptjs");
import { Op } from "sequelize";
import { Account } from "../models";
import { authenticate } from "../middleware";

router.put("/", authenticate, async (req: any, res: any) => {
  try {
    let account = req.account;
    const accountId = account.accountId;
    const { email, username, currentPassword, password, passwordConfirmation } =
      req.body;

    if (!email || !username || !currentPassword) {
      throw new Error("Please fill in all required fields");
    }

    // Check if passwords match
    if (password != passwordConfirmation) {
      throw new Error("Your passwords don't match");
    }

    // Check if account exists
    account = await Account.findOne({
      where: {
        [Op.or]: [
          {
            username: username,
          },
        ],
      },
    });

    if (account != null) {
      throw new Error(`Username not available`);
    }

    account = await Account.findOne({
      where: {
        accountId: accountId,
      },
    });

    if (!account) {
      throw new Error(`Account not found`);
    }

    const isMatch = await bcrypt.compare(currentPassword, account.password);

    if (!isMatch) {
      throw new Error("Your current password is incorrect");
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    account = await Account.update(
      {
        username: username,
        password: encryptedPassword,
      },
      {
        where: {
          accountId: accountId,
        },
      }
    );

    const token = jwt.sign({ id: accountId }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Return the account and the JWT
    res.json({ account, token });
  } catch (error: any) {
    res.status(500).send({ message: error.message });
  }
});

// Define a route for getting the current account's information
router.get("/me", authenticate, (req: any, res: any) => {
  res.json({ account: req.account });
});

router.post("/login", async (req: any, res: any, next: any) => {
  try {
    const { login, password } = req.body;
    const account = await Account.findOne({
      where: {
        [Op.or]: {
          email: {
            [Op.like]: `%${login}%`,
          },
          username: {
            [Op.like]: `%${login}%`,
          },
        },
      },
    });
    if (!account) {
      throw new Error(`Invalid credentials`);
    }
    const isMatch = await bcrypt.compare(password, account.password);
    if (!isMatch) {
      throw new Error("Invalid credentials");
    }
    const accountId = account.accountId;
    // Generate a JWT for the account
    const token = jwt.sign({ id: accountId }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Return the account and the JWT
    res.json({ account, token });
  } catch (err: any) {
    res.status(500).send({ message: err.message });
  }
});

// Define a route for creating a new account
router.post("/register", async (req: any, res: any) => {
  try {
    const { email, username, password, passwordConfirmation } = req.body;

    if (!email || !username || !password || !passwordConfirmation) {
      throw new Error("Please fill in all required fields");
    }

    // Check if passwords match
    if (password != passwordConfirmation) {
      throw new Error("Your passwords don't match");
    }

    // Check if account exists
    let account = await Account.findOne({
      where: {
        [Op.or]: [
          {
            email,
            username,
          },
        ],
      },
    });

    if (account != null) {
      throw new Error(`Username not available`);
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    // Create a new account using the request body
    account = await Account.create({
      email: email,
      username: username,
      password: encryptedPassword,
    });

    // Generate a JWT for the new account
    const token = jwt.sign({ id: account.accountId }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Return the new account and the JWT
    res.json({ account, token });
  } catch (error: any) {
    console.log("====================================");
    console.error("Error creating account:", error);
    console.log("====================================");
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
