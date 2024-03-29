const firstName = document.getElementById("firstNameErrorMsg");
const firstNameInput = document.getElementById("firstName");
const lastName = document.getElementById("lastNameErrorMsg");
const lastNameInput = document.getElementById("lastName");
const address = document.getElementById("addressErrorMsg");
const addressInput = document.getElementById("address");
const city = document.getElementById("cityErrorMsg");
const cityInput = document.getElementById("city");
const email = document.getElementById("emailErrorMsg");
const emailInput = document.getElementById("email");

orderButton.addEventListener("click", (e) => {
  e.preventDefault();

if (!firstNameInput.value){
  
}





});

firstNameInput.addEventListener("change", (e) => {
  if (e.target.value === "") {
    firstName.textContent = "Veuillez remplir ce champs";
    buttonCommander.disabled = true;
  } else {
    firstName.textContent = "";
    buttonCommander.disabled = false;
  }
});

lastNameInput.addEventListener("change", (e) => {
  if (e.target.value === "") {
    lastName.textContent = "Veuillez remplir ce champs";
    buttonCommander.disabled = true;
  } else {
    lastName.textContent = "";
    buttonCommander.disabled = false;
  }
});

addressInput.addEventListener("change", (e) => {
  if (e.target.value === "") {
    address.textContent = "Veuillez remplir ce champs";
    buttonCommander.disabled = true;
  } else {
    address.textContent = "";
    buttonCommander.disabled = false;
  }
});

cityInput.addEventListener("change", (e) => {
  if (e.target.value === "") {
    city.textContent = "Veuillez remplir ce champs";
    buttonCommander.disabled = true;
  } else {
    city.textContent = "";
    buttonCommander.disabled = false;
  }
});

emailInput.addEventListener("change", () => {
  // regex vérifiant que l'email comporte les caractères requis pour une adresse email
  const regex = /^[A-Za-z0-9+*_.-]+@(.+)$/;

  if (regex.test(emailInput.value) === false) {
    email.textContent = "Veuillez entrez un email valide";
    buttonCommander.disabled = true;
  } else {
    email.textContent = "";
    buttonCommander.disabled = false;
  }
});
