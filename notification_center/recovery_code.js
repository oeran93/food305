module.exports = function (infos) {
  return {
    subject: "Vimi, recovery code",
    body: `Hi ${infos.name}, your recovery code is ${infos.code}`
  }
}
