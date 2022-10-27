const XLSX = require('xlsx')

const exportExcel = (data, fileName) => {
  const ws = XLSX.utils.json_to_sheet(data)
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, 'Responses')
  XLSX.writeFile(wb, `${fileName}.csv`)
}

module.exports = { exportExcel }