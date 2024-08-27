import { Component } from '@angular/core';
import { AntragService } from '../../services/antrag.service';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-versicherungs-beitrag',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './versicherungs-beitrag.component.html',
  styleUrl: './versicherungs-beitrag.component.css'
})
export class VersicherungsBeitragComponent {

 

  constructor(public antragService:AntragService){
 
  }

}
