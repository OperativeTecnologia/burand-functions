import { FieldValue } from 'firebase-admin/firestore';

/**
 * Decrementa um valor no Firestore.
 *
 * @param [n=1] - O valor a ser decrementado. O valor padrão é 1.
 * @returns Retorna um objeto `FieldValue` que decrementa o valor no Firestore.
 */
export function decrement(n = 1): FieldValue {
  return FieldValue.increment(n * -1);
}
