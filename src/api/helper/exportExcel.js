const { parse } = require('json2csv');
const XLSX = require('xlsx')

const exportExcel = (fields, data) => {
  try {
    const opts = { fields };
    const csv = parse(data, opts);
    return csv
  } catch (error) {
    console.log(error);
    return false
  }
}

module.exports = { exportExcel }