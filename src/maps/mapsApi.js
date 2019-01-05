// * Will Contain the API methods for google maps
// * Will use the Google Maps API.
const path = require('path');
const axios = require('axios');
require('dotenv').config({ path: path.join(__dirname, '../../variables.env') });

const BASE_URL = 'https://maps.googleapis.com/maps/api/place/textsearch/json?';
const API_KEY = process.env.GMAPS_API_KEY;

const urlBuilder = query => {
  return `${BASE_URL}${query}&fields=photos,formatted_address,name&key=${API_KEY}`;
};

exports.searchGoogle = async (searchArea, placeCategory) => {
  const searchTerm = `${placeCategory} in ${searchArea}`;
  const formattedSearchTerm = searchTerm.split(' ').join('+');
  const currQuery = `query=${formattedSearchTerm}`;
  const finalPostUrl = urlBuilder(currQuery);
  axios
    .get(finalPostUrl, {
      method: 'get'
    })
    .then(res => {
      console.log(res.data.results);
    })
    .catch(err => {
      console.error(err);
    });
};
