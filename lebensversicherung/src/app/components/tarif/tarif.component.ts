import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { Tarif } from '../../interfaces/tarif';
import { TarifVariant } from '../../enums/tarif-variant';
import { Periode } from '../../enums/periode';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AntragService } from '../../services/antrag.service';
import { TarifWahlBeschreibungComponent } from '../tarif-wahl-beschreibung/tarif-wahl-beschreibung.component';

@Component({
  selector: 'app-tarif',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [SharedModule,TarifWahlBeschreibungComponent],
  templateUrl: './tarif.component.html',
  styleUrl: './tarif.component.css'
})
export class TarifComponent implements OnInit {
   tarif?:Tarif
  public submitted = false;
  public tarifVariants = TarifVariant;
  public zahlungPeriodes=Periode

  public readonly originalOrder = (): number => 0;
  datumList:any[]=[]

  formGewuenschTarif: FormGroup = new FormGroup({
    tarifVariant: new FormControl('', [Validators.required]),
    versicherungssumme: new FormControl('', [Validators.required]),
    zeitraum: new FormControl('', [Validators.required]),
    versichertAb: new FormControl('', [Validators.required]),
    zahlungPeriode: new FormControl('', [Validators.required]),
    
  });


  constructor(
    public antragService: AntragService,
    public formBuilder: FormBuilder,
    private router: Router
    
  ) {
    this.formGewuenschTarif = formBuilder.group({
      tarifVariant: new FormControl('', [Validators.required]),
      versicherungssumme: new FormControl('', [Validators.required]),
      zeitraum: new FormControl('', [Validators.required]),
      versichertAb: new FormControl('', [Validators.required]),
      zahlungPeriode: new FormControl('', [Validators.required]),
    });
   
  
    
     
  }
  ngOnInit(): void {
    if(this.antragService.antrag() && this.antragService.antrag()?.tarif){
      this.formGewuenschTarif= this.formBuilder.group(this.antragService.antrag()!.tarif!)
    }
  
    if (!this.antragService.isActivateStepper2()) {
      this.router.navigate(['/start/menu/perseonliche-angaben']);
    }
    let currentDate=new Date();
    this.datumList.push(currentDate.setMonth(currentDate.getMonth()))
    this.datumList.push(currentDate.setMonth(currentDate.getMonth()+1))
    this.datumList.push(currentDate.setMonth(currentDate.getMonth()+1))
  }

  get validateForm() {
    return this.formGewuenschTarif.controls;
  }

  geheZuSchritt1():void{
    this.router.navigate(['/start/menu/perseonliche-angaben']);
  }
  rechnerBeitrag():void{
    this.antragService.setTarifDaten(this.formGewuenschTarif.value)
  }

  speicher():void{
    this.submitted=true
    console.log(this.formGewuenschTarif.value)
    
  }

  setVersicherungssumme(event:any):void{
    this.formGewuenschTarif.get('versicherungssumme')?.setValue(event.target.value);
    this.rechnerBeitrag();
 
  }
  setZeitraum(event:any):void{
    this.formGewuenschTarif.get('zeitraum')?.setValue(event.target.value);
    this.rechnerBeitrag();
  }
}
