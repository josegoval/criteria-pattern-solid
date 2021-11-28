import { User } from "../../domain/user";
import { UserCriteria } from "../../domain/userCriteria";

export interface UserServicer {
  seachByCriteria(userCriteria: UserCriteria): User[];
}
