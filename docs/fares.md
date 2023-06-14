# Fares API

Source code: [`source/fares/`](../source/fares/)

- [Fares API](#fares-api)
  - [getCheapestPerDay(from: IataCode, to: IataCode, startDate: StrDate, currency = 'EUR')](#getcheapestperdayfrom-iatacode-to-iatacode-startdate-strdate-currency--eur)
  - [getDailyFaresInRange(from: IataCode, to: IataCode, startDate: StrDate, endDate: StrDate, currency = 'EUR')](#getdailyfaresinrangefrom-iatacode-to-iatacode-startdate-strdate-enddate-strdate-currency--eur)
  - [getCheapestRoundTrip(from: IataCode, to: IataCode, startDate: StrDate, endDate: StrDate, currency = 'EUR', limit = 10)](#findcheapestroundtripfrom-iatacode-to-iatacode-startdate-strdate-enddate-strdate-currency--eur-limit--10)

## <code>getCheapestPerDay(from: IataCode, to: IataCode, startDate: StrDate, currency = 'EUR')</code>

Searches for cheapest one-way fares between two airports for a given month

- **from: IataCode** - The IATA code of the departure airport
- **to: IataCode** - The IATA code of the arrival airport
- **startDate: string** - The start date for the search in the format "YYYY-MM-DD"
- **currency: string** (optional, defaults to 'EUR') - The currency to use for the fares.

**Returns: `Promise<CheapestFares>`**

```typescript
import { fares } from '@2bad/ryanair'

const from = 'DUB' // Dublin airport
const to = 'LTN' // London Luton airport
const startDate = '2024-01-01'
const currency = 'EUR'

const fares = await fares.getCheapestPerDay(from, to, startDate, currency)
```

## <code>getDailyFaresInRange(from: IataCode, to: IataCode, startDate: StrDate, endDate: StrDate, currency = 'EUR')</code>

Retrieve daily fares for a given origin and destination airport, within a specified date range.

- **from: IataCode** - The IATA code of the departure airport
- **to: IataCode** - The IATA code of the arrival airport
- **startDate: string** - The start date for the search in the format "YYYY-MM-DD"
- **endDate: string** - The end date of the search range in the format "YYYY-MM-DD"
- **currency: string** (optional, defaults to 'EUR') - The currency to use for the fares.

**Returns: `Promise<Fare[]>`**

```typescript
import { fares } from '@2bad/ryanair'

const from = 'DUB' // Dublin airport
const to = 'LTN' // London Luton airport
const startDate = '2024-01-01'
const endDate = '2024-06-01'
const currency = 'EUR'

const fares = await fares.getDailyFaresInRange(from, to, startDate, endDate, currency)
```

## <code>getCheapestRoundTrip(from: IataCode, to: IataCode, startDate: StrDate, endDate: StrDate, currency = 'EUR', limit = 10)</code>

Finds the cheapest round trip fares for a given route and date range in a specific currency

- **origin** - The IATA code of the origin airport
- **destination** - The IATA code of the destination airport
- **startDate** - The start date for the search in the format "YYYY-MM-DD"
- **endDate** - The end date of the search range in the format "YYYY-MM-DD"
- **currency** (optional, defaults to 'EUR') - The currency to use for pricing
- **limit** (optional, defaults to '10') - The maximum number of round trip fares to return

**Returns: `Promise<RoundTrip[]>`**

```typescript
import { fares } from '@2bad/ryanair'

const from = 'DUB' // Dublin airport
const to = 'LTN' // London Luton airport
const startDate = '2024-01-01'
const endDate = '2024-06-01'
const currency = 'EUR'
const limit = 10

const trips = await fares.getCheapestRoundTrip(from, to, startDate, endDate, currency, limit)
```
