// import dependencies
const express = require("express");
const path = require("path");

let myApp = express();
myApp.use (express. urlencoded({extended:true}));

//set path to the public folders and views folder

myApp.set("views", path.join(__dirname, "views"));
myApp.use(express.static(__dirname + "/public"));

myApp.set("view engine", "ejs");

// home page root directory
myApp.get("/", function(req, res) {
  res.render("form"); //no need to add.ejs extension to the command.
});

//start passing the content from html form
myApp.post('/', function(req,res) {
  let name = req.body.name;
  let address = req.body.address;
  let city = req.body.city;
  let province = req.body.province;
  let phoneNumber = req.body.phoneNumber;
  let email = req.body.email;
  let medicalTape = req.body.medicalTape;
  let chalk = req.body.chalk;
  let gymnasticSuit = req.body.gymnasticSuit;
  let gymnasticGrip = req.body.gymnasticGrip;

 

 

  // let totalTax = subTotalCost * taxRate;
  // let totalCost = subTotalCost + totalTax;

  let pageData = {
    name : name,
    address : address,
    city : city,
    province : province,
    phoneNumber : phoneNumber,
    email : email,
    medicalTape : medicalTape,
    chalk : chalk,
    gymnasticSuit : gymnasticSuit,
    gymnasticGrip : gymnasticGrip,
    subTotal : subTotal,
    totalTax : totalTax,
    totalCost : totalCost
  }
  console.log(pageData)

  res.render('form', pageData);

})

//open up the ports, http protocol

// Confirmation output domain name displayed in terminal screen
myApp.listen(8080);
console.log("Application started ... listening on port 8080!"); // Open URL in Browser: http:localhost:8080
