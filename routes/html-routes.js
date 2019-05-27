// Dependencies

const path = require("path");

// Routes

module.exports = function  (app) {
    app.get("/", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/index.html"))
    })

    app.get("/manager", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/manager.html"))
    })

    app.get("/update", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/update.html"))
    })
    app.get("/add", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/add.html"))
    })
}

