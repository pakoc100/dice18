import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CloseToComponent } from './close-to/close-to.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CloseToComponent],
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'dice';
}
