import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateUniversalMonth } from './universalMonth.js';

test('coincide con los doce meses del material de 2026', () => {
  const expected = [2, 3, 4, 5, 6, 7, 8, 9, 1, 11, 3, 4];
  expected.forEach((number, index) => {
    const result = calculateUniversalMonth(index + 1, 2026);
    assert.equal(result.universalYear, 1);
    assert.equal(result.number, number);
    assert.equal(result.reading.number, number);
    assert.equal(result.reading.actions.length, 5);
    assert.ok(result.reading.question.endsWith('?'));
  });
});

test('conserva las variantes de noviembre y diciembre de 2026', () => {
  assert.equal(calculateUniversalMonth(2, 2026).reading.title, 'Expresión, creatividad y comunicación');
  assert.equal(calculateUniversalMonth(11, 2026).reading.title, 'Visibilidad, comunicación y disfrute');
  assert.equal(calculateUniversalMonth(12, 2026).reading.title, 'Orden, bases y preparación');
  assert.ok(calculateUniversalMonth(12, 2026).reading.actions.includes('Define prioridades para 2027.'));
});

test('calcula otros años y conserva el 11 al sumar el mes', () => {
  assert.equal(calculateUniversalMonth(2, 2025).number, 11);
  assert.equal(calculateUniversalMonth(10, 2025).number, 1);
  assert.equal(calculateUniversalMonth(9, 2027).number, 11);
  assert.equal(calculateUniversalMonth(12, 2027).number, 5);
  assert.equal(calculateUniversalMonth(1, 2029).universalYear, 4);
});

test('todos los años ofrecidos tienen interpretaciones completas sin referencias a 2026', () => {
  for (let year = 1900; year <= 2100; year++) {
    for (let month = 1; month <= 12; month++) {
      const { number, reading } = calculateUniversalMonth(month, year);
      assert.equal(reading.number, number);
      assert.ok(reading.title && reading.description && reading.question);
      assert.equal(reading.actions.length, 5);
      if (year !== 2026) assert.doesNotMatch(JSON.stringify(reading), /2026|2027|Enero|Febrero|Marzo|Abril|Mayo|Junio|Julio|Agosto|Septiembre|Octubre|Noviembre|Diciembre|agosto/);
    }
  }
});

test('rechaza meses y años inválidos', () => {
  for (const month of [0, 13, 1.5, NaN, '1', null]) {
    assert.throws(() => calculateUniversalMonth(month, 2026), RangeError);
  }
  for (const year of [0, 10000, 2026.5, Infinity, '2026', undefined]) {
    assert.throws(() => calculateUniversalMonth(1, year), RangeError);
  }
});
