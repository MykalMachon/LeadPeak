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
      'Company Name': obj.name,
      Street: locArr[0],
      City: locArr[1],
      Province: locArr[2].slice(0, 3),
      Country: locArr[3],
      'Postal Code': locArr[2].slice(3)
    });
  });
  const jsonParser = new JsonToCSVParser({ headings });
  const csv = jsonParser.parse(rows);
  return csv;
};
