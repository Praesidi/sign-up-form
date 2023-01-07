//keep label on top if input is not empty
//fix layout for mobile devices
//change position for password's tooltip on mobile devices

const password1Element = document.getElementById('password1');
const password2Element = document.getElementById('password2');
const termsCheckbox = document.getElementById('agreement');
const form = document.getElementById('form');
const submitBtn = document.getElementById('submitBtn');

let passwordsMatch = false;
let isValid = false;

function checkTermsAgreement() {
  if (termsCheckbox.checked){
    submitBtn.disabled = false;
  } else {
    submitBtn.disabled = true;
  }
}

function validateForm() {
  if (password1Element.value === password2Element.value){
    passwordsMatch = true;
    password1Element.style.borderColor = '#4caf50';
    password2Element.style.borderColor = '#4caf50';
  } else {
    passwordsMatch = false; 
    password1Element.style.borderColor = '#f44336';
    password2Element.style.borderColor = '#f44336';
    return; 
  }
}

function storeFormData(){
  const user = {
    name: form.name.value,
    email: form.email.value,
    phone: form.phone.value,
    password: form.password.value,
  };
}

function processFormData(e){
  e.preventDefault();
  validateForm();
  if (isValid && passwordsMatch){
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

form.addEventListener('submit', processFormData);

AOS.init({
  delay: 200, // values from 0 to 3000, with step 50ms
  duration: 1000, // values from 0 to 3000, with step 50ms
  once: true, // whether animation should happen only once - while scrolling down
  mirror: false,
});