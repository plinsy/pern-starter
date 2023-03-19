import { Model, Optional, DataTypes, BelongsToGetAssociationMixin, BelongsToSetAssociationMixin, BelongsToCreateAssociationMixin, HasManyGetAssociationsMixin, HasManyAddAssociationMixin, HasManyCreateAssociationMixin } from "sequelize";
import { sequelize } from "./../config/db.config";
import Form from "./form.model";
import Option from "./option.model";

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

  public getForm!: BelongsToGetAssociationMixin<Form>;
  public setFormId!: BelongsToSetAssociationMixin<Form, number>;
  public createForm!: BelongsToCreateAssociationMixin<Form>;

  public getOptions!: HasManyGetAssociationsMixin<Option>;
  public addOption!: HasManyAddAssociationMixin<Option, number>;
  public createOption!: HasManyCreateAssociationMixin<Option>;
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

Question.belongsTo(Form, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  foreignKey: {
    allowNull: false,
  },
});

Question.hasMany(Option, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  foreignKey: {
    allowNull: false,
  },
});

export default Question;
