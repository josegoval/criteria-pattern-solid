import { DefaultCriteria } from "../../shared/domain/criteria";
import { User } from "./user";

export class UserCriteria extends DefaultCriteria<keyof User> {}
