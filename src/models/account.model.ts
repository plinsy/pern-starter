import { Model, Optional, DataTypes, HasManyAddAssociationMixin, HasManyGetAssociationsMixin, HasManyCreateAssociationMixin } from "sequelize";
import { sequelize } from "../config/db.config";
import Form from './form.model';

interface AccountAttributes {
  accountId: number;
  username: string;
  email: string;
  password: string;
  token?: string;
}

interface AccountCreationAttributes
  extends Optional<AccountAttributes, "accountId"> {}

class Account
  extends Model<AccountAttributes, AccountCreationAttributes>
  implements AccountAttributes
{
  public accountId!: number;
  public username!: string;
  public email!: string;
  public password!: string;
  public token?: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date | null;

  public getForms!: HasManyGetAssociationsMixin<Form>;
  public addForm!: HasManyAddAssociationMixin<Form, number>;
  public createForm!: HasManyCreateAssociationMixin<Form>;
}

Account.init(
  {
    accountId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Account",
  }
);

Account.hasMany(Form, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

export default Account;
