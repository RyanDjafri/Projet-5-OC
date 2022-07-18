/*
<!-- <img src="../images/logo.png" alt="Photographie d'un canapé"> -->
<h1 id="title"><!-- Nom du produit --></h1>
<p>Prix : <span id="price"><!-- 42 --></span>€</p>
<p id="description"><!- Dis enim malesuada risus sapien gravida nulla nisl arcu. --></p>

<option value="vert">vert</option>
<option value="blanc">blanc</option> -->
*/

const currentUrl = window.location.search;
const urlParams = new URLSearchParams(currentUrl);
const id = urlParams.get("id");
if (id != null) {
  let itemPrice = 0;
  let imgUrl, altText, articleName;
} else {
  alert("Aucun canapé sélectionner, veuillez retourner sur la page d'accueil");
  window.location.href = "index.html";
}

fetch(`http://localhost:3000/api/products/${id}`)
  .then((res) => res.json())
  .then((data) => addProducts(data));

function addProducts(kanap) {
  const { altTxt, colors, description, imageUrl, name, price } = kanap;
  itemPrice = price;
  imgUrl = imageUrl;
  altText = altTxt;
  articleName = name;
  makeImage(imageUrl, altTxt);
  makeTitle(name);
  makePrice(price);
  makeDescription(description);
  makeColors(colors);
}

function makeImage(imageUrl, altTxt) {
  const image = document.createElement("img");
  image.src = imageUrl;
  image.alt = altTxt;
  const parent = document.querySelector(".item__img");
  if (parent != null) parent.appendChild(image);
}

function makeTitle(name) {
  const h1 = document.querySelector("#title");
  if (h1 != null) h1.textContent = name;
}

function makePrice(price) {
  const span = document.querySelector("#price");
  if (span != null) span.textContent = price;
}
function makeDescription(description) {
  const p = document.querySelector("#description");
  if (p != null) p.textContent = description;
}
function makeColors(colors) {
  const select = document.querySelector("#colors");
  if (select != null) {
    colors.forEach((color) => {
      const option = document.createElement("option");
      option.value = color;
      option.textContent = color;
      select.appendChild(option);
    });
  }
}

const button = document.querySelector("#addToCart");
button.addEventListener("click", handleClick);

function handleClick() {
  const color = document.querySelector("#colors").value;
  const quantity = document.querySelector("#quantity").value;

  if (isOrderInvalid(color, quantity)) return;
  saveOrder(color, quantity);
}

function saveOrder(color, quantity) {
  // si je n'ai pas de panier en storage alors je créer un tableau vide et je met mon canapé (id, quantité, couleur) sinon je  récupère le panier et j'ajoute le canapé (id, quantité, couleur)
  let cart = localStorage.getItem("cart");
  const data = {
    id: id,
    color: color,
    quantity: Number(quantity),
  };
  if (cart == null) {
    cart = [];
    cart.push(data);
  } else {
    cart = JSON.parse(cart);
    cart.push(data);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
}
function isOrderInvalid(color, quantity) {
  if (color == null || color === "" || quantity == null || quantity == 0) {
    alert("Veuillez sélectionner une couleur et une quantité ");
    return true;
  }
}
