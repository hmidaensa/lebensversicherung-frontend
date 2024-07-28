import { Component } from '@angular/core';
import { AntragService } from '../../services/antrag.service';
import { TarifVariant } from '../../enums/tarif-variant';

@Component({
  selector: 'app-tarif-wahl-beschreibung',
  standalone: true,
  imports: [],
  templateUrl: './tarif-wahl-beschreibung.component.html',
  styleUrl: './tarif-wahl-beschreibung.component.css'
})
export class TarifWahlBeschreibungComponent {

  tarifVariant=TarifVariant;

  constructor(public antragService:AntragService){

  }

}
