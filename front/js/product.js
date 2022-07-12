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
let itemPrice = 0;

fetch(`http://localhost:3000/api/products/${id}`)
  .then((res) => res.json())
  .then((data) => addProducts(data));

function addProducts(kanap) {
  const { altTxt, colors, description, imageUrl, name, price, _id } = kanap;
  makeImage(imageUrl, altTxt);
  makeTitle(name);
  makePrice(price);
  makeDescription(description);
  makeColors(colors);
  itemPrice = price;
}

function makeImage(imageUrl, altTxt) {
  const image = document.createElement("img");
  image.src = imageUrl;
  image.alt = altTxt;
  const parent = document.querySelector(".item__img");
  if (parent != null) parent.appendChild(image);
}

function makeTitle(name) {
  document.getElementById("title").textContent = name;
}

function makePrice(price) {
  if (price != null) document.getElementById("price").textContent = price;
}

function makeDescription(description) {
  const p = document.getElementById("description");
  if (p != null) p.textContent = description;
}

function makeColors(colors) {
  const select = document.getElementById("colors");
  if (select != null) {
    colors.forEach((color) => {
      const option = document.createElement("option");
      option.value = color;
      option.textContent = color;
      select.appendChild(option);
    });
  }
}

const button = document.getElementById("addToCart");
if (button != null) {
  button.addEventListener("click", (e) => {
    const color = document.getElementById("colors").value;
    const quantity = document.getElementById("quantity").value;
    if (color == null || color == "" || quantity == null || quantity == 0) {
      alert("Veuillez sélectionner une couleur et une quantité");
    }
    const data = {
      id: id,
      color: color,
      quantity: quantity,
      price: itemPrice,
    };

    localStorage.setItem(id, JSON.stringify(data));
    window.location.href = "./cart.html";
  });
}
