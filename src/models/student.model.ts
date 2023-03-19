import { Model, DataTypes } from "sequelize";
import { sequelize } from "./../config/db.config";

interface StudentAttributes {
  nie: string;
  lastname: string;
  firstname: string;
  level: string;
}

class Student extends Model<StudentAttributes> implements StudentAttributes {
  public nie!: string;
  public lastname!: string;
  public firstname!: string;
  public level!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Student.init(
  {
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
  },
  {
    sequelize,
    modelName: "Student",
  }
);

export default Student;
