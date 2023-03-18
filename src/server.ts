const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
import { sequelize } from "./../config/db.config";

// Load environment variables from .env file
dotenv.config();

const { User } = require("./../models/users.model");

// Initialize Express app
const app = express();

// Use middleware to parse request bodies and enable CORS
app.use(bodyParser.json());
app.use(cors());

// Define a route for creating a new user
app.post("/signup", async (req: any, res: any) => {
  try {
    // Create a new user using the request body
    const user = await User.create(req.body);

    // Generate a JWT for the new user
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Return the new user and the JWT
    res.json({ user, token });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Unable to create user" });
  }
});

// Define a route for logging in a user
app.post("/login", async (req: any, res: any) => {
  try {
    // Find the user with the given username
    const user = await User.findOne({ where: { username: req.body.username } });

    // Check if the password is correct
    if (user && user.password === req.body.password) {
      // Generate a JWT for the user
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      // Return the user and the JWT
      res.json({ user, token });
    } else {
      res.status(401).json({ error: "Invalid username or password" });
    }
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "Unable to log in" });
  }
});

// Define a middleware for authenticating requests
const authenticate = (req: any, res: any, next: any) => {
  // Get the JWT from the Authorization header
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Missing authentication token" });
  }

  try {
    // Verify the JWT and get the user ID from the payload
    const { id } = jwt.verify(token, process.env.JWT_SECRET);

    // Find the user with the given ID
    const user = User.findOne({ where: { id } });

    if (!user) {
      return res.status(401).json({ error: "Invalid authentication token" });
    }

    // Attach the user
    req.user = user;
    next();
  } catch (error) {
    console.error("Error authenticating user:", error);
    res.status(500).json({ error: "Unable to authenticate user" });
  }
};

// Define a route for getting the current user's information
app.get("/me", authenticate, (req: any, res: any) => {
  res.json({ user: req.user });
});

// Sync the User model with the database
sequelize
  .sync()
  .then(() => {
    console.log("Database is synchronized");
    // Start the server listening on the specified port
    app.listen(process.env.PORT, () => {
      console.log(`Server is listening on port ${process.env.PORT}`);
    });
  })
  .catch((error: any) => {
    console.error("Unable to sync database:", error);
  });
