const express = require('express');
const contact = require('../controllers/contact.controller.js');

const router = express.Router()

router.route('/favorite')
    .get(contact.findAllFavorites)
router.route("/:id")
    .get(contact.findOne)
    .put(contact.update)
    .delete(contact.delete)
router.route('/')
    .get(contact.findAll)
    .post(contact.create)
    .delete(contact.deleteAll)



module.exports = router