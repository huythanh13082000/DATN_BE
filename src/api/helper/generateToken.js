const jwt = require("jsonwebtoken")

const generateToken = (payload) => {
  const accessToken = jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: Math.floor(Date.now() / 1000) + 60 * 10 })
  const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '24h' })
  const exp = Math.floor(Date.now() / 1000) + 60 * 10
  return { accessToken, refreshToken, exp }
}
module.exports = { generateToken }