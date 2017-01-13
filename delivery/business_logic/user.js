
module.exports = function () {

  var public = {}

  public.get_basics = function (req, res) {
    if (req.user) {
      var user = req.user.facebook
      res.send({name: user.name, picture: user.picture})
    } else {
      res.send({})
    }
  }

  return public
  

}
