# Ryanair API

[![NPM version](https://img.shields.io/npm/v/@2bad/ryanair)](https://www.npmjs.com/package/@2bad/ryanair)
[![License](https://img.shields.io/npm/l/@2bad/ryanair)](https://www.npmjs.com/package/@2bad/ryanair)
[![Code coverage](https://img.shields.io/codecov/c/github/2BAD/ryanair)](https://codecov.io/gh/2BAD/ryanair)
[![GitHub Build Status](https://img.shields.io/github/actions/workflow/status/2BAD/ryanair/integration.yml)](https://github.com/2BAD/ryanair/actions/workflows/integration.yml)
[![Written in TypeScript](https://img.shields.io/github/languages/top/2BAD/ryanair)](https://github.com/2BAD/ryanair/search?l=typescript)

Unofficial typescript client for the Ryanair API that allows you to easily retrieve information about airports, flights and prices.

## ✨ Features

- 🔥 No bullshit
- 📝 Strongly typed methods and results
- 💻 Isomorphic, runs on browsers and node
- 🚀 Native fetch API support
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
const cheapest = await fares.cheapestPerDay('BER', 'DUB', '2023-10-10')
```

## API

- [Airports](docs/airports.md#airports-api)
  - [getActive()](docs/airports.md#getactive)
  - [getClosest()](docs/airports.md#getclosest)
  - [getDestinations(code: IataCode)](docs/airports.md#getdestinationscode-iatacode)
  - [getInfo(code: IataCode)](docs/airports.md#getinfocode-iatacode)
  - [searchByPhrase(phrase: string, locale = 'en-gb')](docs/airports.md#searchbyphrasephrase-string-locale--en-gb)
  - [searchByRoute(from: string, to = '', locale = 'en-gb')](docs/airports.md#searchbyroutefrom-string-to---locale--en-gb)
- [Fares](docs/fares.md#fares-api)
  - [cheapestPerDay(from: IataCode, to: IataCode, startDate: StrDate, currency = 'EUR')](docs/fares.md#cheapestperdayfrom-iatacode-to-iatacode-startdate-strdate-currency--eur)
- [Flights](docs/flights.md#flights-api)
  - [getDates(from: IataCode, to: IataCode)](docs/flights.md#getdatesfrom-iatacode-to-iatacode)
  - [getAvailable(params: Partial<AvailabilityOptions>)](docs/flights.md#getavailableparams-partial)

## Error handling

Each function throws an Error if the request to the API fails or the response is invalid. Make sure to handle them or use try-catch statement.

## Disclaimer

Please note that this is not an official library and has no affiliation with Ryanair. The wrapper is based on publicly available API, terms of use and limitations of the Ryanair API apply.

## Contributing

We welcome contributions! If you find a bug or want to request a new feature, please open an issue. If you want to submit a bug fix or new feature, please open a pull request.
