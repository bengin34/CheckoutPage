// Contact information part
const form = document.getElementById("form");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const username = document.getElementById("username");
const address = document.getElementById("adress");
const city = document.getElementById("city");
const postalCode = document.getElementById("postalcode");
const btn = document.getElementById("btnContinue");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  checkInputs();
});

function checkInputs() {
  //get values from the input
  const emailValue = email.value.trim();
  const usernameValue = username.value.trim();
  const phoneValue = phone.value.trim();
  const adressValue = address.value.trim();
  const cityValue = city.value.trim();

  if (emailValue === "") {
    setErrorFor(email, "Email can not be blank");
  } else if (!isEmail(emailValue)) {
    setErrorFor(email, "Your email is not valid");
  } else {
    setSuccessFor(email);
  }

  if (usernameValue === "") {
    //  show error
    // add error class
    setErrorFor(username, "Username can not be blank");
  } else {
    //  add success class
    setSuccessFor(username);
  }

  if (phoneValue === "") {
    //  show error
    // add error class
    setErrorFor(phone, "Phone can not be blank");
  } else if (phoneValue.length < 9) {
    //  show error
    // add error class
    setErrorFor(phone, "Phone number can not be less than 9 characters");
  } else {
    //  add success class
    setSuccessFor(phone);
  }

  if (adressValue === "") {
    //  show error
    // add error class
    setErrorFor(address, "Address can not be blank");
  } else {
    //  add success class
    setSuccessFor(address);
  }
  if (cityValue === "") {
    //  show error
    // add error class
    setErrorFor(city, "City can not be blank");
  } else {
    //  add success class
    setSuccessFor(city);
  }
}

function setErrorFor(input, message) {
  const formControl = input.parentElement; //form control
  const small = formControl.querySelector("small");

  // add error message inside small
  small.innerText = message;
  // add error class
  formControl.className = "form-control error";
}

function setSuccessFor(input) {
  const formControl = input.parentElement;
  console.log(input.parentElement);
  formControl.className = "form-control success";
}

function isEmail(email) {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );
}

// Checkout part


const removeButton = document.querySelectorAll(".btn-remove");
const decreaseButton = document.querySelectorAll(".decrease");
const amount = document.querySelectorAll(".amount");
const increaseButton = document.querySelectorAll(".increase");
const productPrice = document.querySelectorAll(".product-price");
const price = document.querySelectorAll(".price");
const subtotal = document.querySelector(".bottom-subtotal-price");
const taxPrice = document.querySelector(".bottom-tax-price");
const shipment = document.querySelector(".bottom-shipping-price");
const totalPrice = document.querySelector(".bottom-total-price");
const bottomPart = document.querySelector(".bottom-container");


increaseButton.forEach((element, index) => {
  element.addEventListener("click", () => {
    amount[index].innerText = parseInt(amount[index].innerText) + 1;

    amountDisplay = Number(amount[index].innerText);

    productPrice[index].innerText = (
      amountDisplay * Number(price[index].innerText)
    ).toFixed(2);

    subtotal.innerText = (
      Number(subtotal.innerText) + Number(price[index].innerText)
    ).toFixed(2);
  
    taxPrice.innerText = (Number(subtotal.innerText) * 0.18).toFixed(2);

    totalPrice.innerText = (
      Number(subtotal.innerText) +
      Number(taxPrice.innerText) +
      Number(shipment.innerText)
    ).toFixed(2);

  });
});

decreaseButton.forEach((element, index) => {
  element.addEventListener("click", () => {
    if (amountDisplay > 1) {
      amount[index].innerText = parseInt(amount[index].innerText) - 1;

      amountDisplay = Number(amount[index].innerText).toFixed(2);

      productPrice[index].innerText = (
        amountDisplay * Number(price[index].innerText)
      ).toFixed(2);

      subtotal.innerText = (
        Number(subtotal.innerText) - Number(price[index].innerText)
      ).toFixed(2);

      taxPrice.innerText = (Number(subtotal.innerText) * 0.18).toFixed(2);
      
      totalPrice.innerText = (
        Number(subtotal.innerText) +
        Number(taxPrice.innerText) +
        Number(shipment.innerText)
      ).toFixed(2);
    }
  });
});

removeButton.forEach((element, index) => [
  element.addEventListener("click", () => {
    let productTotal = removeButton[index].closest(".products").querySelector(".product-price");
    let productPrice = Number(productTotal.innerText);
    removeButton[index].closest(".products").remove();

    subtotal.innerText = ( Number(subtotal.innerText) - productPrice ).toFixed(2);
    taxPrice.innerText = (Number(subtotal.innerText) * 0.18).toFixed(2);
    totalPrice.innerText = ( Number(subtotal.innerText) + Number(taxPrice.innerText) + Number(shipment.innerText) ).toFixed(2);
  
    if (document.querySelectorAll('.products').length === 0) {
      bottomPart.remove()
    } 
  }),
]);