import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { dice, Die } from './typings';

@Component({
  selector: 'app-dice-input',
  standalone: true,
  templateUrl: './dice-input.component.html',
  styleUrls: ['./dice-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class DiceInputComponent {
  @Input() currentInputs: Die[] = [];
  @Output() addDie = new EventEmitter<Die>();
  @Output() removeLast = new EventEmitter<void>();
  @Output() clearAll = new EventEmitter<void>();

  readonly dice = dice;
  readonly pipPositions = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  readonly facePips: Record<Die, readonly number[]> = {
    1: [5],
    2: [1, 9],
    3: [1, 5, 9],
    4: [1, 3, 7, 9],
    5: [1, 3, 5, 7, 9],
    6: [1, 3, 4, 6, 7, 9],
  };

  presentCurrentInputs(): string {
    return this.currentInputs.join(', ');
  }
}
