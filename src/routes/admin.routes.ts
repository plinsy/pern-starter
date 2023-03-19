import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
const router = express.Router({ mergeParams: true });
router.use(express.json());
router.use(cors());
import { Account } from "./../models";
import { Op } from "sequelize";
const bcrypt = require("bcryptjs");

router.post("/register", async (req: any, res: any) => {
  try {
    const { username, email, password } = req.body;

    const account = await Account.findOne({
      where: {
        [Op.or]: [{ email }, { username }],
      },
    });

    if (account) {
      throw new Error("Email or username not available");
    }

    const hash = await bcrypt.hash(password, 10);
    await Account.create({
      username,
      email,
      password: hash,
    });
    res.status(201).json({ message: "User created" });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/login", async (req: any, res: any, next: any) => {
  try {
    const email = req.body.login || "";
    const username = req.body.login || "";
    const password = req.body.password || "";
    const account = await Account.findOne({
      where: {
        [Op.or]: [{ username }, { email }],
      },
    });
    if (!account) {
      throw new Error(`Invalid username or password`);
    }
    const isMatch = await bcrypt.compare(password, account.password);
    if (!isMatch) {
      throw new Error("Invalid credentials");
    }
    // Generate a JWT for the user
    const SECRET = process.env.JWT_SECRET ?? "";
    const token = jwt.sign({ account }, SECRET, {
      expiresIn: "1h",
    });

    // Return the user and the JWT
    res.json({ account, token });
  } catch (err: any) {
    res.status(500).send({ message: err.message });
  }
});

module.exports = router;
