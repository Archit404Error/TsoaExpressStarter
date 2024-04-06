import { Types } from "mongoose";
import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Path,
  Post,
  Put,
  Route,
  SuccessResponse,
} from "tsoa";
import { User } from "./models";
import { UserService } from "./services";

@Route("users")
export class UserController extends Controller {
  private userService;

  constructor() {
    super();
    this.userService = new UserService();
  }

  /**
   * Gets all users in the application
   * @returns an array containing all users in this application
   */
  @Get()
  public async getAllusers(): Promise<User[]> {
    return this.userService.getUsers();
  }

  /**
   * Gets user by id
   * @param userId id of user to retreive
   * @returns user with given id
   */
  @Get("{userId}")
  public async getUser(@Path() userId: Types.ObjectId): Promise<User> {
    return this.userService.getUserById(userId);
  }

  /**
   * Creates user
   * @param userData user name and company
   * @returns created user document
   */
  @SuccessResponse(201, "Created")
  @Post()
  public async createUser(@Body() userData: User): Promise<User> {
    this.setStatus(201);
    return this.userService.insertUser(userData);
  }

  /**
   * Incorporates company of provided user
   * @param userId id of user whose company is being incorporated
   * @returns promise resolving to updated user document
   */
  @Put("/incorporate/{userId}")
  public async incorporateUserCompany(
    @Path() userId: Types.ObjectId
  ): Promise<User> {
    return this.userService.incorporateUserCompany(userId);
  }

  /**
   * Updates user by id
   * @param userId id of user to update
   * @param req user's new name and company
   * @returns user document prior to update
   */
  @Patch("{userId}")
  public async updateUser(@Path() userId: Types.ObjectId, @Body() req: User) {
    return this.userService.updateUser(userId, req.name, req.company);
  }

  /**
   * Deletes user
   * @param userId id of user to delete
   */
  @SuccessResponse(204, "Deleted")
  @Delete("{userId}")
  public async deleteUser(@Path() userId: Types.ObjectId) {
    return this.userService.deleteUser(userId);
  }
}
