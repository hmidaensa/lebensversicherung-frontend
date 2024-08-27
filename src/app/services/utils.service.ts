import { Injectable, signal } from '@angular/core';

import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AnzalKinder } from '../enums/anzal-kinder';
import { ApiService } from './apiService';
import { HelpService } from './helpService';
import { Raucherstatus } from '../enums/raucherstatus';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class UtilsService implements ApiService, HelpService {

  formAntrag = signal({
    formallgemainKundInfo: new FormBuilder().group({
      kundnummer: new FormControl('', []),
      geburtsDatum: new FormControl('', [Validators.required]),
      beruf: new FormControl('', [Validators.required]),
      anzahlKinder: new FormControl('', [Validators.required]),
      raucher: new FormControl('', [Validators.required]),
      seaugling: new FormControl('false', []),
      geburtsDatum6: new FormControl('', []),
      vornamBaby: new FormControl('', []),
    }),
    formGewuenschTarif: new FormBuilder().group({ tarifVariant: new FormControl('', [Validators.required]),
      versicherungssumme: new FormControl('', [Validators.required,Validators.min(15000)]),
      zeitraum: new FormControl('', [Validators.required,]),
      versichertAb: new FormControl('', [Validators.required,Validators.minLength(5)]),
      zahlungPeriode: new FormControl('', [Validators.required]),})
 });



  constructor(private http: HttpClient) {}
  rechnerBeitragAlter(geburtsDatum: Date): number {
    let alter = this.getAlterByGeburtsdatum(geburtsDatum);

    return alter * 0.01 * 5;
  }

  rechnerBeitragRaucher(raucherstatus: Raucherstatus): number {
    switch (raucherstatus) {
      case this.getEnumKeyByEnumValue(Raucherstatus, Raucherstatus.NIE_RUCHER):
        return 0;
      case this.getEnumKeyByEnumValue(Raucherstatus, Raucherstatus.VOR_MEHR_10):
        return 1;
      case this.getEnumKeyByEnumValue(Raucherstatus, Raucherstatus.VOR_MEHR_12):
        return 3.5;
      case this.getEnumKeyByEnumValue(
        Raucherstatus,
        Raucherstatus.IN_LETZTE_10_MONATE
      ):
        return 5;

      default:
        return 0;
    }
  }

  rechnerBeitragKinder(anzahlKinder: AnzalKinder,hasKinderUnten6:any): number {
    let rateHasKinderUnten6= hasKinderUnten6=='true' ? 1.5 :0
    switch (anzahlKinder) {
      case this.getEnumKeyByEnumValue(AnzalKinder, AnzalKinder.KEINE_K):
        return 0;
      case this.getEnumKeyByEnumValue(AnzalKinder, AnzalKinder.EIN_K):
        return 2.5;
      case this.getEnumKeyByEnumValue(AnzalKinder, AnzalKinder.ZWEI_K):
        return 4.5+rateHasKinderUnten6;
      case this.getEnumKeyByEnumValue(AnzalKinder, AnzalKinder.DREI_K):
        return 5+rateHasKinderUnten6;
      case this.getEnumKeyByEnumValue(AnzalKinder, AnzalKinder.MEHR_K):
        return 8.5+rateHasKinderUnten6;
      default:
        return 0;
    }
  }

  getAlterByGeburtsdatum(guburtsdatum: any): number {
    if (guburtsdatum == '') {
      return 0;
    } else {
      return (
        new Date().getFullYear() -
        new Date(guburtsdatum?.valueOf()).getFullYear()
      );
    }
  }

  getEnumKeyByEnumValue(enumObj: any, enumValue: any): string | null {
    let keys = Object.keys(enumObj).filter((k) => enumObj[k] === enumValue);
    return keys.length > 0 ? keys[0] : null;
  }
  get<T>(url: string): Observable<T> {
    return this.http.get<T>(url);
  }

  post<T>(url: string, body: any): Observable<T> {
    return this.http.post<T>(url, body);
  }

  put<T>(url: string, body: any): Observable<T> {
    return this.http.put<T>(url, body);
  }

  delete<T>(url: string): Observable<T> {
    return this.http.delete<T>(url);
  }
}
