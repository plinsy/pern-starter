import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/db.config.ts";

export interface EvaluateAttributes {
  formId: number;
  teacherId: number;
}

class Evaluate extends Model<EvaluateAttributes> {
  public formId!: number;
  public teacherId!: number;
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
  },
  {
    sequelize,
    modelName: "Evaluate",
  }
);

export default Evaluate;
