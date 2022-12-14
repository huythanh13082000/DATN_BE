const middlewareAuthor = {
  admin: (req, res, next) => {
    if (req.user.role === 'admin') {
      next()
    }
    else {
      return res.status(401).json('no permission to operate')
    }
  }
}
module.exports = middlewareAuthor