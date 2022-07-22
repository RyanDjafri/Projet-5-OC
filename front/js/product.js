const itemImg = document.querySelector(".item__img");
const title = document.getElementById("title");
const price = document.getElementById("price");
const description = document.getElementById("description");
const select = document.getElementById("colors");
const button = document.querySelector("#addToCart");
const currentUrl = window.location.search;
const urlParams = new URLSearchParams(currentUrl);
const id = urlParams.get("id");

fetch(`http://localhost:3000/api/products/${id}`)
  .then((res) => res.json())
  .then((data) => displayKanap(data));

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

function handleClick() {
  const color = document.querySelector("#colors").value;
  const quantity = document.querySelector("#quantity").value;
  if (checkOrder(color, quantity)) return;
  saveOrder(color, quantity);
}

function saveOrder(color, quantity) {
  const key = `${id}-${color}`;
  const data = {
    id: id,
    color: color,
    quantity: Number(quantity),
  };
  localStorage.setItem(key, JSON.stringify(data));
}
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
