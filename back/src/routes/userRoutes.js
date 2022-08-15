const express = require("express");
const router = express.Router();

const controllers = require("../controllers/usersControllers");
const authController = require("../controllers/authController");

router.post("/create", controllers.createUser);
router.post('/login', authController.login);
router.delete('/delete', controllers.deleteUser);

module.exports = router;