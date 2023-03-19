import { Model, Optional, DataTypes } from "sequelize";
import { sequelize } from "./../config/db.config.ts";

export interface AnswerAttributes {
  id: number;
  value: string;
  nie: string;
  questionId: number;
}

interface AnswerCreationAttributes extends Optional<AnswerAttributes, "id"> {}

class Answer extends Model<AnswerAttributes, AnswerCreationAttributes> {
  public id!: number;
  public value!: string;
  public nie!: string;
  public questionId!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date | null;
}

Answer.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    value: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nie: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    questionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Answer",
  }
);

export default Answer;
