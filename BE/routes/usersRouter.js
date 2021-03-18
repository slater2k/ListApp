var express = require('express');
var router = express.Router();
const usersController = require("../app/Controllers/usersController");

router.get("/", usersController.getUsers);
router.post("/register", usersController.createUser);

module.exports = router;
