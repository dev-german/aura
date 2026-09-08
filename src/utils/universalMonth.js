import { months2026, universalMonthReadings } from '../data/universalMonths.js';

const reduceDigits = (value, preserveEleven = false) => {
  while (value > 9 && !(preserveEleven && value === 11)) {
    value = String(value).split('').reduce((sum, digit) => sum + Number(digit), 0);
  }
  return value;
};

export function calculateUniversalMonth(month, year) {
  if (!Number.isInteger(month) || month < 1 || month > 12 ||
      !Number.isInteger(year) || year < 1 || year > 9999) {
    throw new RangeError('Selecciona un mes y un año válidos.');
  }

  // Regla del material de 2026: año reducido + mes sin reducir; conservar el 11.
  const universalYear = reduceDigits(year);
  const sum = universalYear + month;
  const number = reduceDigits(sum, true);
  const reading = year === 2026 ? months2026[month] : universalMonthReadings[number];

  return { month, year, universalYear, sum, number, reading };
}
