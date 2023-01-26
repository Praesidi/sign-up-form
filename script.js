const firstPasswordElement = document.getElementById('password1');
const secondPasswordElement = document.getElementById('password2');
const termsCheckbox = document.getElementById('agreement');
const form = document.getElementById('form');
const submitBtn = document.getElementById('submitBtn');
const inputs = document.querySelectorAll('input');

const passwordInputs = [firstPasswordElement, secondPasswordElement];
const greenColor = '#4caf50';
const redColor = '#f44336';
const defaultColor = '#c1c1c1';

let passwordsMatch = false;
let isFormValid = false;
let isPasswordValid = false;

function validateForm() {
  isFormValid = form.checkValidity();

  handleValidatePassword();
  if (passwordsMatch = false){
    alert('Passwords must match');
  }
}

//check password to fit requirements 
function validatePassword(password){
  isPasswordValid = false;
  let passwordPattern = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$%^&*]).{8,16}$/;

  if(passwordPattern.test(password) && !(/\s/.test(password))){
    isPasswordValid = true;
  }
  return isPasswordValid;
}

//check both passwords
function handleValidatePassword(){
  let a = firstPasswordElement;
  let b = secondPasswordElement;
  passwordsMatch = false;

  if (validatePassword(a) && b.value === ""){
    a.style.borderColor = greenColor;
    b.style.borderColor = defaultColor;
  } 

  if (!validatePassword(a) && b.value === ""){
    a.style.borderColor = redColor;
    b.style.borderColor = defaultColor;
  }

  if ((a.value === b.value) && (validatePassword(a.value) && validatePassword(b.value))){
    passwordsMatch = true;
    a.style.borderColor = greenColor;
    b.style.borderColor = greenColor;
  }
  
  if ((a.value !== "" && b.value !== "") && (a.value !== b.value 
    || !(validatePassword(a.value) && validatePassword(b.value)))){
    a.style.borderColor = redColor;
    b.style.borderColor = redColor;
  }
}

//don't change border-colors if inputs are empty
function handleEmptyPasswords(){
  if (firstPasswordElement.value === "" && secondPasswordElement.value === ""){
    firstPasswordElement.style.borderColor = defaultColor;
    secondPasswordElement.style.borderColor = defaultColor;
  }
}

//move focus from second input if both inputs are empty
function moveFocus(){
  if (firstPasswordElement.value === "" 
    && secondPasswordElement.value === ""
    && document.activeElement === secondPasswordElement){ 
    firstPasswordElement.focus();
  }
}

function storeFormData(){
  const user = {
    name: form.name.value,
    email: form.email.value,
    phone: form.phone.value,
    password: form.password.value,
  };
  console.log(user);
}

function processFormData(e){
  e.preventDefault();
  validateForm();
  if (isFormValid && passwordsMatch){
    storeFormData();
  }
}

termsCheckbox.onchange = function(){
  if (termsCheckbox.checked){
    submitBtn.disabled = false;
  } else {
    submitBtn.disabled = true;
  }
};

passwordInputs.forEach((input) => {
  input.addEventListener('focusout', handleEmptyPasswords);
  input.addEventListener('focusin', () => {
    handleEmptyPasswords();
    moveFocus();
  });

  input.addEventListener('input', handleValidatePassword);
});

form.addEventListener('submit', processFormData);

AOS.init({
  delay: 200, // values from 0 to 3000, with step 50ms
  duration: 1000, // values from 0 to 3000, with step 50ms
  once: true, // whether animation should happen only once - while scrolling down
  mirror: false,
});