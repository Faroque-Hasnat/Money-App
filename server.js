const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')

const userRouter = require('./router/userRouter')

const app = express()

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

app.use('/api/users', userRouter)

app.get('/', (req, res) => {
   res.json({
      message: "Welcom To Our Application"
   })
})

const PORT = process.env.PORT || 4000

app.listen(PORT, () =>{
   console.log(`Server is running on PORT ${PORT}`)
   mongoose.connect('mongodb://localhost/money-app', 
      {useNewUrlParser: true},
      () => {
         console.log('Database Connected...')
      }
   )
})