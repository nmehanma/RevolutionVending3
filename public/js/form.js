//logic for submitting form from form.ejs file

const formSubmit = () => {

  return true; // uncomment this line to bypass the valdations 
  let myOutput = ""; // this will be used to store output of the form

  let errors = ""; // will be used to store error messages from the form

  // To fetch the values from the fields entered by the user, first with getElementById,

  let name = document.getElementById("name").value;
  let address = document.getElementById("address").value;
  let city = document.getElementById("city").value;
  let province = document.getElementById("province").value;
  let phoneNumber = document.getElementById("phone-number").value;
  let email = document.getElementById("email").value;

  let medicalTape = docment.getElementById("medical-tape").value;
  let chalk = docment.getElementById("chalk").value;

  let gymnasticSuit = docment.getElementById("gymnastic-suit").value;
  let gymnasticGrip = docment.getElementById("gymnastic-grip").value;

  // Specific Validations with regex

  //name validation
  const nameRegex = /^[a-zA-Z]+\s[a-zA-Z]+/;

  if (nameRegex.test(name)) {
    errors += "";
  } else {
    errors += "Name is not correct format <br/>";
  }

  //phone validation
  const phoneNumberRegex = /^\d{10}$/;

  if (phoneNumberRegex.test(phoneNumber)) {
    errors += "";
  } else {
    errors += "Phone number is not correct format <br/>";
  }

  //email validation
  const emailRegex = /^[\w\d\S]+@[a-z\d-]+\.[a-z]{2,8}$/;

  if (emailRegex.test(email)) {
    errors += "";
  } else {
    errors += "Email is not correct format <br/>";
  }

  // province validation

  let canadianProvinces = [
    "bc",
    "ab",
    "sk",
    "mb",
    "on",
    "qb",
    "ns",
    "nb",
    "pe",
    "nf"
  ];

  for (let i = 0; i < canadianProvinces.length; i++) {
    if (canadianProvinces[i] === province) {
      errors += "";
    } else {
      errors += "Select correct province";
    }
  }

  // address validation

  const addressRegex = /^\d+\s[a-z]+\s[a-z]+$/;

  if (addressRegex.test(address)) {
    errors += "";
  } else {
    errors +=
      'Address is not in correct format, example "123 Main Street" <br/>';
  }

  // city validation

  const cityRegex = /^[A-Z][a-z]+?(\s[A-Z][a-z]+|)$/;

  if (cityRegex.test(city)) {
    errors += "";
  } else {
    errors +=
      'City is not in correct format, example "Toronto" or "New Dundee" <br/>';
  }

  // medical tape validation

  const medicalTapeRegex = /^\d+$/;

  if (medicalTapeRegex.test(medicalTape)) {
    errors += "";
  } else {
    errors += "Please enter 0 or greater for quantity of medical tape <br/>";
  }

  // chalk validation
  const chalkRegex = /^\d+$/;

  if (chalkRegex.test(chalk)) {
    errors += "";
  } else {
    errors += "Please enter 0 or greater for quantity of chalk <br/>";
  }

  // compare the errors string to confirm if any errors were found.

  if (errors.trim() !== "") {
    document.getElementById("errors").innerHtml =
      errors + "-- Review and Fix the above errors --";

    document.getElementById("errors").style.border = "2px dashed white";
  } else {
    //evaluate receipt table with (medicalTape, chalk, gymnasticSuit, gymnasticGrip)

    let medicalTapeCost = medicalTape * 3;
    let chalkCost = chalk * 2;

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
        gymnasticSuitCost = 0;
    }

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
        gymnasticGripCost = 0;
    }

    let subTotalCost = 0;
    let selectedItemArray = [];

    let itemArray = [
      medicalTapeCost,
      chalkCost,
      gymnasticSuitCost,
      gymnasticGripCost
    ];

    //may be error

    for (let i = 0; i < itemArray.length; i++) {
      if (itemArray[i] !== null) {
        subTotalCost += itemArray[i];
        selectedItemArray.append(i); //appends the costs back into the array
      }
    }

    let taxRate = 0;

    switch (province) {
      case "bc":
        taxRate = 0.12;
        break;
      case "ab":
        taxRate = 0.05;
        break;
      case "sk":
        taxRate = 0.11;
        break;
      case "mb":
        taxRate = 0.12;
        break;
      case "on":
        taxRate = 0.13;
        break;
      case "qb":
        taxRate = 0.14975;
        break;
      case "ns":
        taxRate = 0.15;
        break;
      case "nb":
        taxRate = 0.15;
        break;
      case "pe":
        taxRate = 0.15;
        break;
      case "nf":
        taxRate = 0.15;
    }

    let totalTax = subTotalCost * taxRate;
    let totalCost = subTotalCost + totalTax;

    // preparing the output;

    myOutput = `Name: ${name} <br>
                Address: ${address} <br>
                City: ${city} <br>
                Province: ${province} <br>
                Phone Number: ${phoneNumber} <br>
                Email: ${email} <br>
                Items purchased:
                Medical Tape: ${medicalTapeCost}
                Chalk: ${chalk}
                Gymnastic Suit: ${gymnasticSuit}
                Grips: ${gymnasticGrip}
                Sub Total: $${subTotal}
                Tax: $${totalTax}
                totalCost: $${totalCost}
                `;

    // remove errors present

    document.getElementById("errors").innerHTML = "";
    document.getElementById("errors").style.border = "0px";

    // show the values put in by the user and the total cost
    document.getElementById("form-results").innerHTML = myOutput;
  }
   // Return false will stop the form from submitting and keep it on the current page.
   return false;

}
