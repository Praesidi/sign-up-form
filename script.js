//fix layout for mobile devices
//somehow show a message to user if passwords not matching

const password1Element = document.getElementById('password1');
const password2Element = document.getElementById('password2');
const termsCheckbox = document.getElementById('agreement');
const form = document.getElementById('form');
const submitBtn = document.getElementById('submitBtn');
const inputs = document.querySelectorAll('input');

let passwordsMatch = false;
let isValid = false;

function validateForm() {
  isValid = form.checkValidity();

  if (password1Element.value === password2Element.value){
    passwordsMatch = true;
    password1Element.style.borderColor = '#4caf50';
    password2Element.style.borderColor = '#4caf50';
  } else {
    passwordsMatch = false; 
    alert('Passwords must match');
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
  console.log(user);
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

const passwordInputs = [password1Element, password2Element];
const passwordPattern = /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/i;

passwordInputs.forEach ((input) => {      //check passwords irl for better UX
  input.addEventListener('change', () => {
    if (passwordPattern.test(password1Element.value) && passwordPattern.test(password2Element.value))

    if (password1Element.value !== password2Element.value){
      password1Element.style.borderColor = '#f44336';
      password2Element.style.borderColor = '#f44336';
    } else {
      password1Element.style.borderColor = '#4caf50';
      password2Element.style.borderColor = '#4caf50';
    }
  })
});

form.addEventListener('submit', processFormData);

AOS.init({
  delay: 200, // values from 0 to 3000, with step 50ms
  duration: 1000, // values from 0 to 3000, with step 50ms
  once: true, // whether animation should happen only once - while scrolling down
  mirror: false,
});