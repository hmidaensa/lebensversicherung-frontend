import { Component } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { MenuComponent } from '../menu/menu.component';

@Component({
  selector: 'app-risiko-lebensversicherung-start',
  standalone: true,
  imports: [SharedModule,MenuComponent],
  templateUrl: './risiko-lebensversicherung-start.component.html',
  styleUrl: './risiko-lebensversicherung-start.component.css'
})
export class RisikoLebensversicherungStartComponent {

}
