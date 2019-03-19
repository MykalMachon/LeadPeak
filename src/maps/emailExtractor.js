// Require the appropriate resources
const hunter = require('../services/hunter');
// Regex for seperating base urls out of contrived / longform links
const domainMinifyRegex = /(http|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))/;

/**
 * * getEmailsFromGMapRes
 *
 * This will take in google results and return a relevant array of email address
 * on the domain (if available). If not, a null value is returned.
 *
 * @param googleRes: String the google maps response data from a google search to parse
 * @param mergeResults: Boolean true if to merge emails into new array, false if not
 * @returns array of emails OR googleRes with appended email array per each contact
 */
exports.getEmailsFromGMapRes = (googleRes, mergeResults = false) => {
  return new Promise(async (resolve, reject) => {
    let promisedResults = [];
    googleRes.forEach(async result => {
      if (result.website && result.website != '') {
        promisedResults.push(
          new Promise(async (resolve, reject) => {
            const minDomainArr = result.website.match(domainMinifyRegex);
            const minDomain = minDomainArr[2].trim();
            const emails = await hunter.searchDomain(minDomain);
            // Object to resolve with
            const obj = {
              name: result.name,
              emails: emails.length > 0 ? emails : null
            };
            resolve(obj);
          })
        );
      } else {
        promisedResults.push(
          new Promise((resolve, reject) => {
            const obj = {
              name: result.name,
              emails: null
            };
            resolve(obj);
          })
        );
      }
    });
    const results = await Promise.all(promisedResults);
    if (mergeResults) {
      let newResults = googleRes.map(res => {
        let newResult = res;
        results.forEach(emailRes => {
          if (emailRes.name == res.name) {
            newResult.emails = emailRes.emails;
          }
        });
        return newResult;
      });
      resolve(newResults);
    } else {
      resolve(results);
    }
  });
};
