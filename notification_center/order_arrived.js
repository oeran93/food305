module.exports = function (infos) {
  return {
    subject: `Vimi, your ${infos.meal} is here`,
    body: `Hi ${infos.name}, your ${infos.meal} just arrived at your station`
  }
}