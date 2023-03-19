import { Model, Optional, DataTypes, BelongsToGetAssociationMixin, BelongsToSetAssociationMixin, BelongsToCreateAssociationMixin, HasManyGetAssociationsMixin, HasManyAddAssociationMixin, HasManyCreateAssociationMixin } from "sequelize";
import { sequelize } from "./../config/db.config";
import Account from './account.model';
import Question from "./question.model";

interface FormAttributes {
  formId: number;
  title: string;
  description: string | null;
  level: string;
  date: Date;
  accessKey: string;
  state: "new" | "draft" | "closed" | "canceled";
  name: string;
  email: string;
  comment: string | null;
  accountId: number;
}

class Form extends Model<any, any> implements FormAttributes {
  public formId!: number;
  public title!: string;
  public description!: string | null;
  public level!: string;
  public date!: Date;
  public accessKey!: string;
  public state!: "new" | "draft" | "closed" | "canceled";
  public name!: string;
  public email!: string;
  public comment!: string | null;
  public accountId!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date | null;

  public getUser!: BelongsToGetAssociationMixin<Account>;
  public setUserId!: BelongsToSetAssociationMixin<Account, number>;
  public createUser!: BelongsToCreateAssociationMixin<Account>

  public getQuestions!: HasManyGetAssociationsMixin<Question>;
  public addQuestion!: HasManyAddAssociationMixin<Question, number>;
  public createQuestion!: HasManyCreateAssociationMixin<Question>;
}

Form.init(
  {
    formId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    level: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
    accessKey: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type: DataTypes.ENUM,
      allowNull: false,
      values: ["new", "draft", "closed", "canceled"],
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    accountId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Form",
  }
);

Form.belongsTo(Account, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  foreignKey: {
    allowNull: false,
  },
});

Form.hasMany(Question, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  foreignKey: {
    allowNull: false,
  },
});

export default Form;
