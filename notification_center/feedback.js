module.exports = function (info) {
  return {
    subject:`User ${info.name} feedback`, 
    body: `User ${info.name} (${info.email}) gave this response <br/><br/>
      feedback: ${info.feedback} <br/> <br/>
      response: ${info.response}
    `
  }
}
