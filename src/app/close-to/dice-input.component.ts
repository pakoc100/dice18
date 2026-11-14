import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { dice, dieFacePips, Die } from './typings';

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
  readonly facePips = dieFacePips;

  countForDie(die: Die): number {
    return this.currentInputs.filter(input => input === die).length;
  }
}
