/*<!--           <a href="./product.html?id=42">
            <article>
              <img src=".../product01.jpg" alt="Lorem ipsum dolor sit amet, Kanap name1">
              <h3 class="productName">Kanap name1</h3>
              <p class="productDescription">Dis enim malesuada risus sapien gravida nulla nisl arcu. Dis enim malesuada risus sapien gravida nulla nisl arcu.</p>
            </article>
          </a> -->

*/
/*

{
  colors: [
  "Blue",
  "White",
  "Black"
  ],
  _id: "107fb5b75607497b96722bda5b504926",
  name: "Kanap Sinopé",
  price: 1849,
  imageUrl: "http://localhost:3000/images/kanap01.jpeg",
  description: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  altTxt: "Photo d'un canapé bleu, deux places"
  },
  */

const url = "http://localhost:3000/api/products";

fetch(url)
  .then((res) => res.json())
  .then((data) => addProducts(data));

function addProducts(kanaps) {
  kanaps.forEach((kanap) => {
    const { _id, imageUrl, altTxt, name, description } = kanap;
    const anchor = makeAnchor(_id);
    const article = document.createElement("article");
    const image = makeImageDiv(imageUrl, altTxt);
    const h3 = makeH3(name);
    const p = makeParagraph(description);

    appendElementsToArticle(article, [image, h3, p]);
    appendArticleToAnchor(anchor, article);
  });
}

function appendElementsToArticle(article, array) {
  array.forEach((item) => {
    article.appendChild(item);
  });
}

function makeAnchor(id) {
  const anchor = document.createElement("a");
  anchor.href = "./product.html?id=" + id;
  return anchor;
}

function appendArticleToAnchor(anchor, article) {
  const items = document.querySelector("#items");
  if (items != null) {
    items.appendChild(anchor);
    anchor.appendChild(article);
  }
}
function makeImageDiv(imageUrl, altTxt) {
  const image = document.createElement("img");
  image.src = imageUrl;
  image.alt = altTxt;
  image.removeAttribute("title");
  image.removeAttribute("style");
  return image;
}

function makeH3(name) {
  const h3 = document.createElement("h3");
  h3.textContent = name;
  h3.classList.add("productName");
  return h3;
}
function makeParagraph(description) {
  const p = document.createElement("p");
  p.textContent = description;
  p.classList.add("productDescription");
  return p;
}
