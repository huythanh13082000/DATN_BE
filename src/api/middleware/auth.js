const jwt = require('jsonwebtoken')

const middlewareAuth = {
  verifyToken: (req, res, next) => {
    const token = req.headers.authorization
    console.log(111, token);
    if (token) {
      const accessToken = token.split(" ")[1]
      jwt.verify(accessToken, process.env.TOKEN_SECRET, (err, user) => {
        if (err) {
          console.log(err)
          return res.status(403).json("Token not valid")
        }
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