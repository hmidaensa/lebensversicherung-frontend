 import { AllgemainKundInfo } from "./allgemain-kund-info"
import { Tarif } from "./tarif"
 
export interface AntragLebensVersicherung {
    antragsNummer?:string
    allgemainKundInfo?:AllgemainKundInfo
    tarif?:Tarif
}
