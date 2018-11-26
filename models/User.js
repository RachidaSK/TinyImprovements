const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var UserSchema = new Schema({
    firstName: {
        type: String,
        trim: true,
        required: "First Name is Required"
    },
    lastName: {
        type: String,
        trim: true,
        required: "Last Name is Required"
    },
    email: {
        type: String,
        trim: true,
        required: "Username is Required"
    },
    password: {
        type: String,
        trim: true,
        required: "Password is Required"
    },
    kudos: [{
        type: Schema.Types.ObjectId,
        ref: "Kudo"
    }]
});

const User = mongoose.model("User", UserSchema);

module.exports = User;