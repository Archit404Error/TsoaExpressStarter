import { getModelForClass, prop } from "@typegoose/typegoose";
import { User } from "../users/models";

export class App {
  @prop()
  public name: string;

  @prop({ type: () => [User] })
  public users: User[];

  constructor(name: string, users?: User[]) {
    this.name = name;
    this.users = users ?? [];
  }
}

export const AppModel = getModelForClass(App);
