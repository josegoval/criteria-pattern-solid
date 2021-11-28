import { User } from "../../domain/user";
import { UserCriteria } from "../../domain/userCriteria";

export interface UserRepositorier {
  seachByCriteria(userCriteria: UserCriteria): User[];
}
