const router = require('express').Router()

const { register, allUser, login } = require('../controller/userController')


router.post('/register', register)
router.post('/login', login)
router.get('/alluser', allUser)



module.exports = router