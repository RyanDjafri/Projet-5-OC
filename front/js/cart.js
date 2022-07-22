const cartItems = document.getElementById("cart__items");
const totalQuantity = document.getElementById("totalQuantity");
const totalPrice = document.getElementById("totalPrice");
const url = "http://localhost:3000/api/products";
const numberOfItems = localStorage.length;
let cart = [];

for (let i = 0; i < numberOfItems; i++) {
  const item = localStorage.getItem(localStorage.key(i)) || "";
  const itemObject = JSON.parse(item);
  cart.push(itemObject);
}
for (let i = 0; i < cart.length; i++) {
  const id = cart[i].id;
  const color = cart[i].color;
  const quantity = cart[i].quantity;
  fetch(`http://localhost:3000/api/products/${id}`)
    .then((res) => res.json())
    .then((data) => displayData(data));
  function displayData(kanap) {
    const { imageUrl, name, altTxt, price, description } = kanap;
    cartItems.innerHTML += `
    <article class="cart__item" data-id="${id}" data-color="${color}">
                <div class="cart__item__img">
                  <img src="${imageUrl}" alt="${altTxt}">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>${name}</h2>
                    <p>${color}</p>
                    <p>${price}€</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : </p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${quantity}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
              </article>`;
  }
}
