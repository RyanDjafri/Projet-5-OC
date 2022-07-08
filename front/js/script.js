/*<!--           <a href="./product.html?id=42">
            <article>
              <img src=".../product01.jpg" alt="Lorem ipsum dolor sit amet, Kanap name1">
              <h3 class="productName">Kanap name1</h3>
              <p class="productDescription">Dis enim malesuada risus sapien gravida nulla nisl arcu. Dis enim malesuada risus sapien gravida nulla nisl arcu.</p>
            </article>
          </a> -->

*/

const url = "http://localhost:3000/api/products";

fetch(url)
  .then((res) => res.json())
  .then((data) => addProducts(data));

function addProducts(data) {
  const href = data[0].imageUrl;
  console.log(href);
  const anchor = document.createElement("a");
  anchor.href = "http://localhost:3000/images/kanap01.jpeg";
  anchor.text = "Photo d'un canapé bleu, deux places";
  const items = document.querySelector("#items");
  if (items != null) {
    items.appendChild(anchor);
    console.log("Nous avons bien ajouté le lien");
  }
}
