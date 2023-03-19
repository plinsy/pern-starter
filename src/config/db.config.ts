import { Sequelize, DataTypes } from "sequelize";
const dotenv = require("dotenv");
dotenv.config();

let sequelize = new Sequelize(
  `postgres://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
  {
    dialect: "postgres",
  }
);

const createDatabaseIfNotExists = async () => {
  try {
    const databaseName = process.env.DB_NAME;
    const query = `SELECT 1 FROM pg_database WHERE datname = '${databaseName}';`;
    const result = await sequelize.query(query);
    if (result[0].length > 0) {
      console.log(`Database '${databaseName}' already exists`);
    } else {
      await sequelize.query(`CREATE DATABASE ${databaseName};`);
      console.log(`Database '${databaseName}' created`);
    }
  } catch (error) {
    console.error("Error creating database:", error);
  }
};

// Initialize Sequelize with database connection details
createDatabaseIfNotExists()
  .then(() => {
    sequelize = new Sequelize(
      process.env.DB_NAME || "evaluationdb",
      process.env.DB_USERNAME || "postgres",
      process.env.DB_PASSWORD || "",
      {
        host: process.env.DB_HOST || "localhost",
        port: Number(process.env.DB_PORT || 5432),
        dialect: "postgres",
      }
    );
  })
  .catch((err) => {
    console.log("====================================");
    console.log(`Could not create database ${process.env.DB_NAME}`);
    console.log("====================================");
  });

export { sequelize, Sequelize, DataTypes };
