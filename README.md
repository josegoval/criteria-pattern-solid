# criteria-pattern-solid
This is a simple project which applies criteria pattern over a solid structure.

## Goal
The goal is to filter users (or any objects) using Criteria objects, leaving the filter implementation of the actual Criteria to the repository implementation.

## Use case
The project only covers the next use case: `getUsersService`, where the only available method is `searchByCriteria`.

## Example

```ts
import { PaginationCriteria } from "./internal/shared/domain/criteria";
import { GetUserService } from "./internal/users/application/getUsers";
import { UserCriteria } from "./internal/users/domain/userCriteria";
import { InMemoryUserRepository } from "./internal/users/infrastucture/inMemoryUserRepository";

const NUMBER_OF_RANDOM_USERS = 50000;
const userRepository = new InMemoryUserRepository(NUMBER_OF_RANDOM_USERS);
const getUserService = new GetUserService(userRepository);
// create the criteria (CriteriaField[], OrderByCriteria, PaginationCriteria
const userCriteria = new UserCriteria(
    [
      {
        fieldName: "age",
        operator: "greater or equal than",
        value: 20,
      },
      { fieldName: "age", operator: "less than", value: 7000 },
      {
        fieldName: "score",
        operator: "greater than",
        value: 200,
      },
      { fieldName: "name", operator: "includes", value: "a" },
    ],
    { fieldName: "name", order: "DESC" },
    new PaginationCriteria(2, 7, 300)
  );
  
const filteredUsers = getUserService.seachByCriteria(userCriteria);
```

The [given test](https://github.com/josegoval/criteria-pattern-solid/blob/26a7bba01b0c09d4e8dd24e549b44c30f355f4b6/src/__test__/getUserService.test.ts#L6) cover a simple case using an InMemoryUserRepository.

