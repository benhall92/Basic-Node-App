const express = require("express");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const mongoose = require("mongoose");

// Define App
const router  = express.Router();
const app = express();

// Define the User Controller
const UserController = require('../../controllers/userController');

router.get('/:id', UserController.readOne, (req, res) => {
    res.send("Hello World!");
}); // Read One

module.exports = router;