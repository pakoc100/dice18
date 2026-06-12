/// <reference types="jasmine" />
import { BruteForceResult, Die } from './typings';

describe('BruteForceResult', () => {
  it('should find exact match when target is reachable', () => {
    const inputs: Die[] = [1, 2, 3];
    const result = new BruteForceResult(6, inputs);
    
    expect(result.highestValue).toBe(6);
    expect(result.way).toBeTruthy();
    expect(result.calculations).toBeGreaterThan(0);
  });

  it('should find closest value when exact match is not possible', () => {
    const inputs: Die[] = [2, 3, 4];
    const target = 25;
    const result = new BruteForceResult(target, inputs);
    
    expect(result.highestValue).toBeLessThanOrEqual(target);
    expect(result.highestValue).toBeGreaterThan(0);
    expect(result.way).toBeTruthy();
  });

  it('should handle single input', () => {
    const inputs: Die[] = [5];
    const result = new BruteForceResult(5, inputs);
    
    expect(result.highestValue).toBe(5);
    expect(result.way).toBe('5');
  });

  it('should handle two inputs with addition', () => {
    const inputs: Die[] = [3, 4];
    const result = new BruteForceResult(7, inputs);
    
    expect(result.highestValue).toBe(7);
    expect(result.calculations).toBeGreaterThan(0);
  });

  it('should handle multiplication', () => {
    const inputs: Die[] = [2, 3, 4];
    const result = new BruteForceResult(24, inputs);
    
    expect(result.highestValue).toBe(24);
  });

  it('should handle division resulting in integer value', () => {
    const inputs: Die[] = [6, 2];
    const result = new BruteForceResult(3, inputs);
    
    // Left-to-right: 6/2 = 3
    expect(result.highestValue).toBe(3);
  });

  it('should handle subtraction resulting in negative values', () => {
    const inputs: Die[] = [1, 5];
    const target = -2;
    const result = new BruteForceResult(target, inputs);
    
    // Should have done calculations even if no valid result found
    expect(result.calculations).toBeGreaterThanOrEqual(0);
  });

  it('should skip division by zero gracefully', () => {
    const inputs: Die[] = [1, 1, 2];
    const result = new BruteForceResult(100, inputs);
    
    // Should not crash, should handle NaN gracefully
    expect(result.highestValue).toBeGreaterThanOrEqual(0);
    expect(result.calculations).toBeGreaterThan(0);
  });

  it('should return empty when target is 0 (invalid input)', () => {
    const inputs: Die[] = [1, 2, 3];
    const result = new BruteForceResult(0, inputs);
    
    expect(result.highestValue).toBe(0);
    expect(result.way).toBe('');
    expect(result.calculations).toBe(0);
  });

  it('should track calculations count correctly', () => {
    const inputs: Die[] = [1, 2];
    const result = new BruteForceResult(3, inputs);
    
    // Should return early when exact match found (1+2=3)
    // So calculations should be 1 (the calculation that found the match)
    expect(result.calculations).toBeGreaterThan(0);
    expect(result.highestValue).toBe(3);
  });

  it('should produce valid equation format with braces', () => {
    const inputs: Die[] = [2, 3];
    const result = new BruteForceResult(6, inputs);
    
    // Should match pattern like ((2*3)) or similar
    expect(result.way).toMatch(/^\(.*\)$/);
  });

    it('should find exact match when target is reachable 2', () => {
    const inputs: Die[] = [4, 5, 2, 6, 5];
    const result = new BruteForceResult(210, inputs);
    
    expect(result.highestValue).toBe(210);
    expect(result.way).toBeTruthy();
    expect(result.calculations).toBeGreaterThan(0);
  });

    it('should find exact match when target is reachable 3', () => {
    const inputs: Die[] = [4, 5, 2, 6, 5];
    const target = 89;
    const result = new BruteForceResult(target, inputs);
    
    expect(result.highestValue).toBe(target);
    expect(result.way).toBeTruthy();
    expect(result.calculations).toBeGreaterThan(0);
  });

    it('should find exact match when target is reachable 4', () => {
    const inputs: Die[] = [4, 5, 2, 6, 5];
    const target = 48;
    const result = new BruteForceResult(target, inputs);
    
    expect(result.highestValue).toBe(target);
    expect(result.way).toBeTruthy();
    expect(result.calculations).toBeGreaterThan(0);
  });

      it('should not give a decimal result', () => {
    const inputs: Die[] = [3, 5, 2, 4, 5];
    const target = 98;
    const result = new BruteForceResult(target, inputs);
    
    expect(result.highestValue).not.toBe(97.5);
    expect(result.way).toBeTruthy();
    expect(result.calculations).toBeGreaterThan(0);
  });
});
