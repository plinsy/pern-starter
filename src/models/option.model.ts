import {
  Model,
  Optional,
  DataTypes,
  BelongsToCreateAssociationMixin,
  BelongsToGetAssociationMixin,
  BelongsToSetAssociationMixin,
} from "sequelize";
import { sequelize } from "./../config/db.config";
import Question from "./question.model";

export interface OptionAttributes {
  optionId: number;
  value: string;
  questionId: number;
}

interface OptionCreationAttributes
  extends Optional<OptionAttributes, "optionId"> {}

class Option
  extends Model<OptionAttributes, OptionCreationAttributes>
  implements OptionAttributes
{
  public optionId!: number;
  public value!: string;
  public questionId!: number;

  public getQuestion!: BelongsToGetAssociationMixin<Question>;
  public setQuestionId!: BelongsToSetAssociationMixin<Question, number>;
  public createQuestion!: BelongsToCreateAssociationMixin<Question>;

  public static associate(models: any) {
    Question.hasMany(Option, {
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
      foreignKey: {
        allowNull: false,
      },
    });

    Option.belongsTo(Question, {
      foreignKey: "questionId",
      as: "question",
    });
  }
}

Option.init(
  {
    optionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    value: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    questionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { sequelize, modelName: "Option" }
);

export default Option;
