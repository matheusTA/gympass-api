export class UsersAlreadyExistsError extends Error {
  constructor() {
    super("Users already exists");
  }
}
