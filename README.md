# Ryanair API

[![NPM version](https://img.shields.io/npm/v/@2bad/ryanair)](https://www.npmjs.com/package/@2bad/ryanair)
[![License](https://img.shields.io/npm/l/@2bad/ryanair)](https://www.npmjs.com/package/@2bad/ryanair)
[![GitHub Build Status](https://img.shields.io/github/actions/workflow/status/2BAD/ryanair/integration.yml)](https://github.com/2BAD/ryanair/actions/workflows/integration.yml)
[![Code coverage](https://img.shields.io/codecov/c/github/2BAD/ryanair)](https://codecov.io/gh/2BAD/ryanair)
[![Written in TypeScript](https://img.shields.io/github/languages/top/2BAD/ryanair)](https://github.com/2BAD/ryanair/search?l=typescript)

Unofficial typescript client for the Ryanair API that allows you to easily retrieve information about airports, flights and prices.

## ✨ Features

- 🔥 No bullshit
- 📝 Strongly typed methods and results
- 🍪 Handles cookies and sessions automatically
- 🔍 Endpoint specific functions for convenience

## Install

```shell
npm install @2bad/ryanair
```

**Warning:** This package is native [ESM](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) and no longer provides a CommonJS export. If your project uses CommonJS, you will have to [convert to ESM](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c) or use the [dynamic `import()`](https://v8.dev/features/dynamic-import) function. Please don't open issues for questions regarding CommonJS / ESM.

## Usage

```typescript
import { airports, fares, flights } from '@2bad/ryanair'

// Get information about the closest airport based on your IP address
const airport = await airports.getClosest()

// Get a list of available dates from a specific destination
const dates = await flights.getDates('BER', 'DUB')

// Or the cheapest one-way fares between two airports for a given start date
const cheapest = await fares.getCheapestPerDay('BER', 'DUB', '2023-10-10')
```

## API

- [Airports](docs/airports.md#airports-api)
  - [getActive](docs/airports.md#getactive)
  - [getClosest](docs/airports.md#getclosest)
  - [getDestinations](docs/airports.md#getdestinationscode-iatacode)
  - [getInfo](docs/airports.md#getinfocode-iatacode)
  - [findRoutes(from: IataCode, to: IataCode)](docs/airports.md#findroutesfrom-iatacode-to-iatacode)
- [Fares](docs/fares.md#fares-api)
  - [getCheapestPerDay](docs/fares.md#getcheapestperdayfrom-iatacode-to-iatacode-startdate-strdate-currency--eur)
  - [findDailyFaresInRange](docs/fares.md#findDailyFaresInRangefrom-iatacode-to-iatacode-startdate-strdate-enddate-strdate-currency--eur)
  - [findCheapestRoundTrip](docs/fares.md#findcheapestroundtripfrom-iatacode-to-iatacode-startdate-strdate-enddate-strdate-currency--eur-limit--10)
- [Flights](docs/flights.md#flights-api)
  - [getDates](docs/flights.md#getdatesfrom-iatacode-to-iatacode)
  - [getAvailable](docs/flights.md#getavailableparams-partial)

## IATA codes

IATA codes are three-letter codes used by the International Air Transport Association (IATA) to identify airports, airlines, and other entities in the aviation industry. These codes are used primarily for ticketing, scheduling, and other administrative purposes.

Airport codes are the most common type of IATA code. They consist of three letters, with the first two letters representing the country and the third letter representing the airport. For example, LAX is the IATA code for Los Angeles International Airport in the United States.

For a full list of available IATA codes, please visit this [page](https://www.iata.org/en/publications/directories/code-search/).

## Error handling

Each function throws an Error if the request to the API fails or the response is invalid. Make sure to handle them or use try-catch statement.

## Disclaimer

Please note that this is not an official library and has no affiliation with Ryanair. The wrapper is based on publicly available API, terms of use and limitations of the Ryanair API apply.

## Contributing

We welcome contributions! If you find a bug or want to request a new feature, please open an issue. If you want to submit a bug fix or new feature, please open a pull request.
