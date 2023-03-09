import { DocumentReference, FieldValue } from 'firebase-admin/firestore';

/**
 * Convert a custom model object of type T to a simple JavaScript object
 */
export function toFirestore(obj: any): any {
  if (obj === null || typeof obj !== 'object' || obj instanceof FieldValue || obj instanceof DocumentReference) {
    return obj;
  }

  if (obj instanceof Date) {
    return new Date(obj.getTime());
  }

  if (Array.isArray(obj)) {
    return obj.map(toFirestore);
  }

  const clone: any = {};

  Object.keys(obj).forEach(key => {
    if (obj[key] !== undefined && Object.prototype.hasOwnProperty.call(obj, key)) {
      clone[key] = toFirestore(obj[key]);
    }
  });

  return clone;
}
