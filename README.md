
# Exchangify

<br/>
<img src="https://res.cloudinary.com/disqnsnwa/image/upload/v1526634764/exchangify_logo.png" alt="My cool logo" width="200" height="200" />
<br/>

Simple, **100% free** and tiny JavaScript library for realtime currency conversion and exchange rate calculation, from any currency, to any currency.

**exchangify** is integrated with [Croatian National Bank API](https://api.hnb.hr/). 

**NOTE:** The exchange rate is in HRK

### Install

```
npm i exchangify
```

### Example

```
import { exchange } from "exchangify"

// convert EUR to HRK
const convertedAmount: number = await exchange(10, "EUR", "HRK")

// convert EUR to HRK with fixedRate
const convertedAmount: number = await exchange(amount, "HRK", "EUR", 7)
```

### Functions
```
exchange(amount: number, from: string, to: string, fixedRate?: number): Promise<number>
```
**amount**: amount to convert<br>
**from**: currency ISO 4217 standard<br>
**to**: currency ISO 4217 standard<br>
**fixedRate?**: used if you want to use fixed rate, leave empty instead<br>
**returns**: converted amount <br>
<br><br>
```
rates(): Promise<ExchangeRate[]>
```
**returns**: ExchangeRate[]

see [ExchangeRate](https://github.com/eventrifydev/exchangify/blob/master/src/ExchangeRate.ts)
<br><br>
```
rate(from: string, to:string): Promise<number>
```
**from**: currency ISO 4217 standard<br>
**to**: currency ISO 4217 standard<br>
**returns**: exchange rate for 'from' and 'to'<br>
<br>
<br>
### Dependencies
None.

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.


## Authors

* **Pavle Andrić, [Eventrify Ltd.](https://get2.events)**

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

