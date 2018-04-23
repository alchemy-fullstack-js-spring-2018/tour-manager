require('dotenv').config({ path: './.env' });
const request = require('superagent');
const apiKey = process.env.WU_API_KEY;

const getLocation = (zip) => `http://api.wunderground.com/api/${apiKey}/conditions/q/${zip}.json`;
const getWeather = (zip) => `http://api.wunderground.com/api/${apiKey}/conditions/q/${zip}.json`;

const processLocationData = data => {
    return {
        city: data.current_observation.display_location.city,
        state: data.current_observation.display_location.state
    };
};

const processWeatherData = data => {
    return {
        temperature: data.current_observation.temp_f,
        wind: data.current_observation.wind_string,
        percipitation: data.current_observation.precip_today_in
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