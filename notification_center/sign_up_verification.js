module.exports = function (infos) {
  return {
    body: `Hello ${infos.name}, \n your Vimi account code is ${infos.code}`,
    subject: "Welcome to the Vimi community"
  }
}
