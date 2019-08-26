const Transaction = require('../Model/Trasaction')
const User = require('../Model/User')

const { serverError } = require('../util/error')

module.exports = {
   create (req, res, next) {

      let { amount, type, note } = req.body
      let userId = req.user._id

      let transaction = new Transaction({
         amount, type, note, author: userId
      })

      transaction.save()
            .then(trans => {

               User.findById(userId)
                     .then(user => {

                        if(type === 'income') {
                           user.balance += parseInt(amount)
                           user.income += parseInt(amount)
                           console.log("faruque hasnat")
                        } else if(type === 'expense'){
                           user.balance -= parseInt(amount)
                           user.expense += parseInt(amount)
                           console.log("faruque hasnat")
                        }
                        user.transaction.unshift(trans._id)

                        User.findByIdAndUpdate(userId, {$set: user}, {new: true})
                              .then(result => {
                                 return res.status(201).json({
                                    message: 'Trasaction Create Successfully',
                                    transaction: trans,
                                    user: result
                                 })
                              })
                              .catch(error => serverError(res, error))

                     })
                     .catch(error => serverError(res, error))
            })
            .catch(error => {
               return serverError(res, error)
            })
   },
   getAll(req, res, next) {
      let { _id } = req.user

      User.findById(_id)
            .then(user => {
               let balance = user.balance

               Transaction.find({author: _id})
                     .then(transactions => {
                        
                        if(transactions.length === 0) {
                           return res.status(200).json({
                              message: 'No Transaction Found...',
                              transactions,
                              balance
                           })
                        } else {
                           return res.status(200).json({transactions, balance})
                        }
                     })
                     .catch(error => serverError(res, error))
            })
            .catch(error => serverError(res, error))
   },
   remove(req, res, next) {
      let { transactionId } = req.params
      let { _id } = req.user

      Transaction.findOneAndDelete({ _id: transactionId })
            .then(result => {

               User.findById(_id)
                     .then(user => {
                        let balance = user.balance

                        Transaction.find({author: _id})
                              .then(transactions => {
                                 
                                 if(transactions.length === 0) {
                                    return res.status(200).json({
                                       transactions,
                                       balance
                                    })
                                 } else {
                                    return res.status(200).json({
                                       message: 'Transaction Deleted Successfully',
                                       transactions, 
                                       balance,
                                       ...result._doc
                                    })
                                 }
                              })
                              .catch(error => serverError(res, error))
                     })
                     .catch(error => serverError(res, error))
            })
            .catch(error => serverError(res, error))
   }
}