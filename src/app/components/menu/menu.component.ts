import { Component, inject } from '@angular/core';
 
import { SharedModule } from '../../shared/shared.module';
import { VersicherungsBeitragComponent } from '../versicherungs-beitrag/versicherungs-beitrag.component';
import { StepperDirective } from '../../shared/stepper.directive';
import { AntragService } from '../../services/antrag.service';
import { HttpClient } from '@angular/common/http';
import { signalify } from 'ngx-signalify';


const URL = 'https://jsonplaceholder.typicode.com/comments';

interface Comment {
  id: number;
  body: string;
  email: string;
}
@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [SharedModule,VersicherungsBeitragComponent,StepperDirective],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
  //providers:[AntragService]
})
export class MenuComponent {

  http = inject(HttpClient);
  comments = signalify(this.http.get<Comment[]>(URL));

}
