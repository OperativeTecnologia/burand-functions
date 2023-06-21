/**
 * Remova caracteres não numéricos de uma string.
 *
 * @param text A string de entrada a ser processada.
 * @returns A string contendo apenas caracteres de dígitos.
 */
export function removeNonDigits(text: string): string {
  return text.replace(/\D/g, '');
}
