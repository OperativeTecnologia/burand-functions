import { AppError } from './AppError.js';

export class DocumentNotFoundError extends AppError {
  constructor() {
    super('Document not found.', 'application/document-not-found');
  }
}
