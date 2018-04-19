# Circus Tours API
## Mongo/mongoose Half Stack app built as a student exercise for Alchemy Code Lab

## Author: Charly Welch
<blwbiology@gmail.com>

## Description
Save tours to a mongo database. Tours have the following schema:
- title (required)
- activities (array of strings)
- launchDate (defaults to current)
- stops
    - location
        - city
        - state (must be a valid two letter abbreviation)
        - zip code (string)
    - weather
        - temperature
        - 
    - attendance (number)
- _id (added by MongoDB)

### Routes:
- `/` post a tour, get all tours, 
- `/:id` get, update, delete a tour
- `/:id/stops` post a stop to a tour
- `/:id/stops/:stopId` update or delete a stop from a tour


## Dependencies:
- chai
- chai-http
- eslint
- mocha
- nodemon
- dotenv
- express
- mongoose
- superagent