# criteria-pattern-solid
This is a simple project which applies criteria pattern over a solid structure.

## Goal
The goal is to filter users (or any objects) using Criteria objects, leaving the filter implementation of the actual Criteria to the repository implementation.

## Use case
The project only covers the next use case: `getUsersService`, where the only available method is `searchByCriteria`.

## Example

The [given test](https://github.com/josegoval/criteria-pattern-solid/blob/26a7bba01b0c09d4e8dd24e549b44c30f355f4b6/src/__test__/getUserService.test.ts#L6) cover a simple case using an InMemoryUserRepository.
