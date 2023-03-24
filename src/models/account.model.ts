import { Model, Optional, DataTypes } from "sequelize";
import { sequelize } from "../config/db.config";

export interface IAccountAttributes {
  accountId: number;
  username: string;
  email: string;
  password: string;
  token?: string;
}

export interface IAccountCreationAttributes
  extends Optional<IAccountAttributes, "accountId"> {}

class Account
  extends Model<IAccountAttributes, IAccountCreationAttributes>
  implements IAccountAttributes
{
  public accountId!: number;
  public username!: string;
  public email!: string;
  public password!: string;
  public token?: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date | null;

  public static associate(models: any) {
    // Account.hasMany(Form, {
    //   onDelete: "CASCADE",
    //   onUpdate: "CASCADE",
    // });
  }
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

export default Account;
