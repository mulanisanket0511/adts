const requireJsonContent = () => {

  return async (req, res, next) => {
    if (req.headers['content-type'] !== 'application/json') {
      res.send({
        code: 400,
        msg: 'Server requires application/json'
      })
    } else {
      next()
    }
  }
}

module.exports = requireJsonContent