const XLSX = require('xlsx')


const readFile = (name) => {
  const workbook = XLSX.readFile(`uploads/${name}`);
  const sheet_name_list = workbook.SheetNames;
  const xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
  return xlData
}

module.exports = { readFile }