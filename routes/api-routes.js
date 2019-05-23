// Dependecies

var db = require("../models");

// Routes

module.exports = function (app) {
    app.get("/api/products", function (req, res) {
        db.Product.findAll().then(function (results) {
            res.json(results);
        });
    });


    // more to come



}
