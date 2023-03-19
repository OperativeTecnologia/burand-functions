import { ZodError } from 'zod';
import { AppError } from '../exceptions/AppError.js';
import { ApiError } from '../exceptions/ApiError.js';
export function internalErrors(err, _request, response, nextFunction) {
    if (err instanceof ApiError) {
        response.status(err.statusCode).json({
            code: err.code,
            message: err.message
        });
        return;
    }
    if (err instanceof AppError) {
        response.status(422).json({
            code: err.code,
            message: err.message
        });
        return;
    }
    if (err instanceof ZodError) {
        response.status(400).json({
            code: 'application/validations-fail',
            message: 'Validation fails.',
            erros: err.format()
        });
        return;
    }
    if (err.codePrefix && err.errorInfo) {
        response.status(400).json(err.errorInfo);
        return;
    }
    nextFunction(err);
}
