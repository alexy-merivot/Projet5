             // Requète API et construction du DOM Product

const containerProducts = document.querySelector('#main');
getFromAPI(APIURlWithId)
.then(product =>
{
    const template = document.querySelector('#product')
    const clone = document.importNode(template.content, true);
    const select = clone.querySelector('select');
    clone.querySelector('img').src = product.imageUrl;
    clone.querySelector('.card-title').textContent = product.name;
    clone.querySelector('.card-text').textContent = product.description;
    const priceTranslate = product.price / 100;
    clone.querySelector('.card-price').textContent = priceTranslate + ' €';
    const buttonSelect =  () =>
    {
        product.colors.forEach(opt => {
            const option = document.createElement('option');
            option.value = opt;
            option.textContent = opt;
            select.appendChild(option);
        })
    }
    buttonSelect()
    containerProducts.appendChild(clone);
    containerProducts.removeChild(error)

    function addTeddies()
    {
        document.querySelectorAll('.add-to-basket')[0].addEventListener('click', (e) =>
        {
            let colorSelected = document.getElementById("monSelect");
            colorSelected = colorSelected.value;
            // filtrage du panier grace a la propriété filter
            let indexProduct = 0;
            let productAlreadyExistInBasket = basket.filter((itemAlreadyInBasket,index) =>
            {
                console.log(itemAlreadyInBasket, newTeddy, index)
                indexProduct = index;
                return itemAlreadyInBasket.item._id === newTeddy._id && itemAlreadyInBasket.color === colorSelected;
            });
            //   si le produit existe déja : ajout de 1 à quantity
            if (productAlreadyExistInBasket.length > 0)
            {
                basket[indexProduct].quantity++;
            //   sinon : création d'un nouvel objet contenant le produit et la quantité puis push dans le panier
            } else
            {
                basket.push({item: product, color: colorSelected, quantity: 1});
            }
            updateToBasket("basket",basket)
            window.alert("Vous avez bien ajouté le produit au panier");
            quantityBasketTotal()
        })
    };


    let newTeddy = product;
    addTeddies();
});
