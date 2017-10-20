const Promotion = require('../database/promotion.js')
const User = require('../database/user.js')
const send = require('../notification_center/send.js')

module.exports = function () {
  
  let pub = {}
  
  /*
  * gets all users promotions
  */
  pub.get_meal_promotion = function (req, res, next) {
    Promotion.findOne({_user: req.session.user._id, activated: true, used: false, type: 'meal'},
      (err, promotion) => {
        if (err) throw err
        if (!promotion) return next()
        res.locals.promotion = {discount: promotion.discount, name: promotion.name, type: promotion.type}
        next()
    })
  }

  pub.mark_meal_promotion_as_used = function (req,res,next) {
    Promotion.findOneAndUpdate(
      {_user: req.session.user._id, activated: true, used: false, type: 'meal'},
      {used: true},
      {new: true, upsert: false}, 
      (err, promotion) => {
        if (err) throw err
        next()
    })
  }
  
  pub.add_referrer = function (req, res, next) {
    const {referred_email} = req.body
    const referral = new Promotion({
      _user: req.session.user._id,
      name: "referral",
      discount: .25,
      activated: false,
      used: false,
      type: 'meal',
      referred_email
    })
    referral.save(err => {
      send({email: referred_email})
        .message('referred_invite',{name: req.session.user.name})
        .email()
      next()
    })
  }
  
  pub.add_referred = function (req, res, next) {
    const {email, id} = req.body
    Promotion.findOne({'referred_email': email, 'activated': false})
      .populate({path: "_user"})
      .exec((err, promotion) => {
        if (err) throw err
        if (!promotion) return next()
        promotion.activated = true
        promotion.save(err => {
          if (err) throw error
          const referral = new Promotion({
            _user: id,
            name: "referral",
            discount: .25,
            activated: true,
            type: 'meal',
            used: false
          })
          referral.save(err => {
            if (err) throw error
            console.log(promotion)
            send({email: promotion._user.email})
              .message('referred_accepted',{name: promotion._user.name})
              .email()
            next()
          })
        })
      })
  }
  
  return pub
  
}