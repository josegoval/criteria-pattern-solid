import { User } from "../domain/user";
import { UserCriteria } from "../domain/userCriteria";
import { UserRepositorier } from "./ports/userRepositorier";
import { UserServicer } from "./ports/userServicer";

const noUserRepositorier = new Error("No user repository implemented");

export class GetUserService implements UserServicer {
  UserRepositorier: UserRepositorier;

  constructor(UserRepositorier: UserRepositorier) {
    this.UserRepositorier = UserRepositorier;
  }

  seachByCriteria(userCriteria: UserCriteria): User[] {
    if (!this.UserRepositorier) throw noUserRepositorier;

    return this.UserRepositorier.seachByCriteria(userCriteria);
  }
}
