const validator = require('validator')

const validate = user => {
   let error = {}

   if(!user.name) {
      error.name = 'Please Provide Your Name'
   }

   if(!user.email) {
      error.email = 'Please Provide Your Eamil'
   } else if(!validator.isEmail(user.email)) {
      error.email = 'Please Provide a Valide Email'
   }

   if(!user.password) {
      error.papssword = 'Please Provide a Password'
   } else if(user.password.length < 6) {
      error.password = 'Password Must Be Greater Than Or Equal 6 Characters'
   }

   if(!user.confirmPassword) {
      error.confirmPassword = 'Please Provide Confirmation Password'
   } else if(user.password !== user.confirmPassword) {
      error.confirmPassword = 'Password Doesn\'t Match'
   }

   return {
      error,
      isValide: Object.keys(error).length === 0
   }
}

module.exports = validate