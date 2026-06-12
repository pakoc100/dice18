import { Component } from '@angular/core';
import { CloseToComponent } from './close-to/close-to.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CloseToComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'dice';
}
