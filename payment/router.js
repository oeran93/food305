const model = require('./model.js')('9zrIGMePyV72z3gPAIBo0ohv4LWGQ12y', 'b3a7dbbd350c61f576a0a8dced189098ac114e3fbfbbc22d675bb28c93b9d544', 'fdoa-3de9342657450826862545ba238c5b643de9342657450826')

module.exports = function (app) {

  app.post('charge_credit_card', model.charge_credit_card)

}
