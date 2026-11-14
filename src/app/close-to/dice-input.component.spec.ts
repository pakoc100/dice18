import { describe, expect, it } from 'vitest';
import { DiceInputComponent } from './dice-input.component';

describe('DiceInputComponent', () => {
  it('counts each selected die independently', () => {
    const component = new DiceInputComponent();
    component.currentInputs = [2, 5, 2, 2];

    expect(component.countForDie(2)).toBe(3);
    expect(component.countForDie(5)).toBe(1);
    expect(component.countForDie(4)).toBe(0);
  });
});
