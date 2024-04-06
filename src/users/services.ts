import { Types } from "mongoose";
import { InvalidArgumentError } from "../errors";
import { User, UserModel } from "./models";

export class UserService {
  /**
   * Finds all users in DB
   * @returns promise resolving to all users or error
   */
  public getUsers = async () => UserModel.find();

  /**
   * Finds a user by id
   * @param id user id
   * @throws InvalidArgumentError when invalid id supplied
   * @returns promise resolving to user doc or error
   */
  public getUserById = async (id: Types.ObjectId) => {
    const user = await UserModel.findById(id);

    if (!user) {
      throw new InvalidArgumentError("Invalid ID supplied");
    }

    return user;
  };

  /**
   * Inserts a user object into the database
   * @param newUser User object containing the user's data
   * @returns a promise resolving to the created document
   */
  public insertUser = async (newUser: User) => {
    return UserModel.create(newUser);
  };

  /**
   * Updates the name and company of a user with a given id
   * @param id the id of the user whose name is being updated
   * @param newName the user's new name
   * @param newCompany the user's new company
   * @returns a promise resolving to the previous user document
   */
  public updateUser = async (
    id: Types.ObjectId,
    newName: string,
    newCompany: string
  ) => {
    return UserModel.findByIdAndUpdate(id, {
      name: newName,
      company: newCompany,
    });
  };

  /**
   * Incorporates a user's company (i.e., adds 'inc' to the end of its name)
   * If the company is already incorporated, aborts update and returns original document
   * @param id the user whose company was incorporated
   * @returns a promise resolving to the updated user document
   */
  public incorporateUserCompany = async (id: Types.ObjectId) => {
    const user = await this.getUserById(id);

    if (
      user.company.substring(Math.max(0, user.company.length - 4)) === "inc."
    ) {
      return user;
    }

    user.company = user.company + " inc.";
    return user.save();
  };

  /**
   * Deletes the user corresponding to a provided id
   * @param id the id of the user to delete
   */
  public deleteUser = (userId: Types.ObjectId) => {
    UserModel.findByIdAndDelete(userId).exec();
  };
}
