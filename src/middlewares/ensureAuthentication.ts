import { Request, Response, NextFunction } from 'express';
import { getAuth } from 'firebase-admin/auth';

import { ApiError } from '../exceptions/ApiError.js';

/**
 * Middleware que verifica se a requisição possui um token de autenticação válido.
 *
 * @param request Um objeto `Request` que contém as informações da requisição.
 * @param _response Um objeto `Response` que será enviado como resposta à requisição.
 * @param nextFunction A próxima função middleware a ser executada.
 * @throws {ApiError} Erro de autenticação com informações sobre o motivo da falha.
 * @returns Uma Promessa vazia que resolve quando a autenticação é bem-sucedida.
 */
export async function ensureAuthentication(
  request: Request,
  _response: Response,
  nextFunction: NextFunction
): Promise<void> {
  const { authorization } = request.headers;

  if (!authorization) {
    throw new ApiError('JWT token is missing', 'application/token-missing');
  }

  const parts = authorization.split(' ');

  if (parts.length !== 2) {
    throw new ApiError('Token malformatted.', 'application/token-malformatted', 406);
  }

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme)) {
    throw new ApiError('Token malformatted.', 'application/token-malformatted', 406);
  }

  try {
    const decoded = await getAuth().verifyIdToken(token);

    request.user = {
      uid: decoded.uid,
      email: decoded.email as string
    };
  } catch {
    throw new ApiError('Invalid token', 'application/invalid-token', 401);
  }

  nextFunction();
}
