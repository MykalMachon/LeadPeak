const hunter = require('../services/hunter');
const domainMinifyRegex = /(http|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))/;

exports.getEmails = googleRes => {
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
              company: result.name,
              emails: emails.length > 0 ? emails : null
            };
            resolve(obj);
          })
        );
      } else {
        promisedResults.push(
          new Promise((resolve, reject) => {
            const obj = {
              company: result.name,
              emails: null
            };
            resolve(obj);
          })
        );
      }
    });
    const results = await Promise.all(promisedResults);
    resolve(results);
  });
};
