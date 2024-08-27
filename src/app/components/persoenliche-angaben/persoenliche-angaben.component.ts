import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AntragService } from '../../services/antrag.service';
import { SharedModule } from '../../shared/shared.module';
import {
  FormBuilder,
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
  
  public submitted = false;
  public anzalKinders = AnzalKinder;
  public raucherstatusses = Raucherstatus;

  public readonly originalOrder = (): number => 0;

  constructor(
    public antragService: AntragService,
    public formBuilder: FormBuilder,
    private router: Router
  ) {}
  ngOnInit(): void {}

  get validateForm() {
    return this.antragService.formAntrag().formallgemainKundInfo.controls;
  }

  speicher(): void {
    this.submitted = true;
    if (this.antragService.formAntrag().formallgemainKundInfo.valid) {
      this.antragService.setPersoenlicheDaten(
        this.antragService.formAntrag().formallgemainKundInfo.value
      );
      this.router.navigate(['/start/menu/tarif']);
    }
  }

  rechnerBeitrag(): void {
    this.antragService.setPersoenlicheDaten(
      this.antragService.formAntrag().formallgemainKundInfo.value
    );

    if (
      this.antragService.getEnumKeyByEnumValue(
        AnzalKinder,
        AnzalKinder.KEINE_K
      ) ==
      this.antragService.formAntrag().formallgemainKundInfo.value[
        'anzahlKinder'
      ]
    ) {
      this.antragService
        .formAntrag()
        .formallgemainKundInfo.get('seaugling')
        ?.setValue('false');

      this.validFormKinder6();
    }

    this.geheZuSchritt2();
  }

  hasSeaugling(): void {
    if (
      this.antragService.formAntrag().formallgemainKundInfo.value[
        'seaugling'
      ] == 'true'
    ) {
      this.antragService
        .formAntrag()
        .formallgemainKundInfo.controls['geburtsDatum6'].setValidators([
          Validators.required,
        ]);
      this.antragService
        .formAntrag()
        .formallgemainKundInfo.controls['vornamBaby'].setValidators([
          Validators.required,
        ]);
      this.antragService
        .formAntrag()
        .formallgemainKundInfo.controls[
          'geburtsDatum6'
        ].updateValueAndValidity();
      this.antragService
        .formAntrag()
        .formallgemainKundInfo.controls['vornamBaby'].updateValueAndValidity();
    } else {
      this.validFormKinder6();
    }

    this.rechnerBeitrag();
  }

  geheZuSchritt2(): void {
    if (this.antragService.formAntrag().formallgemainKundInfo.valid) {
      this.antragService.geheZuSchritt2(true);
    } else {
      this.antragService.geheZuSchritt2(false);
    }
  }

  validFormKinder6(): void {
    this.antragService
      .formAntrag()
      .formallgemainKundInfo.get('geburtsDatum6')
      ?.setValue('');
    this.antragService
      .formAntrag()
      .formallgemainKundInfo.get('vornamBaby')
      ?.setValue('');
    this.antragService
      .formAntrag()
      .formallgemainKundInfo.controls['geburtsDatum6'].setValidators([]);
    this.antragService
      .formAntrag()
      .formallgemainKundInfo.controls['vornamBaby'].setValidators([]);
    this.antragService
      .formAntrag()
      .formallgemainKundInfo.controls['geburtsDatum6'].updateValueAndValidity();
    this.antragService
      .formAntrag()
      .formallgemainKundInfo.controls['vornamBaby'].updateValueAndValidity();
  }
}
