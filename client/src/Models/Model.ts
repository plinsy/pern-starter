export interface IModelArgs {
  createdAt: Date | string;
  updatedAt: Date | string;
  [key: string]: any;
}

class Model implements IModelArgs {
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  constructor(args: IModelArgs) {
    this.createdAt = new Date(args.createdAt);
    this.updatedAt = new Date(args.updatedAt);
  }
}

export default Model;
