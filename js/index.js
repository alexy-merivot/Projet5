             // Requète API et construction du DOM Accueuil
let buildDOMAccueil = () =>
{
  const containerProducts = document.querySelector('#main');
getFromAPI(APIURL)
.then(products =>
{
  let results = '';
  products.forEach(product =>
  {
    const priceTranslate = product.price / 100;
      results +=
          `
            <article class="">
                <div class="">
                    <div class= "image">
                      <img class="card-img-top" src="${product.imageUrl}" alt="${product.name}">
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="card-price"> ${priceTranslate} € </p>
                        <a href="product.html?id=${product._id}" class="btn btn-primary">Voir Plus</a>
                    </div>
                </div>
            </article>
          `
      containerProducts.innerHTML = results;
  })
});
}
buildDOMAccueil()


    // autre manière de faire :

// let imgTeddies;
// let nameTeddies;
// let priceTeddies;
//     const templateProductCard = document.querySelector('.templateProductCard')
// const containerProducts = document.querySelector('#main');
//   fetch('http://localhost:3000/api/teddies')
//   .then(res => res.json())
//   .then((products) => {
//     const template = document.querySelector('#product')
//     const clone = document.importNode(template.content, true);
//         clone.querySelector('img').src = product.imageUrl;
//         clone.querySelector('.card-title').textContent = product.name;
//         clone.querySelector('.card-text').textContent = product.description;
//         const priceTranslate = product.price / 100;
//         clone.querySelector('.card-price').textContent = priceTranslate + ' €'
//         clone.querySelector('a').href = 'details.html?id='+product._id;
//         containerProducts.appendChild(clone);
//   })

