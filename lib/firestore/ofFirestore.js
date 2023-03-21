import { toNativeTypes } from './toNativeTypes.js';
/**
 * Converte um `DocumentSnapshot` do Firestore em um objeto do tipo `T`, adicionando o Id do documento ao objeto.
 *
 * @param document - O `DocumentSnapshot` do Firestore a ser convertido em objeto
 * @param hasTimestamp - Indica se o objeto deve ter seus campos de data/hora convertidos em tipos nativos (`Date`)
 * @returns O objeto convertido do tipo `T`
 */
export function ofFirestore(document, hasTimestamp = false) {
    const data = { id: document.id, ...document.data() };
    if (hasTimestamp) {
        return toNativeTypes(data);
    }
    return data;
}
