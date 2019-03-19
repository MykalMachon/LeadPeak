const JsonToCSVParser = require('json2csv').Parser;

exports.exportBasicData = data => {
  const headings = [
    'First Name',
    'Last Name',
    'email',
    'Phone Number',
    'Mobile Number',
    'Company Name',
    'Street',
    'City',
    'Province',
    'Country',
    'Postal Code'
  ];
  const rows = [];
  data.forEach(obj => {
    const locArr = obj.formatted_address.split(',');
    rows.push({
      'First Name': '',
      'Last Name': '',
      email: '',
      'Phone Number': '',
      'Mobile Number': '',
      'Company Name': obj.name.trim(),
      Street: locArr[0].trim(),
      City: locArr[1].trim(),
      Province: locArr[2].slice(0, 3).trim(),
      Country: locArr[3].trim(),
      'Postal Code': locArr[2].slice(3).trim()
    });
  });
  const jsonParser = new JsonToCSVParser({ headings });
  const csv = jsonParser.parse(rows);
  return csv;
};

exports.exportDetailedData = data => {
  const headings = [
    'First Name',
    'Last Name',
    'email',
    'Phone Number',
    'Mobile Number',
    'Company Name',
    'Street',
    'City',
    'Province',
    'Country',
    'Postal Code',
    'Website'
  ];
  const rows = [];
  data.forEach(obj => {
    const locArr = obj.formatted_address.split(',');
    rows.push({
      'First Name': '',
      'Last Name': '',
      email: '',
      'Phone Number': obj.formatted_phone_number,
      'Mobile Number': '',
      'Company Name': obj.name.trim(),
      Street: locArr[0].trim(),
      City: locArr[1].trim(),
      Province: locArr[2].slice(0, 3).trim(),
      Country: locArr[3].trim(),
      'Postal Code': locArr[2].slice(3).trim(),
      Website: obj.website
    });
  });
  const jsonParser = new JsonToCSVParser({ headings });
  const csv = jsonParser.parse(rows);
  return csv;
};

exports.exportDetailedDataWithEmail = data => {
  const headings = [
    'First Name',
    'Last Name',
    'email',
    'Phone Number',
    'Mobile Number',
    'Company Name',
    'Street',
    'City',
    'Province',
    'Country',
    'Postal Code',
    'Website'
  ];
  const rows = [];
  data.forEach(obj => {
    const locArr = obj.formatted_address.split(',');
    obj.emails.forEach(email => {
      let fn, ln, pn;
      if (email.first_name != null && email.last_name != null) {
        fn = email.first_name;
        ln = email.last_name;
      }
      if (email.phone_number != null) {
        pn = email.phone_number;
      }
      rows.push({
        'First Name': fn || '',
        'Last Name': ln || '',
        email: email.value,
        'Phone Number': obj.formatted_phone_number,
        'Mobile Number': pn || '',
        'Company Name': obj.name.trim(),
        Street: locArr[0].trim(),
        City: locArr[1].trim(),
        Province: locArr[2].slice(0, 3).trim(),
        Country: locArr[3].trim(),
        'Postal Code': locArr[2].slice(3).trim(),
        Website: obj.website
      });
    });
    rows.push({
      'First Name': '',
      'Last Name': '',
      email: '',
      'Phone Number': obj.formatted_phone_number,
      'Mobile Number': '',
      'Company Name': obj.name.trim(),
      Street: locArr[0].trim(),
      City: locArr[1].trim(),
      Province: locArr[2].slice(0, 3).trim(),
      Country: locArr[3].trim(),
      'Postal Code': locArr[2].slice(3).trim(),
      Website: obj.website
    });
  });
  const jsonParser = new JsonToCSVParser({ headings });
  const csv = jsonParser.parse(rows);
  return csv;
};
