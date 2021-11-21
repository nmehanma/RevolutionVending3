// import dependencies
const express = require("express");
const path = require("path");

let myApp = express();

//set path to the public folders and views folder

myApp.set("views", path.join(__dirname, "views"));
myApp.use(express.static(__dirname + "/public"));

myApp.set("view engine", "ejs");

// home page root directory
myApp.get("/", function(req, res) {
  res.render("form"); //no need to add.ejs extension to the command.
});

//Author page

myApp.get("/author", function(req, res) {
  res.render("author");
});




//open up the ports, http protocol

// Confirmation output domain name displayed in terminal screen
myApp.listen(8080);
console.log("Application started ... listening on port 8080!"); // Open URL in Browser: http:localhost:8080
