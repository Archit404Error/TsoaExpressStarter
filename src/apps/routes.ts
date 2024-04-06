import { Types } from "mongoose";
import { Body, Controller, Get, Path, Post, Put, Route } from "tsoa";
import { User } from "../users/models";
import { App } from "./models";
import { AppCreationParams, AppService, UserAddParams } from "./services";

@Route("apps")
export class AppController extends Controller {
  private appService;

  constructor() {
    super();
    this.appService = new AppService();
  }

  @Get()
  public getAllApps(): Promise<App[]> {
    return this.appService.getAllApps();
  }

  @Get("{appId}")
  public getAppById(@Path() appId: Types.ObjectId): Promise<App> {
    return this.appService.getAppById(appId);
  }

  @Get("{appId}/users")
  public getAppUsers(@Path() appId: Types.ObjectId): Promise<User[]> {
    return this.appService.getAppUsers(appId);
  }

  @Post()
  public createApp(@Body() creationData: AppCreationParams): Promise<App> {
    return this.appService.createApp(creationData);
  }

  @Put("{appId}/addUser")
  public addUser(
    @Path() appId: Types.ObjectId,
    @Body() req: UserAddParams
  ): Promise<App> {
    return this.appService.addUser(appId, req.userId);
  }
}
