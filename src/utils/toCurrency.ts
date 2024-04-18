/**
 * Converte um valor de centavos para sua representação em moeda.
 *
 * @param amountInCents O valor em centavos a ser convertido.
 * @returns O valor convertido para a moeda correspondente.
 *
 * @example
 * ```
 * toCurrency(1050); // Retorna 10.50
 * ```
 */
export function toCurrency(amountInCents: number): number {
  return amountInCents / 100;
}
