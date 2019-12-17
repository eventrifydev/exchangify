export interface ExchangeRate {
    broj_tecajnice: string
    datum_primjene: string
    drzava: string
    drzava_iso: string
    sifra_valute: string
    valuta: string
    jedinica: number
    kupovni_tecaj: string
    srednji_tecaj: string
    prodajni_tecaj: string
}

export const ExchangeRateHRK: ExchangeRate = {
    broj_tecajnice: "",
    datum_primjene: "",
    drzava: "RH",
    drzava_iso: "CRO",
    sifra_valute: "",
    valuta: "HRK",
    jedinica: 1,
    kupovni_tecaj: "1",
    srednji_tecaj: "1",
    prodajni_tecaj: "1"
}