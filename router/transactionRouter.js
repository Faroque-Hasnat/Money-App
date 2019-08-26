const router = require('express').Router()
const authenticate = require('../authenticate')

const { create, getAll, remove } = require('../controller/transactionController')

router.post('/', authenticate, create)
router.get('/', authenticate, getAll)
router.delete('/:transactionId', authenticate, remove)

module.exports = router