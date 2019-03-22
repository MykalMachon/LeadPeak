const axios = require('axios');
const settings = require('electron-settings');

const BASE_URL = 'https://maps.googleapis.com/maps/api/place/textsearch/json?';
const DETAILS_URL = 'https://maps.googleapis.com/maps/api/place/details/json?';

/**
 * * searchGoogle
 *
 * This function takes in a number of paramaters and queries the google maps API
 * to get a list of places that fit the aforementioned paramters.
 *
 * @param searcArea the geographic area to search in
 * @param placeCategory the category or descriptor for the type of business to find
 * @param getDetails a boolean values that defines if the function should request
 *                   detailed information
 * @return results: a JSON object containing all of the results of the google
 *         maps API query
 */
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
        method: 'get',
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

/**
 * * getApiKey
 *
 * gets the api key from the electron settings store
 *
 * @return google maps API key
 */
const getApiKey = () => {
  return settings.get('apiKeys.gmapsKey');
};

/**
 * * urlBuilder
 *
 * Builds a standard google maps API query string
 *
 * @param query a place and type of establishment to query
 *
 * @return standardUrl : a standard google maps API query string
 */
const urlBuilder = query => {
  // * Formats a simple Query URL for the places API
  return `${BASE_URL}${query}&fields=photos,formatted_address,name&key=${getApiKey()}`;
};

/**
 * * detailsUrlBuild
 *
 * Builds a detailed google maps API query string
 *
 * @param placeId a UID string that references a google maps location
 *
 * @return detailsUrl : a detailed google maps API query string
 */
const detailsUrlBuild = placeId => {
  // * Formats a details based URL
  return `${DETAILS_URL}placeid=${placeId}&fields=name,formatted_address,formatted_phone_number,website&key=${getApiKey()}`;
};

/**
 * * getMoreDetails
 *
 * This function takes in the results from a searchGoogle function call and gets
 * more details on the results
 *
 * @param result the results of a searchGoogle api call
 *
 * @return results: a JSON object containing all of the detailed results of the
 *         google maps API query
 */
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
