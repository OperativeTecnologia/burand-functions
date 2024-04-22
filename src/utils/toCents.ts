/**
 * Converte um valor em reais para centavos.
 *
 * @param amountInReais O valor em reais a ser convertido.
 * @returns O valor convertido em centavos.
 *
 * @example
 * ```
 * toCents(10.50); // Retorna 1050
 * ```
 */
export function toCents(amountInReais: number): number {
  return parseFloat((amountInReais * 100).toFixed(2));
}
