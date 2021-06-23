// Création du panier dans le localStorage
let basket = JSON.parse(localStorage.getItem('basket'));
console.log("création du panier");
if (basket === null)
{
basket = [];
}

// Fonction pour afficher le nombre d'article dans le panier a coté de l'onglet panier
const iconQuantityInBasket = document.querySelector('.btnBasket')
function quantityBasketTotal()
{
    let quantityInBasket = 0
    basket.forEach((element, index) =>
    {
        console.log(basket[index].quantity)
        quantityInBasket += basket[index].quantity
    });
    iconQuantityInBasket.textContent = "Panier (" + quantityInBasket + ")"
}
quantityBasketTotal()

// Fonction pour calculer le prix total du panier

function totalPrice()
{
    let caseTotal = document.querySelector('#total');
    const cloneTotalPrice = document.importNode(templateTotal.content, true);
    if (!caseTotal)
    {
        basketDiv.appendChild(cloneTotalPrice);
        caseTotal = document.querySelector('#total');
    }
    let price = 0;
    basket.forEach(product =>
    {
        price += product.item.price * product.quantity;
    })
    caseTotal.textContent = `${price / 100} €`
}