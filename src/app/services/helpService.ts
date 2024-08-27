import { AnzalKinder } from "../enums/anzal-kinder"
import { Raucherstatus } from "../enums/raucherstatus"

export interface HelpService {

    getAlterByGeburtsdatum(guburtsdatum:Date):number
    getEnumKeyByEnumValue(enumObj: any, enumValue: any): string | null 
    rechnerBeitragKinder(anzahlKinder:AnzalKinder,hasKinderUnten6:boolean ):number
    rechnerBeitragRaucher(raucherstatus:Raucherstatus ):number
    rechnerBeitragAlter(geburtsDatum:Date):number
}
