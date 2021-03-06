module.exports = {

  generic: {
    number: 1,
    message: "Something went wrong, please try again"
  },

  invalid_phone: {
    number: 8,
    message: "Invalid phone number"
  },

  user_exists: {
    number: 2,
    message: "This account already exists"
  },

  user_not_active: {
    number: 3,
    message: "User not active"
  },

  user_does_not_exist: {
    number: 4,
    message: "User does not exist"
  },

  invalid_code: {
    number: 5,
    message: "Invalid code, please try again or click send again"
  },

  invalid_old_pwd: {
    number: 6,
    message: "Invalid old password"
  },

  short_pwd: {
    number: 7,
    message: "Password must be at least 8 characters long"
  },

  pwd_no_match: {
    number: 9,
    message: "Password do not match"
  },

  failed_purchase: {
    number: 10,
    message: "Something went wrong, we were not able to process your credit card"
  },

  invalid_name: {
    number: 11,
    message: "Name should be at least 1 character long"
  },

  invalid_email: {
    number: 12,
    message: "Looks like you entered a wrong email"
  },

  order_does_not_exist: {
    number: 13,
    message: "This order does not exist"
  },

  invalid_rating: {
    number: 14,
    message: "The rating you provided is out of range"
  },

  wrong_permissions: {
    number: 15,
    message: "You do not have the right permissions"
  },
  
  failed_subscribe: {
    number: 16,
    message: "Something went wrong while trying to subscribe you"
  },
  
  failed_unsubscribe: {
    number: 17,
    message: "Somthing went wrong while trying to unsubscribe you. Please try again"
  },
  
  not_subscribed: {
    number: 18,
    message: "You need to be a member to perform this operation"
  },

  failed_billing: {
    number: 19,
    message: "There was a problem with your subscription payment. Please contact our staff for more information"
  },
  
  cant_delete_card: {
    number: 20,
    message: "Something went wrong while trying to delete your credit card"
  },
  
  must_be_signed_in: {
    number: 21,
    message: "User should be signed to perform this action"
  }

}
