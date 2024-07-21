import { computed, Injectable, signal } from '@angular/core';
import { AntragLebensVersicherung } from '../interfaces/antrag-lebens-versicherung';
import { AllgemainKundInfo } from '../interfaces/allgemain-kund-info';
import { AnzalKinder } from '../enums/anzal-kinder';

@Injectable({
  providedIn: 'root',
})
export class AntragService {
  antrag = signal<AntragLebensVersicherung | null>(null);

  beitrag = computed(() => {
    switch (this.antrag()?.allgemainKundInfo?.anzahlKinder) {
      case this.getEnumKeyByEnumValue(AnzalKinder, AnzalKinder.KEINE_K):
        return 0;
      case this.getEnumKeyByEnumValue(AnzalKinder, AnzalKinder.EIN_K):
        return 1;
      case this.getEnumKeyByEnumValue(AnzalKinder, AnzalKinder.ZWEI_K):
        return 2;
      case this.getEnumKeyByEnumValue(AnzalKinder, AnzalKinder.DREI_K):
        return 3;
      case this.getEnumKeyByEnumValue(AnzalKinder, AnzalKinder.MEHR_K):
        return 4;
    }

    return this.antrag()?.allgemainKundInfo?.anzahlKinder.length;
  });

  constructor() {}

  setPersoenlicheDaten(allgemainKundInfo: AllgemainKundInfo): void {
    console.log(this.beitrag());
    this.antrag.update((item) => {
      return {
        ...item,
        allgemainKundInfo: allgemainKundInfo,
      };
    });
  }

  getEnumKeyByEnumValue(enumObj: any, enumValue: any): string | null {
    let keys = Object.keys(enumObj).filter((k) => enumObj[k] === enumValue);
    return keys.length > 0 ? keys[0] : null;
  }
}
