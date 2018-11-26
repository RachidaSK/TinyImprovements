const express = require("express");
const mongoose = require("mongoose");
const request = require("request");
const cheerio = require("cheerio");
const morgan = require("morgan");

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.urlencoded({extended:true}));
app.use(express.json());
// app.use(logger("dev"));
// app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static("public"));


if(process.env.MONGODB_URI) {
    mongoose.connect(process.env.MONGODB_URI);
} else {
    mongoose.connect("mongodb://localhost/kudosDB", {useNewUrlParser: true});
}

const db = mongoose.connection;
db.on("error", function(err) {
    console.log("Mongoose Error: ", err);
});

db.once("open", function() {
console.log("Mongoose connection successful")
})

require("./routes/api-routes")(app);

app.listen(PORT, function(){
 console.log(`App is now listening on port : http://localhost:${PORT}`)
});