
module.exports = {

  /*
  * Generates a random number
  * @param length {Number} num digits
  * @return {Number} random number
  */
  rand_number: function (length) {
    let min = Math.pow(10, length-1)
    let max = Math.pow(10, length)-1
    return Math.floor(Math.random() * (max-min)) + min
  }

}