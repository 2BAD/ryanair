# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Breaking Changes

### Added

### Fixed

### Changed

### Removed

## [3.0.0] - 2023-05-20

### Breaking Changes

- The method `fares.cheapestPerDay()` has been renamed to `fares.getCheapestPerDay()`. This change was made to maintain consistency across all other methods.

### Added

- A new method, fares.getDailyFaresInRange(), has been included.
- Various utility methods to work with dates using date-fns.
- Renovate config has been configured to update dependencies every week automatically.
- Eslint plugins have been added to validate jsdoc blocks and tests.

### Fixed

- A separate tsconfig has been added for build purposes to avoid shipping test files with builds.

### Changed

- Dev dependencies have been updated and cleaned up

## [2.0.2] - 2023-05-11

### Fixed

- Add missing `mkt` cookie
- Set `user-agent` header to valid browser

## [2.0.1] - 2023-05-10

### Fixed

- Resolved `ERR_UNSUPPORTED_DIR_IMPORT` error for module import by resolving full path in build output with `tsc-alias`

## [2.0.0] - 2023-05-08

### Breaking Changes

- The replacement of `fetch` with `got` resulted in the loss of support for browsers.

### Added

- CHANGELOG.md file in the repository
- Retrieve and retain necessary cookies to access specific API endpoints
- Helper function to generate tomorrow date for tests 87199676f87df57d7626f4fe39740f2abe36c52a

### Fixed

- `CheapestFares.outbound.minFare` and `...maxFare` can be null 86d49f21f24c1d846bd138a72679cf791ec7a611
- `FareType` can be undefined 0abff91974ffe5957d4598799a08abaf47ace067

### Changed

- Updated headings in documentation and some other cosmetic changes
- Changed prettier printWidth to 120 symbols
- Set tests timeouts for `vitest` to 30 seconds
- Unify origin and destination airports for testing purposes f72af1be09c7d697bbd18951d923e6c5fe0addd6

## [1.0.0] - 2017-04-14

[unreleased]: https://github.com/2BAD/ryanair/compare/v2.0.0...HEAD
[2.0.0]: https://github.com/2BAD/ryanair/compare/v1.0.0...v2.0.0
[1.0.0]: https://github.com/2BAD/ryanair/releases/tag/v1.0.0
