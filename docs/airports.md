# Airports API

Source code: [`source/airports/`](../source/airports/)

- [Airports API](#airports-api)
  - [getActive()](#getactive)
  - [getClosest()](#getclosest)
  - [getDestinations(code: IataCode)](#getdestinationscode-iatacode)
  - [getInfo(code: IataCode)](#getinfocode-iatacode)
  - [findRoutes(from: IataCode, to: IataCode)](#findroutesfrom-iatacode-to-iatacode)

## <code>getActive()</code>

Retrieves a list of all active airports.

**Returns: `Promise<Airport[]>`**

```typescript
import { airports } from '@2bad/ryanair'

const airports = await airports.getClosest()
```

## <code>getClosest()</code>

Returns information about the closest airport based on the user's IP address.

**Returns: `Promise<AirportShort>`**

```typescript
import { airports } from '@2bad/ryanair'

const airport = await airports.getClosest()
```

## <code>getDestinations(code: IataCode)</code>

Returns a list of available destinations from an airport.

- **code: IataCode** - The IATA code of the airport.

**Returns: `Promise<Destination[]>`**

```typescript
import { airports } from '@2bad/ryanair'

const destinations = await airports.getDestinations('BER')
```

## <code>getInfo(code: IataCode)</code>

Returns information about an airport.

**code: IataCode** - The IATA code of the airport.

**Returns: `Promise<Airport>`**

```typescript
import { airports } from '@2bad/ryanair'

const info = await airports.getInfo('BER')
```

## <code>findRoutes(from: IataCode, to: IataCode)</code>

Finds available routes between two airports.

**from: IataCode** - The departure airport IATA code.
**to: IataCode** - The arrival airport IATA code.

**Returns: `Promise<IataCode[][]>`**

```typescript
import { airports } from '@2bad/ryanair'

const routes = await airports.findRoutes('BER', 'GDN') // [["BER", "AGP", "GDN"], [ "BER", "ALC", "GDN",], ...]
```
