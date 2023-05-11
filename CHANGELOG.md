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
