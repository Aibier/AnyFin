export class HttpException
  extends Error {
  public message: string;
  public status: number;

  constructor(message: string, status: number) {
    super(message);
    this.message = message;
    this.status = status;
  }
}

export class UserWithThatEmailAlreadyExistsException extends HttpException {

  constructor(email: string) {
    super(`User with email ${email} already exists`, 400);
  }
}

export class NotAuthorizedException extends HttpException {

  constructor() {
    super("You're not authorized", 403);
  }
}

export class AuthenticationTokenMissingException
  extends HttpException {

  constructor() {
    super('Authentication token missing', 401);
  }
}

export class ItemNotFoundException extends HttpException {

  constructor(id: string) {
    super(`Requested item with id ${id} not found`, 404);
  }
}

export class WrongAuthenticationTokenException extends HttpException {

  constructor() {
    super('Invalid authentication token', 401);
  }
}

export class WrongCredentialsException extends HttpException {

  constructor() {
    super('Invalid credentials provided', 401);
  }
}

export class WrongAuthenticationKeyException extends HttpException {

  constructor() {
    super('Invalid authentication params provided', 401);
  }
}
