import { DocumentReference, Timestamp } from 'firebase-admin/firestore';

/**
 * Convert Firestore types to JavaScript types
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

  const clone: any = {};

  Object.keys(obj).forEach(key => {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      clone[key] = toNativeTypes(obj[key]);
    }
  });

  return clone;
}
