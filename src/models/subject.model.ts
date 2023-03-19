import { Model, DataTypes } from "sequelize";
import { sequelize } from "./../config/db.config";

interface SubjectAttributes {
  subjectId: number;
  title: string;
}

class Subject extends Model<SubjectAttributes> implements SubjectAttributes {
  public subjectId!: number;
  public title!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Subject.init(
  {
    subjectId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Subject",
  }
);

export default Subject;
