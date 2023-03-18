import { sequelize, DataTypes } from "./../config/db.config";

// Define a model for a Student object
const Student = sequelize.define("Student", {
  nie: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  lastname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  firstname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  level: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default Student;
