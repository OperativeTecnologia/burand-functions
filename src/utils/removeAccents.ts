/**
 * Remove acentos de uma string.
 *
 * @param text A string de entrada a ser processada.
 * @returns A string com os acentos removidos.
 */
export function removeAccents(text: string): string {
  const normalizationForm = 'NFD';
  const accentPattern = /[\u0300-\u036f]/g;

  return text.normalize(normalizationForm).replace(accentPattern, '');
}
