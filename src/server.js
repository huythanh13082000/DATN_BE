const app = require('./app')
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017');

  // use `await mongoose.connect('mongodb://user:password@localhost:27017/test');` if your database has auth enabled
}

const port = 3001
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})