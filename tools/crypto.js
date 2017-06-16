const crypto = require('crypto')

module.exports = function (priv = {}) {

  let pub = {}

  /*
   * generates random string of characters i.e salt
   * @param length {number} length of the random string.
   * @return {string} salt
   */
  priv.create_salt = function (length = 10){
      return crypto.randomBytes(Math.ceil(length/2))
                   .toString('hex')
                   .slice(0,length)
  }

  /*
   * hash password with sha512.
   * @param password {string} list of required fields.
   * @param salt {string} data to be validated.
   * @return {string} password hash
   */
  pub.sha512 = function (password, salt){
      return crypto.createHmac('sha512', salt)
                   .update(password)
                   .digest('hex')
  }

  /*
  * creates a hashed password and a salt given a string password
  * @param userpassword {string}
  * @return {object} salt and password
  */
  pub.hash_password = function (userpassword) {
      let salt = priv.create_salt()
      let hash_pwd = pub.sha512(userpassword, salt)
      return {salt, hash_pwd}
  }

  return pub

}