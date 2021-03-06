//Author- Najeam Mehanmal 7457195
// import dependencies
const express = require("express");
const path = require("path");
const { check, validationResult } = require("express-validator");
// const { RSA_PSS_SALTLEN_DIGEST } = require('constants')

let myApp = express();
myApp.use(express.urlencoded({ extended: true }));

//set path to the public folders and views folder

myApp.set("views", path.join(__dirname, "views"));
myApp.use(express.static(__dirname + "/public"));

myApp.set("view engine", "ejs");

// set up database connection

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/revolutionvending3", {
  // path of database and libraries want to use for our database
  useNewUrlParser: true,
  useUnifiedTopology: true
}); // Path of Database

//Setup the model for the order.  How the data will be processed.

const Order = mongoose.model("Order", {
  name: String,
  address: String,
  city: String,
  province: String,
  phoneNumber: String,
  email: String,
  medicalTape: String,
  chalk: String,
  gymnasticSuit: String,
  gymnasticGrip: String,
  medicalTapeCost: String,
  chalkCost: String,
  gymnasticSuitCost: String,
  gymnasticGripCost: String,
  subTotal: String,
  totalTax: String,
  totalAmount: String
});

//specfic validation functions

//name validation
const nameRegex = /^[A-Z][a-z]+\s[A-Z][a-z]+/;

//phonenumber validation
const phoneNumberRegex = /^\d{10}$/;

//email validation
const emailRegex = /^[\w\d\S]+@[a-z\d-]+\.[a-z]{2,8}$/;

//address validation
const addressRegex = /^\d+\s[A-Z][a-z]+\s[A-Z][a-z]+/;

//city validation
const cityRegex = /^[A-Z][a-z]+?(\s[A-Z][a-z]+|)$/;

//medicalTape validation
const medicalTapeRegex = /^\d+$/;

//chalk validation
const chalkRegex = /^\d+$/;

// function to check a string using regex
const checkRegex = (userInput, regex) => {
  if (regex.test(userInput)) {
    return true;
  } else {
    return false;
  }
};
// name validation

const customNameValidation = value => {
  if (!checkRegex(value, nameRegex)) {
    throw new Error("Please enter correct name format: 'John Doe'");
  }
  return true;
};

// phone number validation

const customPhoneValidation = value => {
  if (!checkRegex(value, phoneNumberRegex)) {
    throw new Error("Please enter correct Phone number format: 1231231234");
  }
  return true;
};

// email validation

const customEmailValidation = value => {
  if (!checkRegex(value, emailRegex)) {
    throw new Error("Please enter correct Email format: email@domain.com");
  }
  return true;
};

// address validation
const customAddressValidation = value => {
  if (!checkRegex(value, addressRegex)) {
    throw new Error("Please enter correct Address format: 123 Main Street");
  }
  return true;
};

// city validation
const customCityValidation = value => {
  if (!checkRegex(value, cityRegex)) {
    throw new Error("Please enter correct City format: Toronto or New Dundee");
  }
  return true;
};

// province validation using built in express validator

// medicalTape validation
const customMedicalTapeValidation = value => {
  if (value === "") {
    return true;
  } else if (!checkRegex(value, medicalTapeRegex)) {
    throw new Error(
      "Please enter a whole number for medical Tape greater than 0"
    );
  } else {
    return true;
  }
};

// chalk valdiation
const customChalkValidation = value => {
  if (value === "") {
    return true;
  } else if (!checkRegex(value, chalkRegex)) {
    throw new Error("Please enter a whole number for chalk greater than 0");
  } else {
    return true;
  }
};

// home page root directory
myApp.get("/", function(req, res) {
  res.render("form"); //no need to add.ejs extension to the command.
});

//start passing the content from html form
myApp.post(
  "/",
  [
    check("name", "").custom(customNameValidation),
    check("address", "").custom(customAddressValidation),
    check("city", "").custom(customCityValidation),
    check("province", "Select a Province").notEmpty(),
    check("phoneNumber", "").custom(customPhoneValidation),
    check("email", "").custom(customEmailValidation),
    check("medicalTape", "").custom(customMedicalTapeValidation),
    check("chalk", "").custom(customChalkValidation)
  ],
  function(req, res) {
    // console.log(req.body);
    const errors = validationResult(req);
    // console.log(errors);

    if (!errors.isEmpty()) {
      res.render("form", {
        errors: errors.array()
      });
      // console.log(errors);
    } else {
      //No Errors
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

      // ***logic for form***

      //cost of medicalTape

      let medicalTapeCost = "";

      if (medicalTape !== "") {
        medicalTapeCost = medicalTape * 3;
      } else {
        medicalTapeCost = 0;
      }

      //cost of chalk

      let chalkCost = "";

      if (chalk !== "") {
        chalkCost = chalk * 2;
      } else {
        chalkCost = 0;
      }

      let gymnasticSuitCost = 0;

      //cost of gymnasticSuit
      switch (gymnasticSuit) {
        case "s":
          gymnasticSuitCost = 2;
          break;
        case "m":
          gymnasticSuitCost = 3;
          break;
        case "l":
          gymnasticSuitCost = 5;
          break;
        default:
          gymnasticSuitCost;
      }

      let gymnasticGripCost = 0;

      //cost of gymnasticGrip
      switch (gymnasticGrip) {
        case "s":
          gymnasticGripCost = 2;
          break;
        case "m":
          gymnasticGripCost = 3;
          break;
        case "l":
          gymnasticGripCost = 5;
          break;
        default:
          gymnasticGripCost;
      }

      //determine taxRate per province selected
      let taxRate = 0;

      switch (province) {
        case "bc":
          taxRate = 0.12;
          province = "British Columbia";
          break;
        case "ab":
          taxRate = 0.05;
          province = "Alberta";
          break;
        case "sk":
          taxRate = 0.11;
          province = "Saskatchewan";
          break;
        case "mb":
          taxRate = 0.12;
          province = "Manitoba";
          break;
        case "on":
          taxRate = 0.13;
          province = "Ontario";
          break;
        case "qb":
          taxRate = 0.14975;
          province = "Quebec";
          break;
        case "ns":
          taxRate = 0.15;
          province = "Nova Scotia";
          break;
        case "nb":
          taxRate = 0.15;
          province = "New Brunswick";
          break;
        case "pe":
          taxRate = 0.15;
          province = "Prince Edward Island";
          break;
        case "nf":
          taxRate = 0.15;
          province = "Newfoundland";
          break;
        case "yt":
          taxRate = 0.05;
          province = "Yukon";
          break;
        case "nt":
          taxRate = 0.05;
          province = "North West Territories";
          break;
        case "nu":
          taxRate = 0.05;
          province = "Nunavut";
          break;
      }

      let subTotal =
        medicalTapeCost + chalkCost + gymnasticSuitCost + gymnasticGripCost;

      let totalTax = subTotal * taxRate;

      let totalAmount = subTotal + totalTax;

      let pageData = {
        name: name,
        address: address,
        city: city,
        province: province,
        phoneNumber: phoneNumber,
        email: email,
        medicalTapeCost: medicalTapeCost,
        chalkCost: chalkCost,
        gymnasticSuitCost: gymnasticSuitCost,
        gymnasticGripCost: gymnasticGripCost,
        subTotal: subTotal.toFixed(2),
        totalTax: totalTax.toFixed(2),
        totalAmount: totalAmount.toFixed(2)
      };
      // console.log(pageData);

      // 1- We set up the type of information that will be displayed in our model
      // 2- Create an object for the model - Order

      if (totalAmount >= 10) {
        let myOrder = new Order(pageData);
        // 3 -Save the order, save the information from the form
        myOrder.save().then(function() {
          console.log("New Order Created!");
        });
      }

      // Display Output : Receipt
      res.render("form", pageData);
    }
  }
);

//All Orders Page
myApp.get("/allorders", function(req, res) {
  Order.find({}).exec(function(err, orders) {
    // console.log(err);
    res.render("allorders", {orders: orders});
  })
});

//open up the ports, http protocol

// Confirmation output domain name displayed in terminal screen
myApp.listen(5500);
console.log("Application started ... listening on port 5500!"); // Open URL in Browser: http:localhost:8080
