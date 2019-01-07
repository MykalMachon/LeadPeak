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
  const exampleRow = [
    {
      'First Name': 'test',
      'Last Name': 'test',
      email: 'test',
      'Phone Number': 'test',
      'Mobile Number': 'test',
      'Company Name': 'test',
      Street: 'test',
      City: 'test',
      Province: 'test',
      Country: 'test',
      'Postal Code': 'test'
    }
  ];

  const jsonParser = new JsonToCSVParser({ headings });
  const csv = jsonParser.parse(exampleRow);

  return csv;
};
