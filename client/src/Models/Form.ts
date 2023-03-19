import { IForm } from "../Interfaces/Interfaces";
import Model from "./Model";

class Form extends Model implements IForm {
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
}

export default Form;
