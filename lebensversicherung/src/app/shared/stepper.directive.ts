import { Directive, HostListener, Renderer2 } from '@angular/core';
import { AntragService } from '../services/antrag.service';

@Directive({
  selector: '[appStepper]',
  standalone: true
})
export class StepperDirective {

  constructor(
    private antragService:AntragService,
    private renderer:Renderer2


  ) { }

  @HostListener('mouseover') onMouseOver() {


    let step2 = document.querySelector('#step2');
    let step3 = document.querySelector('#step3');

    let isActivateStepper2 = this.antragService.isActivateStepper2();
    let isActivateStepper3 = this.antragService.isActivateStepper3();

    if (isActivateStepper2) {
      this.renderer.setStyle(step2, 'pointer-events', '');
    } else {
      this.renderer.setStyle(step2, 'pointer-events', 'none');
    }

    if (isActivateStepper3) {
      this.renderer.setStyle(step3, 'pointer-events', '');
    } else {
      this.renderer.setStyle(step3, 'pointer-events', 'none');
    }
  }

}
