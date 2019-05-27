// Dependecies

var db = require("../models");
// Routes

module.exports = function (app) {
    app.get("/api/products", function (req, res) {
        db.Product.findAll().then(function (results) {
          res.json(results);
        });
      });

      app.get("/api/products/:id", function (req, res) {
        db.Product.findOne({
          where: {
            id: req.params.id
          }
        }).then(function (results) {
          res.json(results);
        });
      });

      app.put("/api/products/:id", function (req, res) {
        db.Product.update(
          req.body,
        {
          where: {
            id: req.params.id
          }
        }).then(function() {
          
          res.json({message: "Update success!"})
        }).catch(function(err) {
          res.json({error: err})
        })
      });


       
    



    // more to come
}
