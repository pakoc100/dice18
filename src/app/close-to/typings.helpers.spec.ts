import { describe, it, expect } from 'vitest';
import {
  evaluateLeftToRight,
  buildEquationString,
  buildEquation,
  splitIntoSteps,
  permutations,
  filterDuplicates,
  generateCombinationsWithRepetition,
} from './typings';

describe('typings helper functions', () => {
  it('evaluateLeftToRight respects left-to-right order', () => {
    const numbers = [55, 4, 3, 1, 4];
    const ops = ['+', '*', '*', '-'];
    expect(evaluateLeftToRight(numbers, ops)).toBe(((55 + 4) * 3) * 1 - 4);
  });

  it('buildEquationString produces nested parentheses', () => {
    const numbers = [55, 4, 3];
    const ops = ['+', '*'];
    expect(buildEquationString(numbers, ops)).toBe('((55+4)*3)');
  });

  it('buildEquation concatenates digits with operand markers', () => {
    const inputDigits = [1, 2, 3];
    const operandSeed = ['A', 'B'];
    expect(buildEquation(inputDigits, operandSeed)).toBe('1A2B3');
  });

  it('splitIntoSteps returns sequential computation steps', () => {
    const eq = '((55+4)*3)';
    const steps = splitIntoSteps(eq);
    expect(steps.length).toBeGreaterThan(0);
    expect(steps[0]).toMatch(/55 \+ 4 = 59/);
  });

  it('permutations returns all permutations for small array', () => {
    const arr = [1, 2, 3];
    const perms = permutations(arr);
    expect(perms).toHaveLength(6);
    expect(perms).toEqual(expect.arrayContaining([[1,2,3],[3,2,1]]));
  });

  it('filterDuplicates removes duplicate permutations', () => {
    const arr = [[1,2],[1,2],[2,1]];
    const filtered = filterDuplicates(arr as number[][]);
    expect(filtered).toHaveLength(2);
  });

  it('generateCombinationsWithRepetition builds combinations of given length', () => {
    const items = ['+', '-'];
    const combos = generateCombinationsWithRepetition(items, 2);
    expect(combos).toHaveLength(4); // ++, +-, -+, --
    expect(combos).toEqual(expect.arrayContaining([['+','+'],['-','-']]));
  });
});
