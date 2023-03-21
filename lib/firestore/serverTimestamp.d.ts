import { FieldValue } from 'firebase-admin/firestore';
/**
 * Retorna um objeto `FieldValue` que representa a data e hora do servidor do Firebase.
 *
 * @returns Um objeto `FieldValue` com a data e hora do servidor.
 */
export declare function serverTimestamp(): FieldValue;
