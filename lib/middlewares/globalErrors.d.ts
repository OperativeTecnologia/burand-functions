import { NextFunction, Request, Response } from 'express';
/**
 * Middleware que captura erros globais da aplicação.
 *
 * @param err O objeto de erro capturado.
 * @param _request O objeto `Request` que contém as informações da requisição.
 * @param response O objeto `Response` que será enviado como resposta à requisição.
 * @param nextFunction A próxima função middleware a ser executada.
 * @returns {void}
 */
export declare function globalErrors(err: Error, _request: Request, response: Response, nextFunction: NextFunction): void;
