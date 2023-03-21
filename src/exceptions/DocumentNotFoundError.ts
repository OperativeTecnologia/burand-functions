import { AppError } from './AppError.js';

/**
 * Erro lançado quando um documento específico não é encontrado.
 */
export class DocumentNotFoundError extends AppError {
  /**
   * Cria uma instância de um erro `DocumentNotFoundError`
   */
  constructor() {
    super('Document not found.', 'application/document-not-found');
  }
}
