import { afterNextRender, ChangeDetectionStrategy, Component, ElementRef, inject, Injector, ViewChild } from '@angular/core';
import { BruteForceResult, dieFacePips, Die, Digit } from './typings';
import { DiceInputComponent } from './dice-input.component';
import { TargetInputComponent } from './target-input.component';

@Component({
  selector: 'app-close-to',
  standalone: true,
  imports: [DiceInputComponent, TargetInputComponent],
  templateUrl: './close-to.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class CloseToComponent {
  private readonly injector = inject(Injector);
  readonly pipPositions = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  readonly dieFacePips = dieFacePips;

  @ViewChild('resultCard') private resultCard?: ElementRef<HTMLElement>;

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

  getColoredSteps(steps: string[], usedDice: Die[]): Array<Array<{ text: string; color: string | null; die?: Die }>> {
    const resultColorMap: { [key: string]: string } = {};
    let colorIndex = 0;

    return steps.map((step, idx) => {
      // Parse step format: "55 + 4 = 59"
      const match = step.match(/(.+?)\s*([+\-*/])\s*(.+?)\s*=\s*(.+)/);
      if (!match) {
        return [{ text: step, color: null, die: usedDice[idx] }];
      }

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
        { text: operand1, color: operand1Color, die: idx === 0 ? usedDice[0] : undefined },
        { text: ` ${operator} `, color: null },
        { text: operand2, color: null, die: usedDice[idx + 1] },
        { text: ' = ', color: null },
        { text: result, color: resultColor }
      ];
    });
  }
}
