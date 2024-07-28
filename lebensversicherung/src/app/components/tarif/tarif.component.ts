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
   //tarif?:Tarif
  public submitted = false;
  public tarifVariants = TarifVariant;
  public zahlungPeriodes=Periode

  public readonly originalOrder = (): number => 0;
  datumList:any[]=[]



  constructor(
    public antragService: AntragService,
    public formBuilder: FormBuilder,
    private router: Router
    
  ) {
    
   
  
    
     
  }
  ngOnInit(): void {
   
  
    if (!this.antragService.isActivateStepper2()) {
      this.router.navigate(['/start/menu/perseonliche-angaben']);
    }
    let currentDate=new Date();
    this.datumList.push(currentDate.setMonth(currentDate.getMonth()))
    this.datumList.push(currentDate.setMonth(currentDate.getMonth()+1))
    this.datumList.push(currentDate.setMonth(currentDate.getMonth()+1))

    
  }

  get validateForm() {
    return this.antragService.formAntrag().formGewuenschTarif.controls;
  }

  geheZuSchritt1():void{
    this.router.navigateByUrl('/start/menu/perseonliche-angaben');
  }
  rechnerBeitrag():void{
    this.antragService.setTarifDaten(this.antragService.formAntrag().formGewuenschTarif.value)
  }

  speicher():void{
    this.submitted=true

    console.log(this.antragService.formAntrag().formGewuenschTarif.valid)
    console.log(this.antragService.formAntrag().formGewuenschTarif.value)
    
  }

  setVersicherungssumme(event:any):void{
    this.antragService.formAntrag().formGewuenschTarif.get('versicherungssumme')?.setValue(event.target.value);
    this.rechnerBeitrag();
 
  }
  setZeitraum(event:any):void{
    this.antragService.formAntrag().formGewuenschTarif.get('zeitraum')?.setValue(event.target.value);
    this.rechnerBeitrag();
  }
}
