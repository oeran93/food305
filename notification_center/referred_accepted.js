module.exports = function (infos) {
  return {
    subject: `Vimi, one of your referred friends just signed up for Vimi!`,
    body: `Hi ${infos.name}, one of your referred friends has signed up for Vimi.
    Your next meal will be 50% off!
    `
  }
}