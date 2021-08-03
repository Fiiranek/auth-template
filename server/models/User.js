export default class User {
  constructor(email, passwordHash, id) {
    this.email = email;
    this.passwordHash = passwordHash;
    this.id = id;
  }
}
