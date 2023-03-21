/**
 * Representa um erro da aplicação com título e código.
 */
export class AppError {
    /**
     * O título do erro.
     * @type {string}
     */
    message;
    /**
     * O código do erro.
     * @type {string}
     */
    code;
    /**
     * Cria uma instância de um erro da aplicação com título e código.
     *
     * @param {string} message - O título do erro.
     * @param {string} code - O código do erro.
     */
    constructor(message, code) {
        this.message = message;
        this.code = code;
    }
}
