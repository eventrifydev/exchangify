import http, { IncomingMessage } from "http"
import { ExchangeRate, ExchangeRateHRK } from "./ExchangeRate"

export async function exchange(amount: number, from: string, to: string, fixedRate?: number): Promise<number> {
    if (from === to) return amount
    if (fixedRate) return amount / fixedRate
    const exchangeRates = await rates()
    const rateFrom = rateByISO(from, exchangeRates)
    const rateTo = rateByISO(to, exchangeRates)
    return (amount / rateTo) * rateFrom
}

export function rates(): Promise<ExchangeRate[]> {
    return new Promise((resolve, reject) => {
        http.get("http://api.hnb.hr/tecajn/v2", (res: IncomingMessage) => {
            let data = ""
            res.on("data", (chunk) => {
                data += chunk
            })
            res.on("end", () => {
                const response = JSON.parse(data) as ExchangeRate[]
                response.push(ExchangeRateHRK)
                resolve(response)
            })
        }).on("error", (error) => {
            reject(error)
        })
    })
}

export async function rate(from: string, to: string): Promise<number> {
    const exchangeRates = await rates()
    const rateFrom = rateByISO(from, exchangeRates)
    const rateTo = rateByISO(to, exchangeRates)
    return (1 / rateFrom) * rateTo
}

export function rateByISO(currencyIso: string, exchangeRates: ExchangeRate[]): number {
    const exchangeRate = exchangeRates.find(v => v.valuta === currencyIso)
    if (!exchangeRate || !exchangeRate.srednji_tecaj) {
        throw new Error(`Currency '${currencyIso}' is not supported`)
    }
    return parseFloat(exchangeRate.srednji_tecaj.replace(",", "."))
}
