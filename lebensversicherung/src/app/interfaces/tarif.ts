import { Periode } from "../enums/periode";
import { TarifVariant } from "../enums/tarif-variant";

export interface Tarif {

    tarifVariant:TarifVariant
    versicherungssumme :number
    zeitraum :number
    versichertAb:number
    zahlungPeriode:Periode

}
