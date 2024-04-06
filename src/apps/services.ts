import { Types } from "mongoose";
import { InvalidArgumentError } from "../errors";
import { User } from "../users/models";
import { UserService } from "../users/services";
import { App, AppModel } from "./models";

export type AppCreationParams = { name: string; users?: User[] };

export type UserAddParams = { userId: Types.ObjectId };

export class AppService {
  public createApp = async (creationData: AppCreationParams) =>
    AppModel.create(new App(creationData.name, creationData.users));

  public getAllApps = async () => AppModel.find();

  public getAppById = async (id: Types.ObjectId) => {
    const app = await AppModel.findById(id);
    if (!app) {
      throw new InvalidArgumentError("Invalid id supplied");
    }
    return app;
  };

  public getAppUsers = async (id: Types.ObjectId) => {
    const app = await this.getAppById(id);
    return app.users;
  };

  public addUser = async (appId: Types.ObjectId, userId: Types.ObjectId) => {
    const app = await this.getAppById(appId);
    const user = await new UserService().getUserById(userId);

    app.users.push(user);
    return app.save();
  };
}
