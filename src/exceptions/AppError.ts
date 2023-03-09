export class AppError {
  readonly message: string;
  readonly code: string;

  constructor(message: string, code: string) {
    this.message = message;
    this.code = code;
  }
}
