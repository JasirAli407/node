const express = require('express')
const router = express.Router()
const { getContacts, getContact, createContact, updateContact, deleteContact } = require('../controlllers/contactController')
const validateToken = require('../middleware/validateTokenHandler')

// here validatetoken middleware func will be applicable for whole contactroute
router.use(validateToken)
// multiple http method per route
router.route('/').get(getContacts).post(createContact)

// router.route('/').post(createContact)

router.route('/:id').get(getContact).put(updateContact).delete(deleteContact)



module.exports = router;