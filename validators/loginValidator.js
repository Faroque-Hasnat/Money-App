const validator = require('validator')

const validate = user => {
   let error = {}

   if(!user.email) {
      error.email = 'Please Provide Your Email'
   } else if(!validator.isEmail(user.email)) {
      error.email = 'Please Provide a Valide Email'
   }

   if(!user.password) {
      error.papssword = 'Please Provide a Password'
   }

   return {
      error,
      isValide: Object.keys(error).length === 0
   }
}

module.exports = validate