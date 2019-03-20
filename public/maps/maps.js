// * Will Contain the API methods for google maps
// * Will use the Google Maps API.
const path = require('path');
const axios = require('axios');
const settings = require('electron-settings');

const BASE_URL = 'https://maps.googleapis.com/maps/api/place/textsearch/json?';
const DETAILS_URL = 'https://maps.googleapis.com/maps/api/place/details/json?';
const API_KEY = settings.get('apiKeys.gmapsKey');

const urlBuilder = query => {
  // * Formats a simple Query URL for the places API
  return `${BASE_URL}${query}&fields=photos,formatted_address,name&key=${API_KEY}`;
};

const detailsUrlBuild = placeId => {
  // * Formats a details based URL
  return `${DETAILS_URL}placeid=${placeId}&fields=name,formatted_address,formatted_phone_number,website&key=${API_KEY}`;
};

exports.searchGoogle = async (
  searchArea,
  placeCategory,
  getDetails = false
) => {
  // * Formats a Query from search terms
  const searchTerm = `${placeCategory} in ${searchArea}`;
  const formattedSearchTerm = searchTerm.split(' ').join('+');
  const currQuery = `query=${formattedSearchTerm}`;
  const finalPostUrl = urlBuilder(currQuery);

  // * Returns a promise of the queries data
  return new Promise((resolve, reject) => {
    axios
      .get(finalPostUrl, {
        method: 'get'
      })
      .then(async res => {
        if (getDetails) {
          const newResults = res.data.results.map(async result => {
            return await getMoreDetails(result);
          });
          Promise.all(newResults).then(resolvedResults => {
            res.data.results = resolvedResults;
            resolve(res.data);
          });
        } else {
          resolve(res.data);
        }
      })
      .catch(err => {
        reject(err);
      });
  });
};

getMoreDetails = async result => {
  const { place_id } = result;
  const finalPostUrl = detailsUrlBuild(place_id);
  return new Promise((resolve, reject) => {
    axios
      .get(finalPostUrl, { method: 'get' })
      .then(res => {
        resolve(res.data.result);
      })
      .catch(err => {
        reject(err);
      });
  });
};
