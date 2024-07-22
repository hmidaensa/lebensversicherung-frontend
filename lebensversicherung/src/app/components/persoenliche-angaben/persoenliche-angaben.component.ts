import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
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
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-persoenliche-angaben',
  standalone: true,
  imports: [SharedModule],

  templateUrl: './persoenliche-angaben.component.html',
  styleUrl: './persoenliche-angaben.component.css',
})
export class PersoenlicheAngabenComponent {
  allgemainKundInfo?: AllgemainKundInfo;
  public submitted = false;
  public anzalKinders = AnzalKinder;
  public raucherstatusses = Raucherstatus;
  public hasKinder=false
  public hasKinderUnten6=false
  public readonly originalOrder = (): number => 0;

  formallgemainKundInfo: FormGroup = new FormGroup({
    geburtsDatum: new FormControl('', [Validators.required]),
    beruf: new FormControl('', [Validators.required]),
    anzahlKinder: new FormControl('', [Validators.required]),
    raucher: new FormControl('', [Validators.required]),
    seaugling: new FormControl('', []),
    geburtsDatum6: new FormControl('', []),
    vornamBaby: new FormControl('', []),
  });

  constructor(public antragService: AntragService, formBuilder: FormBuilder) {
    this.formallgemainKundInfo = formBuilder.group({
      geburtsDatum: new FormControl('', [Validators.required]),
      beruf: new FormControl('', [Validators.required]),
      anzahlKinder: new FormControl('', [Validators.required]),
      raucher: new FormControl('', [Validators.required]),
      seaugling: new FormControl('false', []),
      geburtsDatum6: new FormControl('', []),
      vornamBaby: new FormControl('', []),
    });
  }

  get validateForm() {
    return this.formallgemainKundInfo.controls;
  }

  speicher(): void {
    this.submitted = true;
    console.log(this.formallgemainKundInfo.valid)
    if (this.formallgemainKundInfo.valid) {
      this.antragService.setPersoenlicheDaten(this.formallgemainKundInfo.value);
    }
  }

  rechnerBeitrag(): void {
    console.log(this.formallgemainKundInfo.value['anzahlKinder'])

    this.antragService.setPersoenlicheDaten(this.formallgemainKundInfo.value);
    if (this.formallgemainKundInfo.value['anzahlKinder'] &&
      this.antragService.getEnumKeyByEnumValue(
        AnzalKinder,
        AnzalKinder.KEINE_K
      ) != this.formallgemainKundInfo.value['anzahlKinder']
    ) {
       this.hasKinder=true
       
      this.formallgemainKundInfo.updateValueAndValidity();
    } else  if (
      this.antragService.getEnumKeyByEnumValue(
        AnzalKinder,
        AnzalKinder.KEINE_K
      ) == this.formallgemainKundInfo.value['anzahlKinder']
    ) {
      this.hasKinder=false
       this.hasKinderUnten6=false
      this.formallgemainKundInfo.get('seaugling')?.setValue('false')
      this.formallgemainKundInfo.get('geburtsDatum6')?.setValue('')
      this.formallgemainKundInfo.get('vornamBaby')?.setValue('')
      this.formallgemainKundInfo.updateValueAndValidity()
    }
   
  }

  hasSeaugling():void{
    let dd=this.formallgemainKundInfo.value['seaugling']
    if (this.formallgemainKundInfo.value['seaugling']=='true') {
       this.hasKinderUnten6=true
      this.formallgemainKundInfo.controls['geburtsDatum6'].setValidators([
        Validators.required,
      ]);
      this.formallgemainKundInfo.controls['vornamBaby'].setValidators([
        Validators.required,
      ]);
  
      this.formallgemainKundInfo.updateValueAndValidity();
    } else {
      this.hasKinderUnten6=false
      this.formallgemainKundInfo.controls['geburtsDatum6'].setValidators([]);
      this.formallgemainKundInfo.controls['geburtsDatum6'].setValue("")
      this.formallgemainKundInfo.controls['vornamBaby'].setValidators([]);
      this.formallgemainKundInfo.controls['vornamBaby'].setValue("")
     
      this.formallgemainKundInfo.updateValueAndValidity()
    }
    this.rechnerBeitrag()
  }

  
}
