# Ryanair API Wrapper

This is a small library that wraps the Ryanair API and allows you to easily retrieve information about airports, flights and prices.

## Getting Started

```console
npm install @2bad/ryanair
```

## Usage

```typescript
import { getClosestAirport } from '@2bad/ryanair'

// Get information about the closest airport based on your IP address
const airport = await getClosestAirport()

// Get a list of available dates from a specific destination
const dates = await getFlightsDates(from: 'WRO', to: 'DUB')

// Or the cheapest one-way fares between two airports for a given start date
const fares = await cheapestPerDay(from: 'WRO', to: 'DUB', startDate: '2022-10-10')
```

For more information and available functions, please refer to the documentation in the source code.

## Error handling

Each function throws an Error if the request to the API fails or the response is invalid. Make sure to handle them or use try-catch statement.

## Disclaimer

Please note that this is not an official library and has no affiliation with Ryanair. The wrapper is based on publicly available API, terms of use and limitations of the Ryanair API apply.

## Contributing

We welcome contributions! If you find a bug or want to request a new feature, please open an issue. If you want to submit a bug fix or new feature, please open a pull request.
