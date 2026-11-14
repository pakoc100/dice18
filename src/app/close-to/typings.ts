export const dice = [1, 2, 3, 4, 5, 6] as const;
export type Die = typeof dice[number];

export const digits = [0, ...dice, 7, 8, 9] as const;
export type Digit = typeof digits[number];


const operators = ['+', '-', '*', '/'] as const;
type Operator = typeof operators[number];

/**
 * Evaluate numbers and operators left-to-right (ignoring standard operator precedence)
 * e.g., [55, 4, 3, 1, 4] with ['+', '*', '*', '-'] = (((55+4)*3)*1)-4 = 173
 */
export function evaluateLeftToRight(numbers: number[], ops: string[]): number {
    let result = numbers[0];
    for (let i = 0; i < ops.length; i++) {
        const op = ops[i];
        const nextNum = numbers[i + 1];
        switch (op) {
            case '+':
                result = result + nextNum;
                break;
            case '-':
                result = result - nextNum;
                break;
            case '*':
                result = result * nextNum;
                break;
            case '/':
                if (nextNum === 0) return NaN; // avoid division by zero
                result = result / nextNum;
                break;
        }
    }
    return result;
}

/**
 * Build equation string for display (left-to-right evaluation)
 * e.g., (((55+4)*3)*1)-4
 */
export function buildEquationString(numbers: number[], ops: string[]): string {
    let result = `${numbers[0]}`;
    for (let i = 0; i < ops.length; i++) {
        result = `(${result}${ops[i]}${numbers[i + 1]})`;
    }
    return result;
}

export function buildEquation(inputDigitSeed: number[], operandSeed: string[]) {
    let equation = '';
    let index = 0;
    for (const inputDigit of inputDigitSeed) {
        const nextPart = index === operandSeed.length ? inputDigit : `${inputDigit}${operandSeed[index]}`;
        equation = equation + nextPart;
        index++;
    }
    return equation;
}


export function permutations<T>(arr: T[]): T[][] {
    if (arr.length === 0) {
        return [[]];
    }

    const result: T[][] = [];
    for (let i = 0; i < arr.length; i++) {
        const rest = [...arr.slice(0, i), ...arr.slice(i + 1)];
        const restPermutations = permutations(rest);
        for (const perm of restPermutations) {
            result.push([arr[i], ...perm]);
        }
    }

    return result;
}

export function filterDuplicates(arr: number[][]): number[][] {
    const seen = new Set<string>();
    return arr.filter((subArr) => {
        const key = subArr.join(',');
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
    });
}

export function generateCombinationsWithRepetition(
    items: string[],
    length: number,
    prefix: string[] = [],
    result: string[][] = []
): string[][] {
    if (prefix.length === length) {
        result.push(prefix);
        return result;
    }

    for (let i = 0; i < items.length; i++) {
        generateCombinationsWithRepetition(
            items,
            length,
            [...prefix, items[i]],
            result
        );
    }

    return result;
}

export function splitIntoSteps(resultWithBraces: string): string[] {
    if (!resultWithBraces) return [];
    
    // Extract numbers and operators from the equation string
    // e.g., "(((55+4)*3)*1)-4" -> numbers: [55, 4, 3, 1, 4], operators: ['+', '*', '*', '-']
    const numberMatches = resultWithBraces.match(/\d+/g) || [];
    const operatorMatches = resultWithBraces.match(/[+\-*/]/g) || [];
    
    const numbers = numberMatches.map(Number);
    const operators = operatorMatches;
    
    if (numbers.length === 0) return [];
    if (numbers.length === 1) return [`${numbers[0]}`];
    
    const steps: string[] = [];
    let result = numbers[0];
    
    // Evaluate left-to-right and track each step
    for (let i = 0; i < operators.length; i++) {
        const op = operators[i];
        const nextNum = numbers[i + 1];
        let stepResult: number;
        
        switch (op) {
            case '+':
                stepResult = result + nextNum;
                break;
            case '-':
                stepResult = result - nextNum;
                break;
            case '*':
                stepResult = result * nextNum;
                break;
            case '/':
                stepResult = nextNum === 0 ? NaN : result / nextNum;
                break;
            default:
                stepResult = result;
        }
        
        steps.push(`${result} ${op} ${nextNum} = ${stepResult}`);
        result = stepResult;
    }
    
    return steps;
  }


export class BruteForceResult {
    highestValue: number = 0;
    way: string = '';
    wayStepByStep: string[] = [];
    calculations: number = 0;


    constructor(target: number, inputs: Die[]) {
        if (!target) return;

        const allInputs: number[][] = permutations(inputs);
        const allInputsWithoutDuplicates = filterDuplicates(allInputs);
        const inputLength = inputs?.length;
        const operandsLength = inputLength - 1;
        const allOperandsSeeds = generateCombinationsWithRepetition(operators?.map(operator => operator.toString()), operandsLength);

        for (const operandSeed of allOperandsSeeds) {
            for (const inputDigitSeed of allInputsWithoutDuplicates) {
                const currentValue = evaluateLeftToRight(inputDigitSeed, operandSeed);
                this.calculations++;
                
                // Skip invalid results (NaN from division by zero) and non-integers
                if (!isFinite(currentValue) || !Number.isInteger(currentValue)) continue;
                
                if (currentValue >= this.highestValue && currentValue <= target) {
                    this.highestValue = currentValue;
                    this.way = buildEquationString(inputDigitSeed, operandSeed);
                    this.wayStepByStep = splitIntoSteps(this.way);
                }

                if (currentValue === target)
                    return;
            }
        }
    }
}