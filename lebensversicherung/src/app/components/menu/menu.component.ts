import { Component } from '@angular/core';
 
import { SharedModule } from '../../shared/shared.module';
import { VersicherungsBeitragComponent } from '../versicherungs-beitrag/versicherungs-beitrag.component';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [SharedModule,VersicherungsBeitragComponent],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {

}
