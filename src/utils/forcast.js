const request = require("request");

const forcast = (longitude, latitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=d3532c04f102c3d6bd4d05d0ffb7453f&query=${latitude},${longitude}`;
  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to conect", undefined);
    } else if (response.body.error) {
      callback("Unable to find location", undefined);
    } else {
      callback(
        undefined,
        `There is ${response.body.current.temperature} degrees out and it feels like ${response.body.current.feelslike} deegrees.`
      );
    }
  });
};

module.exports = forcast;
