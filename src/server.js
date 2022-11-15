const { app } = require('./app')
require('dotenv').config()

const port = process.env.PORT || 4200
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})