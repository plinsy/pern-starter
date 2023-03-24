import Model, { IModelArgs } from "./Model";

interface IAccountArgs extends IModelArgs {
  accountId?: number;
  email: string;
  token?: string;
  username: string;
}

class Account extends Model {
  public accountId?: number;
  public email: string;
  public username: string;
  public token?: string;

  constructor(args: IAccountArgs) {
    super(args);
    this.accountId = args.accountId;
    this.email = args.email;
    this.token = args.token;
    this.username = args.username;
  }
}

export default Account;
