const User = require('../Model/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const registerValidator = require('../validators/registerValidator')
const loginValidator = require('../validators/loginValidator')
const { serverError, resourceError } = require('../util/error')

module.exports = {
   register(req, res) {
      let {name, email, password, confirmPassword} = req.body

      let validate = registerValidator({ name, email, password, confirmPassword })

      if(!validate.isValide) {
         return res.status(400).json(validate.error)
      } else {
         User.findOne({ email })
            .then(user => {
               if(user) {
                  return resourceError(res, 'User Already Exist')
               } else {
                  bcrypt.hash(password, 11, (err, hash) => {
                     if(err) {
                        return serverError(res, error)
                     }

                     let user = new User({
                        name,
                        email,
                        password: hash,
                        balance: 0,
                        income: 0,
                        expense: 0,
                        transaction: []
                     })
   
                     user.save()
                        .then(user => {

                           let token = jwt.sign({
                              _id: user._id,
                              name: user.name,
                              email: user.email
                           }, 'secret')

                           res.status(200).json({
                              message: 'User Create Successfully',
                              token: `Bearer ${token}`
                           })
                        })
                        .catch(error => serverError(res, error))
                  })
               }
            })
            .catch(error => serverError(res, error))
      }
   },
   login(req, res) {

      let { email, password } = req.body

      let validate = loginValidator({ email, password})

      if(!validate.isValide) {
         return res.status(400).json(validate.error)
      } else {
         User.findOne({ email })
               .then(user => {
                  if(!user) {
                     return resourceError(res, 'User Not Found. Please Go To Register Page And Create A Account.')
                  } else {
                     bcrypt.compare(password, user.password, (err, result) => {
                        if(err) {
                           return serverError(res, error)
                        }

                        if(!result) {
                           return resourceError(res, 'Password Incurrect!')
                        } else {
                           let token = jwt.sign({
                              _id: user._id,
                              name: user.name,
                              email: user.email
                           }, 'secret')

                           res.status(200).json({
                              message: 'Login Successfully',
                              token: `Bearer ${token}`
                           })
                        }
                     })
                  }
               })
               .catch(error => serverError(res, error))
      }
   },
   allUser(req, res) {
      User.find()
            .then(user => {
               return res.status(300).json(user)
            })
            .catch(error => serverError(res, error))
   }
}
