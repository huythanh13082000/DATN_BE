const jwt = require("jsonwebtoken")

const generateToken = (payload) => {
  const accessToken = jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: '15s' })
  const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1h' })
  return { accessToken, refreshToken }
}
module.exports = { generateToken }