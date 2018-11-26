const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var KudoSchema = new Schema({
    from: String,
    to: String,
    title: String,
    message: String
});

const Kudo = mongoose.model("Kudo", KudoSchema);

module.exports = Kudo;