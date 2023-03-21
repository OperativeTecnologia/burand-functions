import { Request, Response, NextFunction } from 'express';
/**
 * Middleware que verifica se a requisição possui um token de autenticação válido.
 *
 * @param request Um objeto `Request` que contém as informações da requisição.
 * @param _response Um objeto `Response` que será enviado como resposta à requisição.
 * @param nextFunction A próxima função middleware a ser executada.
 * @throws {ApiError} Erro de autenticação com informações sobre o motivo da falha.
 * @returns Uma Promessa vazia que resolve quando a autenticação é bem-sucedida.
 */
export declare function ensureAuthentication(request: Request, _response: Response, nextFunction: NextFunction): Promise<void>;
