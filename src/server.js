const app = require('./app')
require('dotenv').config()

const port = 4200
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})