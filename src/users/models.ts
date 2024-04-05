import { getModelForClass, prop } from "@typegoose/typegoose";

export class User {
  constructor(name: string, company: string) {
    this.name = name;
    this.company = company;
  }

  @prop()
  public name!: string;

  @prop()
  public company!: string;
}

export const UserModel = getModelForClass(User);
