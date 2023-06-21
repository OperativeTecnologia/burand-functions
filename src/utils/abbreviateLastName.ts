function splitName(name: string): string[] {
  return name.toLowerCase().trim().split(' ');
}

function capitalizeFirstName(nameParts: string[]): string {
  const firstName = nameParts[0];
  return firstName.charAt(0).toUpperCase() + firstName.slice(1);
}

function abbreviateAndCapitalizeLastName(nameParts: string[]): string {
  const isLastNamePresent = nameParts.length > 1;

  if (isLastNamePresent) {
    const lastName = nameParts[nameParts.length - 1];
    return `${lastName.charAt(0).toUpperCase()}.`;
  }

  return '';
}

/**
 * Abrevia o sobrenome de uma determinada string de nome completo.
 *
 * @param name - A string com o nome completo.
 * @returns A string com o nome abreviado.
 */
export function abbreviateLastName(name: string): string {
  const nameParts = splitName(name);
  const firstName = capitalizeFirstName(nameParts);
  const abbreviatedLastName = abbreviateAndCapitalizeLastName(nameParts);

  return `${firstName} ${abbreviatedLastName}`.trim();
}
