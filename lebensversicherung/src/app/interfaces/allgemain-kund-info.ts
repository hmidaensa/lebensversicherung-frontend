import { AnzalKinder } from "../enums/anzal-kinder"

export interface AllgemainKundInfo {

    kundnummer:string,
    geburtsDatum:Date
    beruf:string
    anzahlKinder:AnzalKinder 
    raucher:string
}
