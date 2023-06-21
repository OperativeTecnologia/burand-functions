function calculateYearDifference(date1: Date, date2: Date): number {
  return date1.getFullYear() - date2.getFullYear();
}

function isBirthdayNotReachedThisYear(today: Date, birthDate: Date): boolean {
  const monthDifference = today.getMonth() - birthDate.getMonth();
  const dayDifference = today.getDate() - birthDate.getDate();

  return monthDifference < 0 || (monthDifference === 0 && dayDifference < 0);
}

/**
 * Calcula a idade a partir da data de nascimento.
 *
 * @param birthDate - Data de nascimento.
 * @returns Idade em anos.
 */
export function calculateAge(birthDate: Date): number {
  const today = new Date();

  let age = calculateYearDifference(today, birthDate);

  if (isBirthdayNotReachedThisYear(today, birthDate)) {
    age -= 1;
  }

  return age;
}
