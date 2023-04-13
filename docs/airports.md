# Airports API

### getActive()

Retrieves a list of all active airports.

Returns: **Promise<Airport[]>**

### getClosest()

Returns information about the closest airport based on the user's IP address.

Returns: **Promise<AirportShort>**

### getDestinations(code: IataCode)

Returns a list of available destinations from an airport.

**code: IataCode** - The IATA code of the airport.

Returns: **Promise<Destination[]>**

### getInfo(code: IataCode)

Returns information about an airport.

**code: IataCode** - The IATA code of the airport.

Returns: **Promise<Airport>**

### searchByPhrase(phrase: string, locale = 'en-gb')

Searches for airports matching the given phrase.

**phrase: string** - The search phrase to use when looking up airports.
**locale: string** (optional, defaults to 'en-gb') - The locale to use when looking up airports.

Returns: **Promise<AirportShort[]>**

### searchByRoute(from: string, to = '', locale = 'en-gb')

Searches for airports with available routes from the departure phrase to the arrival phrase.

**from: string** - The starting location to use when looking up routes. This can be an airport name, city, or country.
**to: string** (optional, defaults to '') - The landing location to use when looking up routes. This can be an airport name, city, or country.
**locale: string** (optional, defaults to 'en-gb') - The locale to use when looking up routes.

Returns: **Promise<AirportConnection[]>**
