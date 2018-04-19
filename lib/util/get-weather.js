// require('dotenv').config({ PATH: '../../.env' });
const request = require('superagent');
const apiKey = process.env.WU_API_KEY || 'c0b68d5f7204ddc1';

if(!apiKey) {
    console.log('No API key present!');
    process.exit(1);
}

const getData = (zip) => `http://api.wunderground.com/api/${apiKey}/conditions/q/${zip}.json`;
// const getWeather = zip => `http://api.wunderground.com/api/${apiKey}/wu/astronomy/hourly/q/${zip}.json`;

function processWeatherData(data) {
    return {
        temperature: data.current_observation.temp_f,
        wind: data.current_observation.wind_string,
        percipitation: data.current_observation.precip_today_in,
    }; 
}

function processLocationData(data) {
    return {
        city: data.current_observation.display_location.city,
        state: data.current_observation.display_location.state
    };
}

const get = url => request.get(url).then(res => res.body);

module.exports = function getData(zip) {
    return Promise.all([
        get(getData(zip)).then(processWeatherData),
        get(getData(zip)).then(processLocationData)
    ]).then(([weather, location]) => {
        return { weather, location };
    });
};