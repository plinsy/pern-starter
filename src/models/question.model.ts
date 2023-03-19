import { Model, Optional, DataTypes } from "sequelize";
import { sequelize } from "./../config/db.config.ts";

export interface QuestionAttributes {
  questionId: number;
  title: string;
  formId: number;
  required: boolean;
  answerType: string;
  sectionId: number | null;
}

interface QuestionCreationAttributes
  extends Optional<QuestionAttributes, "questionId"> {}

class Question extends Model<QuestionAttributes, QuestionCreationAttributes> {
  public questionId!: number;
  public title!: string;
  public formId!: number;
  public required!: boolean;
  public answerType!: string;
  public sectionId!: number | null;
}

Question.init(
  {
    questionId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
    },
    formId: {
      type: DataTypes.INTEGER,
    },
    required: {
      type: DataTypes.BOOLEAN,
    },
    answerType: {
      type: DataTypes.STRING,
    },
    sectionId: {
      type: DataTypes.INTEGER,
    },
  },
  { sequelize, modelName: "Question" }
);

export default Question;
