const request = require('superagent');
const apiKey = process.env.WU_API_KEY;

const getLocation = zip => `http://api.wunderground.com/api/${apiKey}/conditions/q/${zip}.json`;
const getWeather = zip => `http://api.wunderground.com/api/${apiKey}/wu/astronomy/hourly/q/${zip}.json`;

const processLocationData = data => {
    return {
        city: data.current_observation.display_location.city,
        state: data.current_observation.display_location.state
    };
};

const processWeatherData = data => {
    return {
        temperature: data.hourly_forecast[0].temp.english,
        condition: data.hourly_forecast[0].condition,
        sunset: `${data.sun_phase.sunset.hour}:${data.sun_phase.sunset.minute}`
    };
};

const get = url => request.get(url).then(res => res.body);

module.exports = zip => {
    return Promise.all([
        get(getLocation(zip)).then(processLocationData),
        get(getWeather(zip)).then(processWeatherData)
    ])
        .then(([location, weather]) => {
            return { location, weather };
        });
};