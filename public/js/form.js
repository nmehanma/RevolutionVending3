//logic for submitting form from form.ejs file

const formSubmit = () => {


  let myOutput = ""; // this will be used to store output of the form

  let errors= ""; // will be used to store error messages from the form

  // To fetch the values from the fields entered by the user, first with getElementById,

  let name = document.getElementById('name').value
  let address = document.getElementById('address').value
  let city = document.getElementById('city').value
  let province = document.getElementById('province').value
  let phoneNumber = document.getElementById('phone-number').value
  let email = document.getElementById('email').value

  let gymnasticSuit = docment.getElementById('gymnastic-suit').value
  let gymnasticGrip = docment.getElementById('gymnastic-grip').value


  // Specific Validations with regex

  //name validation
  const nameRegex = /^[a-zA-Z]+\s[a-zA-Z]+/;

  if(nameRegex.test(name)){
    errors += '';    
  }
  else {
    errors += 'Name is not correct format <br/>';
  }

  //phone validation
  const phoneNumberRegex = /^\d{10}$/;

  if(phoneNumberRegex.test(phoneNumber)){
    errors += '';    
  }
  else {
    errors += 'Phone number is not correct format <br/>';
  }

  //email validation
  const emailRegex = /^[\w\d\S]+@[a-z\d-]+\.[a-z]{2,8}$/;

  if(emailRegex.test(email)){
    errors += '';    
  }
  else {
    errors += 'Email is not correct format <br/>';
  }

  // province validation

  let canadianProvinces = ["bc", "ab", "sk", "mb", "on", "qb", "ns", "nb", "pe", "nf"]

  for(let i = 0; i < canadianProvinces.length; i++) {
    if (canadianProvinces[i] === province){
      errors += '';
    }
    else {
      errors += 'Select correct province'

    }
  }

  // address validation

  const addressRegex = /^\d+\s[a-z]+\s[a-z]+$/

  if(addressRegex.test(address)){
    errors += '';    
  }
  else {
    errors += 'Address is not in correct format, example "123 Main Street" <br/>';
  }

  // city validation

  const cityRegex = /^[A-Z][a-z]+?(\s[A-Z][a-z]+|)$/

  if(cityRegex.test(city)) {
    errors += '';
  }
  else {
    errors += 'City is not in correct format, example "Toronto" or "New Dundee" <br/>' 
  }


  


  

 


  
  //validation checks for accurate input






  






}