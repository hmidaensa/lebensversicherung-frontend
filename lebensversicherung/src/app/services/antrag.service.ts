import { computed, Injectable, signal } from '@angular/core';
import { AntragLebensVersicherung } from '../interfaces/antrag-lebens-versicherung';
import { AllgemainKundInfo } from '../interfaces/allgemain-kund-info';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root',
})
export class AntragService extends UtilsService {
  antrag = signal<AntragLebensVersicherung | null>(null);

  beitrag = computed(() => {
    return this.beitragKinder()+this.beitragRaucher()+this.beitragAlter()
   });
  beitragKinder = computed(() => {
     return this.rechnerBeitragKinder(this.antrag()?.allgemainKundInfo?.anzahlKinder!,this.antrag()?.allgemainKundInfo?.seaugling!);
  });

  beitragAlter = computed(() => {
    return this.rechnerBeitragAlter(this.antrag()?.allgemainKundInfo?.geburtsDatum!)
   });

   beitragRaucher = computed(() => {
    return this.rechnerBeitragRaucher(this.antrag()?.allgemainKundInfo?.raucher!)
   });

  setPersoenlicheDaten(allgemainKundInfo: AllgemainKundInfo): void {
    this.antrag.update((item) => {
      return {
        ...item,
        allgemainKundInfo: allgemainKundInfo,
      };
    });
  }
}
