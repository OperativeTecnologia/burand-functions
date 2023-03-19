import { toNativeTypes } from './toNativeTypes.js';
/**
 * Convert Firestore data into an object of type T
 */
export function ofFirestore(document, hasTimestamp = false) {
    const data = { id: document.id, ...document.data() };
    if (hasTimestamp) {
        return toNativeTypes(data);
    }
    return data;
}
