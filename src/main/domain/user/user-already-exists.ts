export class UserAlreadyExists extends Error {
  constructor(username: string) {
    super(`The user ${username} already exists`);
  }
}
