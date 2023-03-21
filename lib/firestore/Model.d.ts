/**
 * A entidade genérica "Model" que contém um identificador único e informações de data de criação e atualização.
 *
 * @property {string} id - Identificador único no Firebase Firestore.
 * @property {Date} createdAt - Data de criação do documento.
 * @property {Date} updatedAt - Data de atualização do documento.
 */
export interface Model {
    id: string;
    createdAt: Date;
    updatedAt: Date;
}
