import { DocumentReference, FieldValue } from 'firebase-admin/firestore';
/**
 * Converte um modelo em um objeto que pode ser salvo no `Firestore`.
 *
 * @param obj - Um modelo a ser convertido em um objeto para o `Firestore`
 * @returns O objeto convertido para o `Firestore`
 */
export function toFirestore(obj) {
    if (obj === null || typeof obj !== 'object' || obj instanceof FieldValue || obj instanceof DocumentReference) {
        return obj;
    }
    if (obj instanceof Date) {
        return new Date(obj.getTime());
    }
    if (Array.isArray(obj)) {
        return obj.map(toFirestore);
    }
    const clone = {};
    Object.keys(obj).forEach(key => {
        if (obj[key] !== undefined && Object.prototype.hasOwnProperty.call(obj, key)) {
            clone[key] = toFirestore(obj[key]);
        }
    });
    return clone;
}
