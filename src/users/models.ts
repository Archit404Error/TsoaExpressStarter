import { getModelForClass, prop } from "@typegoose/typegoose";

export class User {
  @prop()
  public name!: string;

  @prop()
  public company!: string;

  constructor(name: string, company: string) {
    this.name = name;
    this.company = company;
  }
}

export const UserModel = getModelForClass(User);
