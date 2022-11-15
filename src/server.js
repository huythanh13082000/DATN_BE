const { app } = require('./app')
require('dotenv').config()

// const port = process.env.PORT || 4200
// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })
const server = app.listen(process.env.PORT || 5000, () => {
  const port = server.address().port;
  console.log(`Express is working on port ${port}`);
});