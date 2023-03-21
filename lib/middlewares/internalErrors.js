import { ZodError } from 'zod';
import { AppError } from '../exceptions/AppError.js';
import { ApiError } from '../exceptions/ApiError.js';
/**
 * Middleware responsável por tratar erros internos da aplicação.
 *
 * @param err - O objeto de erro capturado.
 * @param _request O objeto `Request` que contém as informações da requisição.
 * @param response O objeto `Response` que será enviado como resposta à requisição.
 * @param nextFunction A próxima função middleware a ser executada.
 * @returns {void}
 * @throws {Error} Lança erro se o objeto err não for uma instância de `ApiError`, `AppError`, `ZodError` ou não possuir as propriedades `codePrefix` e `errorInfo`.
 */
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
