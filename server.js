const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const passport = require('passport')
cosnt path = require('path')

const userRouter = require('./router/userRouter')
const transactionRouter = require('./router/transactionRouter')

const app = express()

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

app.use(passport.initialize())
require('./passport')(passport)

app.use('/api/users', userRouter)
app.use('/api/transactions', transactionRouter)

if(process.env.NODE_ENV === 'production') {
   app.user(express.static('client/build'))
   app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', index.html))
   })
}

app.get('/', (req, res) => {
   res.json({
      message: "Welcom To Our Application"
   })
})

const PORT = process.env.PORT || 4000

app.listen(PORT, () =>{
   console.log(`Server is running on PORT ${PORT}`)
   mongoose.connect(`mongodb+srv://${process.env.dbUsername}:${process.env.dbPassword}@money-app-stx9s.mongodb.net/test?retryWrites=true&w=majority`, 
      {useNewUrlParser: true},
      () => {
         console.log('Database Connected...')
      }
   )
})