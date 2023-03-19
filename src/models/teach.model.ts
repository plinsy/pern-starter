import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/db.config.ts";

export interface TeachAttributes {
  subjectId: number;
  teacherId: number;
}

class Teach extends Model<TeachAttributes> {
  public subjectId!: number;
  public teacherId!: number;
}

Teach.init(
  {
    subjectId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    teacherId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Teach",
  }
);

export default Teach;
