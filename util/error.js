module.exports = {
   serverError(res, error) {
      console.log(error)
      return res.status(500).json({
         message: 'Server Error Occured'
      })
   },
   resourceError(res, message) {
      return res.status(400).json({
         message
      })
   }
}