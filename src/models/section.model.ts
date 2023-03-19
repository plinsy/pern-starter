import { Model, Optional, DataTypes } from "sequelize";
import { sequelize } from "./../config/db.config.ts";

export interface SectionAttributes {
  sectionId: number;
  title: string;
}

interface SectionCreationAttributes
  extends Optional<SectionAttributes, "sectionId"> {}

class Section
  extends Model<SectionAttributes, SectionCreationAttributes>
  implements SectionAttributes
{
  public sectionId!: number;
  public title!: string;
}

Section.init(
  {
    sectionId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  { sequelize, modelName: "Section" }
);

export default Section;
