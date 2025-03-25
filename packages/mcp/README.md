# Ryanair API

[![NPM version](https://img.shields.io/npm/v/@2bad/ryanair)](https://www.npmjs.com/package/@2bad/ryanair)
[![License](https://img.shields.io/npm/l/@2bad/ryanair)](https://www.npmjs.com/package/@2bad/ryanair)
[![GitHub Build Status](https://img.shields.io/github/actions/workflow/status/2BAD/ryanair/build.yml)](https://github.com/2BAD/ryanair/actions/workflows/build.yml)
[![Code coverage](https://img.shields.io/codecov/c/github/2BAD/ryanair)](https://codecov.io/gh/2BAD/ryanair)
[![Written in TypeScript](https://img.shields.io/github/languages/top/2BAD/ryanair)](https://github.com/2BAD/ryanair/search?l=typescript)
[![Postman Collection](https://img.shields.io/badge/postman-collection-ff6c37)](https://www.postman.com/hakkotsu/workspace/ryanair)

Unofficial TypeScript client for Ryanair's API that provides easy access to flights, fares, and airport information.

## Install

```shell
npm install @2bad/ryanair
```

**Warning:** This package is native [ESM](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) and no longer provides a CommonJS export. If your project uses CommonJS, you will have to [convert to ESM](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c) or use the [dynamic `import()`](https://v8.dev/features/dynamic-import) function. Please don't open issues for questions regarding CommonJS / ESM.

## Usage

```typescript
import { airports, fares, flights } from '@2bad/ryanair'

// Find your nearest airport
const closest = await airports.getClosest()

// Check available flight dates
const dates = await flights.getDates('BER', 'DUB')

// Get cheapest fares for your trip
const deals = await fares.getCheapestPerDay('BER', 'DUB', '2024-02-01')
```

## API Overview

### Airports API
- Get active airports list
- Find nearest airports
- Discover available destinations
- View airport details
- Search flight routes

[View Airports Documentation →](docs/airports.md)

### Fares API
- Find cheapest daily fares
- Compare prices across date ranges
- Discover best round-trip deals
- Search by currency preference

[View Fares Documentation →](docs/fares.md)

### Flights API
- Check flight availability
- View flight schedules
- Search available dates
- Access flight details

[View Flights Documentation →](docs/flights.md)

## Understanding IATA Codes

IATA codes are three-letter identifiers used in aviation for airports worldwide. For example:
- `DUB` - Dublin Airport
- `BER` - Berlin Brandenburg Airport
- `STN` - London Stansted Airport

Find the complete list on [IATA's official website](https://www.iata.org/en/publications/directories/code-search/).

## Disclaimer

This is an unofficial package and is not affiliated with Ryanair. Usage is subject to Ryanair's API terms and conditions.

## Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch
3. Submit a pull request

Please ensure your code passes all tests and follows our coding standards.

## License

MIT © [2BAD](https://github.com/2BAD)

---

Need help? [Open an issue](https://github.com/2BAD/ryanair/issues) or check our [Postman collection](https://www.postman.com/hakkotsu/workspace/ryanair).
