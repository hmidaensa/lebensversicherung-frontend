import { Component, OnInit } from '@angular/core';
import { AllgemainKundInfo } from '../../interfaces/allgemain-kund-info';
import { AntragService } from '../../services/antrag.service';
import { SharedModule } from '../../shared/shared.module';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { AnzalKinder } from '../../enums/anzal-kinder';
import { Raucherstatus } from '../../enums/raucherstatus';

@Component({
  selector: 'app-persoenliche-angaben',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './persoenliche-angaben.component.html',
  styleUrl: './persoenliche-angaben.component.css',
})
export class PersoenlicheAngabenComponent {
   allgemainKundInfo?: AllgemainKundInfo;
   public submitted = false;
   public anzalKinders=AnzalKinder
   public raucherstatusses=Raucherstatus
   public readonly originalOrder = (): number => 0
 

  formallgemainKundInfo: FormGroup = new FormGroup({
    geburtsDatum: new FormControl('', [Validators.required]),
    beruf: new FormControl('', [Validators.required]),
    anzahlKinder: new FormControl('', [Validators.required]),
    raucher:new FormControl('', [Validators.required]),
  });

  constructor(public antragService: AntragService, formBuilder: FormBuilder) {
 
    this.formallgemainKundInfo = formBuilder.group({
      geburtsDatum: new FormControl('', [Validators.required]),
      beruf: new FormControl('', [Validators.required]),
      anzahlKinder: new FormControl('', [Validators.required]),
      raucher:new FormControl('', [Validators.required]),
    });
  }
 
  get validateForm() {
    return this.formallgemainKundInfo.controls;
  }

  speicher():void{

    console.log(this.formallgemainKundInfo.invalid)
    this.submitted=true
    if (this.formallgemainKundInfo.valid) {
 
      this.antragService.setPersoenlicheDaten(this.formallgemainKundInfo.value)
  
      
    }



  }
}
