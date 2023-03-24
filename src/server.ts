const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
import { sequelize } from "./config/db.config";
import { authenticate } from "./middleware";

// Load environment variables from .env file
dotenv.config();

const { User } = require("./models");

// Initialize Express app
const app = express();

// Use middleware to parse request bodies and enable CORS
app.use(bodyParser.json());
app.use(cors());

app.use("/api/accounts", require("./routes/accounts.routes"));

app.get("*", async (req: any, res: any) => {
  res.send({ message: "Le serveur marche très bien" });
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
