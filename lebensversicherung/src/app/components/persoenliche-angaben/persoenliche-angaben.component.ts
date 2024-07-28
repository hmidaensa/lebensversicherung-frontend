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
import { Router } from '@angular/router';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-persoenliche-angaben',
  standalone: true,
  imports: [SharedModule],

  templateUrl: './persoenliche-angaben.component.html',
  styleUrl: './persoenliche-angaben.component.css',
})
export class PersoenlicheAngabenComponent implements OnInit {
  allgemainKundInfo?: any;
  public submitted = false;
  public anzalKinders = AnzalKinder;
  public raucherstatusses = Raucherstatus;

  public readonly originalOrder = (): number => 0;

  formallgemainKundInfo: FormGroup;

  constructor(
    public antragService: AntragService,
    public formBuilder: FormBuilder,
    private router: Router
  ) {
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
  ngOnInit(): void {
    if (this.antragService.antrag()) {
      this.formallgemainKundInfo = this.formBuilder.group(
        this.antragService.antrag()!.allgemainKundInfo!
      );
    }
  }

  get validateForm() {
    return this.formallgemainKundInfo.controls;
  }

  speicher(): void {
    this.submitted = true;
    if (this.formallgemainKundInfo.valid) {
      this.antragService.setPersoenlicheDaten(this.formallgemainKundInfo.value);
      this.router.navigate(['/start/menu/tarif']);
    }
  }

  rechnerBeitrag(): void {
    this.antragService.setPersoenlicheDaten(this.formallgemainKundInfo.value);

    if (
      this.antragService.getEnumKeyByEnumValue(
        AnzalKinder,
        AnzalKinder.KEINE_K
      ) == this.formallgemainKundInfo.value['anzahlKinder']
    ) {
      this.formallgemainKundInfo.get('seaugling')?.setValue('false');

      this.validFormKinder6();
    }

    this.geheZuSchritt2();
  }

  hasSeaugling(): void {
    if (this.formallgemainKundInfo.value['seaugling'] == 'true') {
      this.formallgemainKundInfo.controls['geburtsDatum6'].setValidators([
        Validators.required,
      ]);
      this.formallgemainKundInfo.controls['vornamBaby'].setValidators([
        Validators.required,
      ]);
      this.formallgemainKundInfo.controls[
        'geburtsDatum6'
      ].updateValueAndValidity();
      this.formallgemainKundInfo.controls[
        'vornamBaby'
      ].updateValueAndValidity();
    } else {
      this.validFormKinder6();
    }

    this.rechnerBeitrag();
  }

  geheZuSchritt2(): void {
    if (this.formallgemainKundInfo.valid) {
      this.antragService.geheZuSchritt2(true);
    } else {
      this.antragService.geheZuSchritt2(false);
    }
  }

  validFormKinder6(): void {
    this.formallgemainKundInfo.get('geburtsDatum6')?.setValue('');
    this.formallgemainKundInfo.get('vornamBaby')?.setValue('');
    this.formallgemainKundInfo.controls['geburtsDatum6'].setValidators([]);
    this.formallgemainKundInfo.controls['vornamBaby'].setValidators([]);
    this.formallgemainKundInfo.controls[
      'geburtsDatum6'
    ].updateValueAndValidity();
    this.formallgemainKundInfo.controls['vornamBaby'].updateValueAndValidity();
  }
}
