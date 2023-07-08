import { FieldValue } from 'firebase-admin/firestore';

/**
 * Incrementa um valor no Firestore.
 *
 * @param [n=1] - O valor a ser incrementado. O valor padrão é 1.
 * @returns Retorna um objeto `FieldValue` que incrementa o valor no Firestore.
 */
export function increment(n = 1): FieldValue {
  return FieldValue.increment(n);
}
