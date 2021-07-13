const request = require("request");

const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1Ijoibm5ubm5ubm5ubm4iLCJhIjoiY2txbndxMTRsMGhnNjJ3bnBlOTRxZHZmMSJ9.SshCRScjXtetAKTM0vzV3w&limit=1";

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to conect", undefined);
    } else if (response.body.features.length === 0) {
      callback("Unable to find location", undefined);
    } else {
      callback(undefined, {
        latitude: response.body.features[0].center[1],
        longitude: response.body.features[0].center[0],
        location: response.body.features[0].text,
      });
    }
  });
};

module.exports = geocode;
