// Dependencies

var express = require("express")

var db = require("./models")



// Sets up Express App

var app = express();
var PORT = process.env.PORT || 8080;

// Middleware for data handling 

app.use(express.urlencoded({extended: true}));
app.use(express.json());


// Static Directory 
app.use(express.static("public"));


// Routes
require("./routes/api-routes")(app);
require("./routes/html-routes")(app);

db.sequelize.sync({ force: true }).then(function() {
    app.listen(PORT, function() {
      console.log("App listening on PORT " + PORT);
    });
  });
