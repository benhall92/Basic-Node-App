/**
 User Controller file
*/
const User = require("../models/user");

// Inserts a book to the db
exports.create = function(req, res){
};

// Finds a single book in the db
exports.readOne = function (req, res) {

    if( req.params.id === undefined ){
        return res.status(400).send({});
    }

    User.UserModel.findOne({_id: req.params.id}, function(err, user){
        if(err)
            return res.status(500).send(err.message);

        return res.json(user);
    })
};

// Finds all books in the db
exports.readAll = function (req, res) {
};

// Updates a book from the db
exports.update = function(req, res) {
};

// Deletes a book from the db
exports.delete = function(req, res) {
};