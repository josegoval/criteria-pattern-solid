import { PaginationCriteria } from "../internal/shared/domain/criteria";
import { GetUserService } from "../internal/users/application/getUsers";
import { UserCriteria } from "../internal/users/domain/userCriteria";
import { InMemoryUserRepository } from "../internal/users/infrastucture/inMemoryUserRepository";

it("meet criteria correctly", () => {
  const userRepository = new InMemoryUserRepository(300000);
  const getUserService = new GetUserService(userRepository);

  const MIN_INCLUSIVE_AGE = 30;
  const MAX_EXCLUSIVE_AGE = 70;
  const MIN_EXCLUSIVE_SCORE = 3000;
  const MAX_INCLUSIVE_SCORE = 8000;
  const INCLUDES_NAME = "a";
  const userCriteria = new UserCriteria(
    [
      {
        fieldName: "age",
        operator: "greater or equal than",
        value: MIN_INCLUSIVE_AGE,
      },
      { fieldName: "age", operator: "less than", value: MAX_EXCLUSIVE_AGE },
      {
        fieldName: "score",
        operator: "greater than",
        value: MIN_EXCLUSIVE_SCORE,
      },
      {
        fieldName: "score",
        operator: "less or equal than",
        value: MAX_INCLUSIVE_SCORE,
      },
      { fieldName: "name", operator: "includes", value: INCLUDES_NAME },
    ],
    { fieldName: "name", order: "DESC" },
    new PaginationCriteria(10, 11, 10000)
  );

  const unexpectedUser = getUserService
    .seachByCriteria(userCriteria)
    .find(
      ({ age, score, name }) =>
        age < MIN_INCLUSIVE_AGE ||
        age >= MAX_EXCLUSIVE_AGE ||
        score <= MIN_EXCLUSIVE_SCORE ||
        score > MAX_INCLUSIVE_SCORE ||
        name.includes(INCLUDES_NAME)
    );

  expect(unexpectedUser).toBe(undefined);
});
