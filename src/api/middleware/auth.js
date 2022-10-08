const jwt = require('jsonwebtoken')

const middlewareAuth = {
  verifyToken: (req, res, next) => {
    const token = req.headers.authorization
    console.log(token);
    if (token) {
      const accessToken = token.split(" ")[1]
      jwt.verify(accessToken, process.env.TOKEN_SECRET, (err, user) => {
        if (err) {
          res.status(403).json("Token not valid")
        }
        req.user = user
        next()
      })
    }
    else {
      res.status(401).json('you are not authenticated')
    }
  }
}
module.exports = middlewareAuth