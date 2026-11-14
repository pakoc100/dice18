import { afterNextRender, ChangeDetectionStrategy, Component, ElementRef, inject, Injector, ViewChild } from '@angular/core';
import { BruteForceResult, dice, Die, Digit, digits } from './typings';

@Component({
  selector: 'app-close-to',
  standalone: true,
  templateUrl: './close-to.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class CloseToComponent {
  private readonly injector = inject(Injector);

  @ViewChild('resultCard') private resultCard?: ElementRef<HTMLElement>;

  dice = dice;
  digits = digits;
  pipPositions = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  facePips: Record<Die, readonly number[]> = {
    1: [5],
    2: [1, 9],
    3: [1, 5, 9],
    4: [1, 3, 7, 9],
    5: [1, 3, 5, 7, 9],
    6: [1, 3, 4, 6, 7, 9],
  };

  targetResult: string = '';

  currentInputs: Die[] = [];
  bruteForceResult?: BruteForceResult;


  addInput(addNumber: Die, currentInputs: Die[]): void {
    currentInputs.push(addNumber);
  }

  removeInput(): void {
    this.currentInputs?.pop();
  }

  removeAllInput(): void {
    this.currentInputs = [];
  }

  presentCurrentInputs(currentInputs: Die[]): string {
    console.log('E')
    return currentInputs?.join(', ')
  }

  addToTarget(addDigit: Digit, currentTargetResult: string): void {
    this.targetResult = currentTargetResult + addDigit;
  }

  removeTarget(): void {
    const currentLength = this.targetResult?.length;
    this.targetResult = this.targetResult.slice(0, currentLength - 1);
  }

  removeWholeTarget(): void {
    this.targetResult = '';
  }

  calculateMaximum(targetResult: string, currentInputs: Die[]): void {
    const target = parseInt(targetResult, 10);
    this.bruteForceResult = new BruteForceResult(target, currentInputs);
    afterNextRender(() => {
      this.resultCard?.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, { injector: this.injector });
  }

  clearEverything() {
    this.targetResult = '';
    this.currentInputs = [];
    this.bruteForceResult = undefined;
  }

  getColoredSteps(steps: string[]): Array<{ text: string; color: string | null }[]> {
    const resultColorMap: { [key: string]: string } = {};
    let colorIndex = 0;

    return steps.map((step, idx) => {
      // Parse step format: "55 + 4 = 59"
      const match = step.match(/(.+?)\s*([+\-*/])\s*(.+?)\s*=\s*(.+)/);
      if (!match) return [{ text: step, color: null }];

      const operand1 = match[1].trim();
      const operator = match[2].trim();
      const operand2 = match[3].trim();
      const result = match[4].trim();

      // Determine color for operand1 (if it was a previous result)
      const operand1Color = resultColorMap[operand1] ?? null;

      // Assign new color to result
      if (!resultColorMap[result]) {
        resultColorMap[result] = 'color-' + (colorIndex % 5);
        colorIndex++;
      }
      const resultColor = resultColorMap[result];

      return [
        { text: operand1, color: operand1Color },
        { text: ` ${operator} `, color: null },
        { text: operand2, color: null },
        { text: ' = ', color: null },
        { text: result, color: resultColor }
      ];
    });
  }
}
