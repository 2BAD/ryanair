## Flights API

Source code: [`source/flights/index.ts`](../source/flights/index.ts)

- [Flights API](#flights-api)
  - [getDates(from: IataCode, to: IataCode)](#getdatesfrom-iatacode-to-iatacode)
  - [getAvailable(params: Partial<AvailabilityOptions>)](#getavailableparams-partial)

### <code>getDates(from: IataCode, to: IataCode)</code>

Returns a list of available flight dates between two airports

- **from: IataCode** - The IATA code of the departure airport
- **to: IataCode** - The IATA code of the arrival airport

**Returns: `Promise<StrDate[]>`**

```typescript
import { flights } from '@2bad/ryanair'

const from = 'DUB' // Dublin airport
const to = 'LTN' // London Luton airport

const airports = await flights.getDates(from, to)
```

### <code>getAvailable(params: Partial<AvailabilityOptions>)</code>

Returns the list of available flights between two airports based on the provided options. It accepts a partial object of type AvailabilityOptions for specifying the search criteria. The properties of the object are explained below:

- **ADT: number** (default is 1) - Number of adults
- **CHD: number** (default is 0) - Number of children
- **DateIn: string** - Date of incoming flight in YYYY-MM-DD format (default is empty string)
- **DateOut: string** - Date of outgoing flight in YYYY-MM-DD format (default is set to January 24, 2023)
- **Destination: IataCode** - IATA code of destination airport (default is set to BRU)
- **Disc: string** (default is 0) - Discount amount
- **INF: number** (default is 0) - Number of infants
- **Origin: IataCode** - IATA code of the origin airport (default is set to BER)
- **TEEN: number** - Number of teenagers (default is 0)
- **promoCode: string** - Promotional code (default is empty string)
- **IncludeConnectingFlights: string** (default is set to false) - Boolean value to include connecting flights
- **FlexDaysBeforeOut: number** (default is 2) - Number of days for outbound flex search before the selected date
- **FlexDaysOut: number** (default is 2) - Number of days for outbound flex search after the selected date
- **FlexDaysBeforeIn: number** (default is 2) - Number of days for inbound flex search before the selected date
- **FlexDaysIn: number** (default is 2) - Number of days for inbound flex search after the selected date
- **RoundTrip: string** (default is set to false) - Boolean value to get return flight
- **ToUs: string** (default is set to `AGREED`) - String value indicating acceptance of terms & conditions

- **from: IataCode** - The IATA code of the departure airport
- **to: IataCode** - The IATA code of the arrival airport

**Returns: `Promise<AvailabilityResponse>`**

```typescript
import { flights } from '@2bad/ryanair'

const options = {
  ADT: '1',
  DateOut: '2023-01-24',
  Origin: 'DUB', // Dublin airport
  Destination: 'LTN' // London Luton airport
}

const airports = await flights.getAvailable(options)
```
