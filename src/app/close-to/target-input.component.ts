import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Digit } from './typings';

@Component({
  selector: 'app-target-input',
  standalone: true,
  templateUrl: './target-input.component.html',
  styleUrls: ['./target-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class TargetInputComponent {
  @Input() targetResult = '';
  @Input() canCalculate = false;
  @Output() addDigit = new EventEmitter<Digit>();
  @Output() removeLast = new EventEmitter<void>();
  @Output() clearAll = new EventEmitter<void>();
  @Output() calculate = new EventEmitter<void>();
  @Output() reset = new EventEmitter<void>();

  readonly keypadDigits: Digit[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
}
