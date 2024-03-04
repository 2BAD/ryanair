# Airports API

Source code: [`source/airports/`](../source/airports/)

- [Airports API](#airports-api)
  - [getActive()](#getactive)
  - [getActiveV3()](#getactivev3)
  - [getClosest()](#getclosest)
  - [getDestinations(code: IataCode)](#getdestinationscode-iatacode)
  - [getInfo(code: IataCode)](#getinfocode-iatacode)
  - [getNearby()](#getnearby)
  - [getSchedules()](#getschedules)
  - [findRoutes(from: IataCode, to: IataCode)](#findroutesfrom-iatacode-to-iatacode)

## <code>getActive()</code>

Retrieves a list of all active airports.

**Returns: `Promise<Airport[]>`**

```typescript
import { airports } from '@2bad/ryanair'

const airports = await airports.getActive()
```

## <code>getActiveV3()</code>

Retrieves a list of all active airports.

**Returns: `Promise<AirportV3[]>`**

```typescript
import { airports } from '@2bad/ryanair'

const airports = await airports.getActiveV3()
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

## <code>getNearby()</code>

Returns information about the nearby airports based on the user's IP address.

**Returns: `Promise<AirportShort[]>`**

```typescript
import { airports } from '@2bad/ryanair'

const airports = await airports.getNearby()
```

## <code>getSchedules()</code>

Returns a list of available flight schedules departing from an airport.

**Returns: `Promise<Schedules>`**

```typescript
import { airports } from '@2bad/ryanair'

const schedules = await airports.getSchedules()
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
