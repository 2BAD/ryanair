# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Breaking Changes

### Added
- New API methods for retrieving flight schedules:
  - `airports.getSchedulesByRoute(from, to)`: Returns a single `Schedule` for a specific route
  - `airports.getSchedulesByPeriod(from, to, year, month)`: Returns a `MonthlySchedule` for a specific period


### Fixed

### Changed

### Removed

## [7.1.2] - 2024-12-22

### Fixed
 - Updated debounce hook to work correctly with new versions of got
 - Made FareType.fareClass optional to match API
 - Added missing README to package (#72)

### Changed
 - Switched from prettier to biome for formatting
 - Updated ESLint config to @2bad/axiom

## [7.1.1] - 2024-06-10

### Fixed

- Fix publishing ci action to run `npm publish` with `--ws` flag

## [7.1.0] - 2024-06-10

### Added

- Add `ryanair-cli` package to monorepo (still wip)
- Add api v3 support for `airports.getActive()` under `airports.getActiveV3()`

### Fixed

- Fix `swc` build breaking bug https://github.com/swc-project/cli/issues/281
- Fix eslint in vscode incorrectly resolving import paths in monorepo
- Fix script name for linting the code (`lint` -> `check:code`)
- Make payload types available for consumers, #70 #71

### Changed

- Move to monorepo setup
- Move package scripts to packages/\*
- Replace dependency `npm-run-all` with `npm-run-all2` v6
- Simplified eslint configuration by switching to `eslint-config-love`
- Use `zod.datetime()` and `zod.date()` for date and time validations
- Align swc target with tsc (`es2022`)

## [7.0.0] - 2024-01-23

### Breaking Changes

- Updated `got` dependency to v14.
- Dropped support for node@18.

### Added

- Implemented `airports.getSchedules` method.
- Implemented `airports.getNearby` method.
- Added renovate for dependency management.
- Pinned npm version and added section for corepack.
- Added tests for extractCoordinates helper.
- Added postman badge with a link to the collection.

### Changed

- Now reports unused disable directives while using eslint.
- `getFirstDayOfEachMonthInRange` now throws a `RangeError` if the end date is before the start date.
- Will no longer try to match snapshots on dynamic values.
- Updated dependencies.

## [6.0.1] - 2023-11-03

### Fixed

- Addressed an issue where both `swc` and `tsc` were generating module specifiers with the `.ts` extension by utilizing the `fix-ext.sh` script

## [6.0.0] - 2023-10-31

### Breaking Changes

- Rolled back to `got` based client since cookie modification is impossible with `fetch`.
- Prefixed methods that require multiple API calls and computations with `find...`:
  - `getCheapestRoundTrip()` -> `findCheapestRoundTrip()`
  - `getDailyFaresInRange()` -> `findDailyFaresInRange()`

### Added

- Implemented debounce to limit requests at a rate of 100 per minute.
- Added `airports.findRoutes()` - to find available routes between two airports.
- Added `airports.calculateDistance()` - calculates distance between two geo points using the haversine formula.

### Fixed

- Used spoofed cookie value to circumvent API restrictions.

## [5.0.0] - 2023-07-20

### Breaking Changes

- Removed `got` HTTP client dependency. This was previously used for cookie spoofing, which is no longer required.
- Support for node@16 has been dropped as it has reached its End of Life (EOL).

## [4.0.0] - 2023-06-23

### Breaking Changes

- The `airports.searchByPhrase` and `airports.searchByRoute` methods have been removed as the `autocomplete` endpoint can no longer be publicly accessed.

### Added

- The `fares.getCheapestRoundTrip` method has been added, which finds the cheapest round trip fares for a given route and date range in a specific currency.

### Changed

- TypeScript compilation has been switched from `tsc` to `swc`.
- Paths have been updated to conform with the esm module resolution specification.
- `allowImportingTsExtensions` has been set to true.
- Dependencies have been updated.

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
- Helper function to generate tomorrow date for tests [8719967](https://github.com/2BAD/ryanair/commit/87199676f87df57d7626f4fe39740f2abe36c52a)

### Fixed

- `CheapestFares.outbound.minFare` and `...maxFare` can be null [86d49f2](https://github.com/2BAD/ryanair/commit/86d49f21f24c1d846bd138a72679cf791ec7a611)
- `FareType` can be undefined [0abff91](https://github.com/2BAD/ryanair/commit/0abff91974ffe5957d4598799a08abaf47ace067)

### Changed

- Updated headings in documentation and some other cosmetic changes
- Changed prettier printWidth to 120 symbols
- Set tests timeouts for `vitest` to 30 seconds
- Unify origin and destination airports for testing purposes [f72af1b](https://github.com/2BAD/ryanair/commit/f72af1be09c7d697bbd18951d923e6c5fe0addd6)

## [1.0.0] - 2023-04-14

[unreleased]: https://github.com/2BAD/ryanair/compare/v7.1.1...HEAD
[7.1.1]: https://github.com/2BAD/ryanair/compare/v7.1.0...v7.1.1
[7.1.0]: https://github.com/2BAD/ryanair/compare/v7.0.0...v7.1.0
[7.0.0]: https://github.com/2BAD/ryanair/compare/v6.0.1...v7.0.0
[6.0.1]: https://github.com/2BAD/ryanair/compare/v6.0.0...v6.0.1
[6.0.0]: https://github.com/2BAD/ryanair/compare/v5.0.0...v6.0.0
[5.0.0]: https://github.com/2BAD/ryanair/compare/v4.0.0...v5.0.0
[4.0.0]: https://github.com/2BAD/ryanair/compare/v3.0.0...v4.0.0
[3.0.0]: https://github.com/2BAD/ryanair/compare/v2.0.0...v3.0.0
[2.0.2]: https://github.com/2BAD/ryanair/compare/v2.0.1...v2.0.2
[2.0.1]: https://github.com/2BAD/ryanair/compare/v2.0.0...v2.0.1
[2.0.0]: https://github.com/2BAD/ryanair/compare/v1.0.0...v2.0.0
[1.0.0]: https://github.com/2BAD/ryanair/releases/tag/v1.0.0
