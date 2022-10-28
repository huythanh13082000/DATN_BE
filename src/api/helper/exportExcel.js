const XLSX = require('xlsx')

const exportExcel = async (data, fileName) => {
  try {
    const data1 = [{

      firstName: 'John',

      lastName: 'Doe'

    }, {

      firstName: 'Smith',

      lastName: 'Peters'

    }, {

      firstName: 'Alice',

      lastName: 'Lee'
    }]
    const ws = XLSX.utils.json_to_sheet(data1)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'Responses')
    XLSX.writeFile(wb, `uploads/${fileName}.csv`)
  } catch (error) {
    console.log(error)
  }

}

module.exports = { exportExcel }