import { AppError } from './AppError.js';
/**
 * Representa um erro de API com código, mensagem e status HTTP.
 */
export class ApiError extends AppError {
    /**
     * O status HTTP associado ao erro.
     * @type {number}
     */
    statusCode;
    /**
     * Cria uma instância de um erro de API com código, mensagem e status HTTP.
     *
     * @param {string} message - A mensagem de erro.
     * @param {string} code - O código de erro.
     * @param {number} statusCode - O status HTTP associado ao erro.
     */
    constructor(message, code, statusCode = 400) {
        super(message, code);
        this.statusCode = statusCode;
    }
}
