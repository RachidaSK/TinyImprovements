const User = require("../models/User");
const Kudo = require("../models/Kudos");

module.exports = function(app) {
    app.post("/api/session", function(req, res) {
        User.find(req.body)
        .then(function(data) {
            res.json(data);
        })
        .catch(function(err) {
            res.json(err);
        });
    });
    
    app.post("/api/user", function(req, res) {
        User.create(req.body)
        .then(function(data) {
            res.json(data);
        })
        .catch(function(err) {
            res.json(err);
        });
    });

    app.get("/api/user/:id", function(req, res) {
        User.find({_id: req.params.id})
        .populate("kudos")
        .then(function(data) {
            res.json(data);
        })
        .catch(function(err) {
            res.json(err);
        });
    });

    app.post("/api/kudo", function(req, res) {
        const userId = req.body.userId;
        const newEntry = {
            from: req.body.from,
            to: req.body.to,
            title: req.body.title,
            message: req.body.message
        }

        Kudo.create(newEntry)
        .then(function(kudoData) {
            return User.findOneAndUpdate({_id: userId}, {$push: {kudos: kudoData._id}}, {new: true});
        })
        .then(function(userData) {
            res.json(userData);
        })
        .catch(function(err) {
            res.json(err);
        });
    });
}