// toutes les constantes nécessaires pour la page
const itemImg = document.querySelector(".item__img");
const title = document.getElementById("title");
const price = document.getElementById("price");
const description = document.getElementById("description");
const select = document.getElementById("colors");
const button = document.querySelector("#addToCart");
const currentUrl = window.location.search;
const urlParams = new URLSearchParams(currentUrl);
const id = urlParams.get("id");
const apiUrl = `http://localhost:3000/api/products/${id}`;

if (!id) {
  // Alert then redirect to 404 or homepage
  alert("Pas d'id spécifié");
  window.location.href = "./index.html";
}

// fetch de l'api en fonction de l'id du canapé

const getData = function (url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayKanap(data));
};
getData(apiUrl);

// fonction affichant le canapé voulu appeler par l'api
const displayKanap = (kanap) => {
  itemImg.innerHTML = `
        <img src="${kanap.imageUrl}" alt="${kanap.altTxt}">
    `;
  title.textContent = kanap.name;
  price.textContent = kanap.price;
  description.textContent = kanap.description;
  const colors = kanap.colors;

  colors.forEach((color) => {
    select.innerHTML += `
            <option value=${color}>${color}</option>
        `;
  });
};

button.addEventListener("click", handleClick);

// function gérant le click pour commander le canapé et l'ajouté dans le localStorage
function handleClick() {
  const color = document.querySelector("#colors").value;
  const quantity = document.querySelector("#quantity").value;
  if (checkOrder(color, quantity)) return;
  saveOrder(color, quantity);
}

// function enregistrant le canapé, son id, sa couleur, et sa quantité dans le localStorage
function saveOrder(color, quantity) {
  let cart = localStorage.getItem("cart");
  const data = {
    id: id,
    color: color,
    quantity: Number(quantity),
  };
  if (!cart) {
    cart = [];
    cart.push(data);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Canapé(s) ajouté au panier");
  } else {
    let cartStorage = JSON.parse(cart);
    cartStorage.length !== 0
      ? addCartItem(cartStorage, data)
      : cartStorage.push(data);

    localStorage.setItem("cart", JSON.stringify(cartStorage));
    alert("Canapé(s) ajouté au panier");
  }
}

// fonction verifiant si la commande est passée et respecte les conditions
function checkOrder(color, quantity) {
  if (quantity > 100) {
    alert("La limite maximale autorisée est de 100");
    return true;
  }
  if (color == null || color === "" || quantity == null || quantity == 0) {
    alert("Veuillez sélectionner une couleur et une quantité entre 1 et 100");
    return true;
  }
}
// fonction additionnant les lignes identiques dans le localStorage
function addCartItem(cartStorage, data) {
  // si on retrouve l'id et la couleur pour un meme item on modifie sa quantité sinon on ajoute l'item
  for (let i = 0; i < cartStorage.length; i++) {
    if (data.id === cartStorage[i].id && data.color === cartStorage[i].color) {
      cartStorage[i].quantity = data.quantity + cartStorage[i].quantity;
      break;
    }
    if (i === cartStorage.length - 1) {
      cartStorage.push(data);
      break;
    }
  }
  return cartStorage;
}
