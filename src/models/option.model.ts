import { Model, Optional, DataTypes } from "sequelize";
import { sequelize } from "./../config/db.config.ts";

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
}

Option.init(
  {
    optionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
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
