 import { AllgemainKundInfo } from "./allgemain-kund-info"
import { TarifVariant } from "./tarif-variant"

export interface AntragLebensVersicherung {
    antragsNummer?:string
    allgemainKundInfo?:AllgemainKundInfo
    tarifVariant?:TarifVariant
}
