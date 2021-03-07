var express = require('express');
var router = express.Router();
const usersController = require("../app/Controllers/usersController");

router.get("/", usersController.getUsers);

module.exports = router;
