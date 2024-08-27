import { computed, Injectable, signal } from '@angular/core';
import { AntragLebensVersicherung } from '../interfaces/antrag-lebens-versicherung';
import { AllgemainKundInfo } from '../interfaces/allgemain-kund-info';
import { UtilsService } from './utils.service';
import { Tarif } from '../interfaces/tarif';

@Injectable({
  providedIn: 'root',
})
export class AntragService extends UtilsService {
  antrag = signal<AntragLebensVersicherung | null>(null);
  isActivateStepper2 = signal(false);
  isActivateStepper3 = signal(false);

  

  beitrag = computed(() => {
    return this.beitragKinder() + this.beitragRaucher() + this.beitragAlter();
  });
  beitragKinder = computed(() => {
    return this.rechnerBeitragKinder(
      this.antrag()?.allgemainKundInfo?.anzahlKinder!,
      this.antrag()?.allgemainKundInfo?.seaugling!
    );
  });

  beitragAlter = computed(() => {
    return this.rechnerBeitragAlter(
      this.antrag()?.allgemainKundInfo?.geburtsDatum!
    );
  });

  beitragRaucher = computed(() => {
    return this.rechnerBeitragRaucher(
      this.antrag()?.allgemainKundInfo?.raucher!
    );
  });

  setPersoenlicheDaten(allgemainKundInfo: any): void {
    this.antrag.update((item) => {
      return {
        ...item,
        allgemainKundInfo: allgemainKundInfo,
      };
    });
  }
  setTarifDaten(tarif: any): void {
    this.antrag.update((item) => {
      return {
        ...item,
        tarif: tarif,
      };
    });
  }

  geheZuSchritt2(schritt: boolean): void {
    this.isActivateStepper2.set(schritt);
  }
}
