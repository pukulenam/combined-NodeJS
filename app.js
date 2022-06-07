var express = require("express");
var path = require("path");

var routes = require("./routes")
var app = express();

app.set("port", process.env.PORT || 3000);
app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");

app.use(routes);
app.use(express.static("public"));
app.use("/img", express.static(__dirname + "public/img"));
app.use("/css", express.static(__dirname + "public/css"));
app.use("/js", express.static(__dirname + "public/js"));

app.listen(app.get("port"),function(){
    console.log("Server started on port "+app.get("port"));
});