exports.getUsers = (req, res) => {
  res.send('respond with a resource')
}

exports.getUserProfile = (req, res) => {
  res.send(req.user)
}
