const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');

const middlewareAuth = {
  verifyToken: (req, res, next) => {
    const token = req.headers.authorization
    console.log(111, token);
    if (token) {
      const accessToken = token.split(" ")[1]
      jwt.verify(accessToken, process.env.TOKEN_SECRET, async (err, id) => {
        if (err) {
          console.log(err)
          return res.status(401).json("Token not valid")
        }
        const user = await userModel.findOne({ _id: id })
        req.user = user

        console.log(444, user)
        next()
      })
    }
    else {
      return res.status(401).json('you are not authenticated')
    }
  }
}
module.exports = middlewareAuth