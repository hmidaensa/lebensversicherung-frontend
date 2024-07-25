import { Component } from '@angular/core';
 
import { SharedModule } from '../../shared/shared.module';
import { VersicherungsBeitragComponent } from '../versicherungs-beitrag/versicherungs-beitrag.component';
import { StepperDirective } from '../../shared/stepper.directive';
import { AntragService } from '../../services/antrag.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [SharedModule,VersicherungsBeitragComponent,StepperDirective],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
  //providers:[AntragService]
})
export class MenuComponent {

}
