import { AnzalKinder } from "../enums/anzal-kinder"
import { Raucherstatus } from "../enums/raucherstatus"

export interface AllgemainKundInfo {

    kundnummer:string,
    geburtsDatum:Date
    beruf:string
    anzahlKinder:AnzalKinder 
    raucher:Raucherstatus
    seaugling:boolean// baby under 6 monath
    geburtsDatum6:Date
    vornamBaby:string

}
