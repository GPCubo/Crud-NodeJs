// Utilizar Express
const express = require('express');
const router = express.Router()
const controller = require('../controllers/index.controller');

// GET
router.get('/', controller.index)

// POST
router.post("/add-public",controller.addPublic)
router.post("/add-user",controller.addUser)
router.post("/update-user/:userId",controller.updateUser)

// DELETE
router.delete("/delete-user/:userId",controller.deleteUser)

module.exports = router