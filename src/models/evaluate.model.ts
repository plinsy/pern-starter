import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/db.config.ts";

export interface EvaluateAttributes {
  formId: number;
  teacherId: number;
  subjectId: number;
  nie: string;
  score: number;
  comment: string | null;
}

class Evaluate extends Model<EvaluateAttributes> {
  public formId!: number;
  public teacherId!: number;
  public subjectId!: number;
  public nie!: string;
  public score!: number;
  public comment?: string | null;
}

Evaluate.init(
  {
    formId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    teacherId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    subjectId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    nie: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    score: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    comment: {
      type: DataTypes.TEXT,
    },
  },
  {
    sequelize,
    modelName: "Evaluate",
  }
);

export default Evaluate;
