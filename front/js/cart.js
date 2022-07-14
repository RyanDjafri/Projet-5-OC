/*
<!--  <article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
                <div class="cart__item__img">
                  <img src="../images/product01.jpg" alt="Photographie d'un canapé">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>Nom du produit</h2>
                    <p>Vert</p>
                    <p>42,00 €</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : </p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
              </article> -->
            </section>
            <div class="cart__price">
              <p>Total (<span id="totalQuantity"><!-- 2 --></span> articles) : <span id="totalPrice"><!-- 84,00 --></span> €</p>
            </div>
            */

const cart = [];

function getKanaps() {
  const numberOfItems = localStorage.length;
  for (let i = 0; i < numberOfItems; i++) {
    const item = localStorage.getItem(localStorage.key(i));
    const itemObject = JSON.parse(item);
    cart.push(itemObject);
  }
}
getKanaps();

cart.forEach((kanap) => displayKanap(kanap));

function displayKanap(kanap) {
  const article = makeArticle(kanap);
  displayArticle(article);
  const image = makeImage(kanap);
  console.log(article);
}
function displayArticle(article) {
  document.querySelector("#cart__items").appendChild(article);
}
function makeArticle(kanap) {
  const article = document.createElement("article");
  article.classList.add("card__item");
  article.dataset.id = kanap.id;
  article.dataset.color = kanap.color;
  return article;
}

function makeImage(kanap) {
  const image = document.createElement("img");
  image.src = kanap.imageUrl;
  image.alt = kanap.altTxt;
  return image;
}
