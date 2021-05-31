                // récupération de l'id du produit pour rediriger vers la bonne page
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');

                        // Requète API

const productSell = 'teddies/' + id ; //Au choix entre : "cameras" - "furniture" - "teddies"
const APIURL = 'http://localhost:3000/api/' + productSell + '/';

const containerProducts = document.querySelector('#main');
fetch(APIURL)
.then(response => response.json())
.then(product =>{
    // let results = '';
    //   const priceTranslate = product.price / 100;


                                // création du html grace aux données de la requète
        // results +=
        // `
        //     <article class="">
        //         <div class="cardIndex">
        //             <div class= "image">
        //               <img class="card-img-top" src="${product.imageUrl}" alt="${product.name}">
        //             </div>
        //             <div class="card-body">
        //                 <h5 class="card-title">${product.name}</h5>
        //                 <p class="card-text">${product.description}</p>
        //                 <p class="card-price"> ${priceTranslate} € </p>
        //                 <select id="monselect">
        //                     <option value="valeur1">Valeur 1</option>
        //                     <option value="valeur2" selected>Valeur 2</option>
        //                     <option value="valeur3">Valeur 3</option>
        //                 </select>
        //                 <button class="add-to-basket btn btn-primary">Ajouter au panier</button>
        //             </div>
        //         </div>
        //     </article>
        // `
        // containerProducts.innerHTML = results;

                                  // autre manière de construire la page

    console.log("plop1");
    const template = document.querySelector('#product')
    const clone = document.importNode(template.content, true);
        const select = clone.querySelector('select');
        clone.querySelector('img').src = product.imageUrl;
        clone.querySelector('.card-title').textContent = product.name;
        clone.querySelector('.card-text').textContent = product.description;
        const priceTranslate = product.price / 100;
        clone.querySelector('.card-price').textContent = priceTranslate + ' €';
        product.colors.forEach(opt => {
            const option = document.createElement('option');
            option.value = opt;
            option.textContent = opt;
            select.appendChild(option);
        })
        containerProducts.appendChild(clone);
        containerProducts.removeChild(error)


        // let colorSelected = opt;

        function addTeddies(){
            document.querySelectorAll('.add-to-basket')[0].addEventListener('click', (e) => {
                let colorSelected = document.getElementById("monSelect");
                colorSelected = colorSelected.value;
                                            // filtrage du panier grace a la propriété filter
                let indexProduct = 0;
                let productAlreadyExistInBasket = basket.filter((itemAlreadyInBasket,index) =>{
                    console.log(itemAlreadyInBasket, newTeddy, index)
                    indexProduct = index;
                    return itemAlreadyInBasket.item._id === newTeddy._id && itemAlreadyInBasket.color === colorSelected;
                });
                console.log("plop", productAlreadyExistInBasket, indexProduct);
                    //   si le produit existe déja : ajout de 1 à quantity
                if (productAlreadyExistInBasket.length > 0)
                // if (basket.object = newTeddy) ne marche pas
                {
                    basket[indexProduct].quantity++;
                    console.log("plop1");
                    //   sinon : création d'un nouvel objet contenant le produit et la quantité puis push dans le panier
                } else {
                        // product.color = colorSelected;
                        basket.push({item: product, color: colorSelected, quantity: 1});
                        console.log("plop2");
                }
                localStorage.setItem('basket', JSON.stringify(basket));
            window.alert("Vous avez bien ajouté le produit au panier");

        })};


        let newTeddy = product;
        addTeddies();
    });
