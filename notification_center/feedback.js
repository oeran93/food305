module.exports = function (info) {
  return {
    subject:`User ${info.user.name} feedback`, 
    body: `User ${info.user.name} (${info.user.email}) gave this response <br/><br/>
      feedback: ${info.feedback} <br/> <br/>
      response: ${info.response}
    `
  }
}
