// Require the appropriate resources
const path = require('path');
const axios = require('axios');
const settings = require('electron-settings');

// * URLs to be used throughout the functions
const domainSearchURL = `https://api.hunter.io/v2/domain-search?domain=`;
const searchNameAtDomainURL = `https://api.hunter.io/v2/email-finder?domain=`;
const emailVerificationURL = `https://api.hunter.io/v2/email-verifier?email=`;
const apiString = `&api_key=${settings.get('apiKeys.hunterioKey')}`;

/**
 * * searchDomain
 *
 * Searches the passed in domain for emails and
 * returns a list in JSON format
 *
 * @param domain: a string domain to be checked
 */
exports.searchDomain = async domain => {
  // Initialize the hunter instance using the given API key
  const queryUrl = `${domainSearchURL}${domain}${apiString}`;
  const req = await axios.get(queryUrl, { method: `get` });
  const res = await req;
  return res.data.data.emails;
};

/**
 * * searchNameAtDomain
 *
 * Searches the passed in name and domain and sees
 * if there is a domain with this name @ the given domain
 *
 * @param name: a string name of the person to be checked
 * @param domain: a string domain to be checked
 * @returns object: {email: tim@apple.com, rating: 99}, false if non found
 */
exports.searchNameAtDomain = (name, domain) => {
  // Initialize the hunter instance using the given API key
};

/**
 * * validateEmail
 *
 * checks to ensure that this email returns a response
 * when pinged
 *
 * @param email: a string email that will be validated
 * @returns boolean: true if valid, false if not.
 */
exports.validateEmail = email => {
  // Initialize the hunter instance using the given API key
};
