export class AppError {
    message;
    code;
    constructor(message, code) {
        this.message = message;
        this.code = code;
    }
}
