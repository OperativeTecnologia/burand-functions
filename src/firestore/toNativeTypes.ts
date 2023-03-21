import { DocumentReference, Timestamp } from 'firebase-admin/firestore';

/**
 * Converte um objeto do `Firestore` em objetos `JavaScript` nativos, convertendo campos de data/hora em objetos `Date`.
 *
 * @param obj - O objeto a ser convertido para objetos JavaScript nativos
 * @returns O objeto convertido para objetos JavaScript nativos
 */
export function toNativeTypes(obj: any): any {
  if (obj === null || typeof obj !== 'object' || obj instanceof DocumentReference) {
    return obj;
  }

  if (obj instanceof Timestamp) {
    return obj.toDate();
  }

  if (Array.isArray(obj)) {
    return obj.map(toNativeTypes);
  }

  const clone: Record<string, unknown> = {};

  Object.keys(obj).forEach(key => {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      clone[key] = toNativeTypes(obj[key]);
    }
  });

  return clone;
}
