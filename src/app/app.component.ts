import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SharedModule } from './shared/shared.module';
import { RisikoLebensversicherungStartComponent } from './components/risiko-lebensversicherung-start/risiko-lebensversicherung-start.component';
 
 
 

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RisikoLebensversicherungStartComponent,SharedModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'lebensversicherung';
}

 