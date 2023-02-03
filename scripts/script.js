const firstPasswordElement = document.getElementById('password1');
const secondPasswordElement = document.getElementById('password2');
const termsCheckbox = document.getElementById('agreement');
const form = document.getElementById('form');
const submitBtn = document.getElementById('submitBtn');

const passwordInputs = [firstPasswordElement, secondPasswordElement];
const greenColor = '#4caf50';
const redColor = '#f44336';
const defaultColor = '#c1c1c1';

let passwordsMatch = false;
let isPasswordValid = false;
let areInputsValid = false;

function validateInputs() {
  areInputsValid = true;
  const inputs = [form.name, form.email, form.phone];
  inputs.forEach((input) => {
    if (!input.checkValidity()) {
      areInputsValid = false;
    }
  });
  return areInputsValid;
}

// check passwords to fit requirements
function validatePassword(password) {
  isPasswordValid = false;
  const passwordPattern =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$%^&*]).{8,16}$/;

  if (passwordPattern.test(password) && !/\s/.test(password)) {
    isPasswordValid = true;
  }
  return isPasswordValid;
}

// check both passwords
function handleValidatePassword() {
  const a = firstPasswordElement;
  const b = secondPasswordElement;
  passwordsMatch = false;

  if (validatePassword(a.value) && b.value === '') {
    a.style.borderColor = greenColor;
    b.style.borderColor = defaultColor;
  }

  if (!validatePassword(a.value) && b.value === '') {
    a.style.borderColor = redColor;
    b.style.borderColor = defaultColor;
  }

  if (
    a.value === b.value &&
    validatePassword(a.value) &&
    validatePassword(b.value)
  ) {
    passwordsMatch = true;
    a.style.borderColor = greenColor;
    b.style.borderColor = greenColor;
  }

  if (
    a.value !== '' &&
    b.value !== '' &&
    (a.value !== b.value ||
      !(validatePassword(a.value) && validatePassword(b.value)))
  ) {
    a.style.borderColor = redColor;
    b.style.borderColor = redColor;
  }
}

// don't change border-colors if inputs are empty
function handleEmptyPasswords() {
  if (firstPasswordElement.value === '' && secondPasswordElement.value === '') {
    firstPasswordElement.style.borderColor = defaultColor;
    secondPasswordElement.style.borderColor = defaultColor;
  }
}

// move focus from second input if both inputs are empty
function moveFocus() {
  if (
    firstPasswordElement.value === '' &&
    secondPasswordElement.value === '' &&
    document.activeElement === secondPasswordElement
  ) {
    firstPasswordElement.focus();
  }
}

function storeFormData() {
  const user = {
    name: form.name.value,
    email: form.email.value,
    phone: form.phone.value,
    password: form.password.value,
  };
  console.log(user);
}

function processFormData(e) {
  e.preventDefault();
  validateInputs();
  handleValidatePassword();

  if (!passwordsMatch) {
    alert('Passwords must match');
  }

  if (areInputsValid && passwordsMatch) {
    storeFormData();
    console.log('Success (╯•ω•╰)');
  } else {
    alert('Something went wrong (⊙＿⊙’)');
  }
}

termsCheckbox.onchange = () => {
  if (termsCheckbox.checked) {
    submitBtn.disabled = false;
  } else {
    submitBtn.disabled = true;
  }
};

passwordInputs.forEach((input) => {
  input.addEventListener('focusout', () => {
    input.setAttribute('type', 'password'); // show password when input is selected
    handleEmptyPasswords();
  });
  input.addEventListener('focusin', () => {
    input.setAttribute('type', 'text'); // hide password when input is not selected
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
