const express = require('express')
const router = express.Router()
const { getCrypto } = require('./crypto/index')

router.get('/crypto', getCrypto)

module.exports = router