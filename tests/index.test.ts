import { exchange, rates, rate, rateByISO } from "../src/index"
import { expect } from "chai"
import { ExchangeRate } from "../src/ExchangeRate"

describe("ExchangifyTest", () => {

    let exchangeRates: ExchangeRate[] = <any>[]
    
    before(async () => {
        exchangeRates = await rates()
    })

    it("exchange() should return converted value > 0", async () => {
        const rateEURtoHRK = await exchange(10, "EUR", "HRK")
        expect(rateEURtoHRK).to.be.greaterThan(0)
        const rateEURtoUSD = await exchange(10, "EUR", "USD")
        expect(rateEURtoUSD).to.be.greaterThan(0)
        const rateHRKtoEUR = await exchange(1, "HRK", "EUR")
        expect(rateHRKtoEUR).to.be.lessThan(1)
        const rateUSDtoEUR = await exchange(1, "USD", "EUR")
        expect(rateUSDtoEUR).to.be.lessThan(1)
    })

    it("exchange() should return 'amount' if 'from' === 'to'", async () => {
        const amount = 10
        const rate = await exchange(amount, "HRK", "HRK")
        expect(rate).to.equal(amount)
    })

    it("exchange() should return exact value for 'fixedRate'", async () => {
        const amount = 10, fixedRate = 7
        const rate = await exchange(amount, "HRK", "EUR", fixedRate)
        expect(rate).to.equal(amount / fixedRate)
    })

    it("rates() should return exchange rates including HRK", async () => {
        expect(exchangeRates).not.null
        expect(exchangeRates).not.empty
        const exchangeRate = exchangeRates[exchangeRates.length - 1]
        expect(exchangeRate.valuta).to.be.equal("HRK")
        expect(exchangeRate.srednji_tecaj).to.be.equal("1")
    })

    it("rate() should return middle exchange rate", async () => {
        const middleExchangeRateHRKtoEUR = await rate("HRK", "EUR")
        expect(middleExchangeRateHRKtoEUR).to.be.a("number")
        expect(middleExchangeRateHRKtoEUR).to.be.greaterThan(1)
        const middleExchangeRateEURtoHRK = await rate("EUR", "HRK")
        expect(middleExchangeRateEURtoHRK).to.be.a("number")
        expect(middleExchangeRateEURtoHRK).to.be.lessThan(1)
    })

    it("rateByISO() should return middle exchange rate for EUR", async () => {
        const exchangeRate = rateByISO("EUR", exchangeRates)
        expect(exchangeRate).to.be.a("number")
    })

    it("rateByISO() should throw error if currency not supported", async () => {
        let e = new Error("Bad error")
        const currency = "BLA"
        try {
            rateByISO(currency, exchangeRates)
        } catch (error) {
            e = error
        }
        expect(e.message).to.equal(`Currency '${currency}' is not supported`)
    })
})