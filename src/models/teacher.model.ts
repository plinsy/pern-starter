import { Model, DataTypes, Optional } from "sequelize";
import { sequelize } from "../config/db.config.ts";

export interface TeacherAttributes {
  teacherId: number;
  lastname: string;
  firstname: string;
}

interface TeacherCreationAttributes
  extends Optional<TeacherAttributes, "teacherId"> {}

class Teacher
  extends Model<TeacherAttributes, TeacherCreationAttributes>
  implements TeacherAttributes
{
  public teacherId!: number;
  public lastname!: string;
  public firstname!: string;
}

Teacher.init(
  {
    teacherId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    lastname: DataTypes.STRING,
    firstname: DataTypes.STRING,
  },
  { sequelize, modelName: "Teacher" }
);

export default Teacher;
