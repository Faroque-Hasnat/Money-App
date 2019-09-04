const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const passport = require('passport')
const path = require('path')

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
   app.use(express.static('client/build'))
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
   mongoose.connect(`mongodb://${process.env.dbUsername}:${process.env.dbPassword}@money-app-shard-00-00-stx9s.mongodb.net:27017,money-app-shard-00-01-stx9s.mongodb.net:27017,money-app-shard-00-02-stx9s.mongodb.net:27017/test?ssl=true&replicaSet=money-app-shard-0&authSource=admin&retryWrites=true&w=majority`, 
      {useNewUrlParser: true},
      () => {
         console.log('Database Connected...')
      }
   )
})
