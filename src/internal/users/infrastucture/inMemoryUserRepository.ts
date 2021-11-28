import {
  generateRandomName,
  generateRandomNumber,
} from "../../../utils/random";
import {
  CriteriaField,
  OrderByCriteria,
  PaginationCriteria,
} from "../../shared/domain/criteria";
import { UserRepositorier } from "../application/ports/userRepositorier";
import { User } from "../domain/user";
import { UserCriteria } from "../domain/userCriteria";

const NUMBER_OF_USERS = 30;

const generateRandomUsers = (amount: number): User[] => {
  return new Array(amount).map(() => ({
    name: generateRandomName(),
    age: generateRandomNumber(110),
    score: generateRandomNumber(10000),
  }));
};

function convertUserCriteriaFieldToRawCb({
  fieldName,
  operator,
  value,
}: CriteriaField<keyof User>) {
  switch (operator) {
    case "equal":
      return (user: User) => user[fieldName] === value;

    case "not":
      return (user: User) => user[fieldName] !== value;

    case "greater or equal than":
      return (user: User) => user[fieldName] >= value;

    case "greater than":
      return (user: User) => user[fieldName] > value;

    case "less than":
      return (user: User) => user[fieldName] < value;

    case "less or equal than":
      return (user: User) => user[fieldName] <= value;

    default:
      return (user: User) => true;
  }
}

function convertUserCriteriaFieldsToRawCb(
  userCriteriaFields: CriteriaField<keyof User>[]
) {
  const filterCallbacks = userCriteriaFields.map((field) =>
    convertUserCriteriaFieldToRawCb(field)
  );
  return (users: User[]) =>
    filterCallbacks.reduce(
      (filteredUsers, nextFilterCb) => filteredUsers.filter(nextFilterCb),
      users
    );
}

function convertUserCriteriaOrderByToRawCb({
  fieldName,
  order,
}: OrderByCriteria<keyof User>) {
  return (user: User[]) =>
    user.sort((a: User, b: User) => {
      const _a = `${a[fieldName]}`;
      const _b = `${b[fieldName]}`;
      return order === "ASC" ? _a.localeCompare(_b) : _b.localeCompare(_a);
    });
}

function convertUserCriteriaPaginationToRawCb({
  fromPage,
  toPage,
  pageSize,
}: PaginationCriteria) {
  return (user: User[]) => {
    const fromIndex = fromPage * pageSize - pageSize;
    const toIndex = toPage * pageSize - pageSize;
    return user.slice(fromIndex, toIndex);
  };
}

function convertUserCriteriaToRawCbs(userCriteria: UserCriteria) {
  const filterCb =
    userCriteria.hasFields() &&
    convertUserCriteriaFieldsToRawCb(userCriteria.fields);
  const sortCb =
    userCriteria.hasOrderBy() &&
    convertUserCriteriaOrderByToRawCb(userCriteria.orderBy);
  let paginationCb =
    userCriteria.hasValidPagination() &&
    convertUserCriteriaPaginationToRawCb(userCriteria.pagination);
  return [filterCb, sortCb, paginationCb];
}

export class InMemoryUserRepository implements UserRepositorier {
  users: User[];

  constructor() {
    this.users = generateRandomUsers(NUMBER_OF_USERS);
  }

  meetCriteria(userCriteria: UserCriteria): User[] {
    const criteriaCallbacks = convertUserCriteriaToRawCbs(userCriteria);
    return criteriaCallbacks.reduce(
      (filteredUsers, nextCb) =>
        typeof nextCb === "function" ? nextCb(filteredUsers) : filteredUsers,
      [...this.users]
    );
  }

  seachByCriteria(userCriteria: UserCriteria): User[] {
    if (!userCriteria) return this.users;

    return this.meetCriteria(userCriteria);
  }
}
