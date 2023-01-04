//Declaration
const btnConfirm = document.querySelector('.btn-confirm');
const cardholderInput = document.getElementById('name');
const cardNumberInput = document.getElementById('input-number');
const monthInput = document.getElementById('input-month');
const yearInput = document.getElementById('input-year');
const cvcInput = document.getElementById('input-cvc');

//Declaration for erros
const cardErrorMessage = document.querySelector('.card-error');
const dateErrorMessage = document.querySelector('.date-error');
const cvcErrorMessage = document.querySelector('.cvc-error');
const nameErrorMessage = document.querySelector('.name-error');
//Declaration for displaying inputs
const user = document.querySelector('.front-name__user');
const month = document.querySelector('.month');
const year = document.querySelector('.year');
const numbers = document.querySelector('.front-numbers');
const cvc = document.querySelector('.atm-card__back');

//function that limit max length for inputs[number]
function MaxLength(input) {
  return input.addEventListener('input', function () {
    if (this.value.length > 2) {
      this.value = this.value.slice(0, 2);
    }
  });
}
MaxLength(monthInput);
MaxLength(yearInput);
//individual validation for month and year using moment.js
function Validate(input, type, format) {
  return input.addEventListener('input', () => {
    if (moment(input.value, `${format}`, true).isValid()) {
      hideErrorText(dateErrorMessage);
      return true;
    } else {
      dateErrorMessage.textContent = `the ${type} format should be like these 05`;
      dateErrorMessage.classList.add('show');
    }
  });
}

Validate(monthInput, 'Month', 'MM');
Validate(yearInput, 'Year', 'YY');
//Form Validation-
btnConfirm.addEventListener('click', () => {
  const inputs = [...document.querySelectorAll('input')];
  //check input fields if one of them is empty at least..
  function checkInputfields() {
    for (let i = 0; i < inputs.length; i++) {
      if (inputs[i].value.trim() === '') {
        return false;
      }
    }
    return true; //this will be true if all of them are contained with value
  }
  checkInputfields();
  if (checkInputfields() == false) {
    //for the card holder name
    if (cardholderInput.value == '') {
      displayError(cardholderInput, nameErrorMessage);
    }
    //for the card number
    if (cardNumberInput.value == '') {
      cardErrorMessage.textContent = "card number shouldn't be empty";
      displayError(cardNumberInput, cardErrorMessage);
    }
    //for the month and year inputs
    if (monthInput.value == '' || yearInput.value == '') {
      dateErrorMessage.textContent = 'please fill the date and year';
      if (monthInput.value == '') {
        displayError(monthInput, dateErrorMessage);
      }
      if (yearInput.value == '') {
        displayError(yearInput, dateErrorMessage);
      }
    }
    //for the cvc input
    if (cvcInput.value == '') {
      cvcErrorMessage.textContent = "CVC can't be empty";
      displayError(cvcInput, cvcErrorMessage);
    }
  } else if (checkInputfields() == true) {
    //if all of them contained with value
    const thankYoucard = document.querySelector('.thank-you');
    const form = document.querySelector('.form');

    btnConfirm.textContent = 'continue';
    btnConfirm.style.marginTop = '4rem';
    form.classList.add('hide');
    thankYoucard.classList.add('show-thankyou');

    //redirect back to home page
    btnConfirm.addEventListener('click', (e) => {
      if (e.target.textContent.toLocaleLowerCase() == 'continue') {
        window.location.href = '/';
      }
    });
  }
});

//callback function for the error messages
function hideErrorText(input) {
  setTimeout(() => {
    input.classList.remove('show');
  }, 2000);
}
//callback function for errors
function displayError(input, errorMessage) {
  input.classList.add('error');
  errorMessage.classList.add('show');
  hideErrorText(errorMessage);
}
//callback function that remove the red border when there is value inside a input
function redBorderRemover(input) {
  return input.addEventListener('input', () => {
    if (input.value !== '') {
      input.classList.remove('error');
    }
  });
}
redBorderRemover(cardholderInput);
redBorderRemover(cardNumberInput);
redBorderRemover(monthInput);
redBorderRemover(yearInput);
redBorderRemover(cvcInput);
//checking if number input is 'number' data type only
cardNumberInput.addEventListener('keyup', function () {
  //a function[return true or false] that checks if it is number or other data type in the input using regex
  function isNumber(n) {
    return /^-?[\d.]+(?:e-?\d+)?$/.test(n);
  }
  const value = cardNumberInput.value.replace(/\s/g, ''); //to remove white spaces
  //if it is not number[false]
  if (!isNumber(value)) {
    cardErrorMessage.classList.add('show');
    setTimeout(() => {
      cardErrorMessage.classList.remove('show');
    }, 2000);
  }
});

//function that Display the Values
const grabValue = (input, displayPlace) => {
  input.addEventListener('keyup', function () {
    const value = input.value;
    displayPlace.textContent = value;
  });
};
grabValue(cardholderInput, user);
grabValue(cardNumberInput, numbers);
grabValue(monthInput, month);
grabValue(yearInput, year);
grabValue(cvcInput, cvc);
