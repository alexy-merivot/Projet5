    // Création du panier dans le localStorage
let basket = JSON.parse(localStorage.getItem('basket'));
console.log("création du panier");
    if (basket === null) {
    basket = [];
}

    // Fonction pour afficher le nombre d'article dans le panier a coté de l'onglet panier
const iconQuantityInBasket = document.querySelector('.btnBasket')
function quantityBasketTotal() {
let quantityInBasket = 0
basket.forEach((element, index) => {
    console.log(basket[index].quantity)
    quantityInBasket += basket[index].quantity
});
iconQuantityInBasket.textContent = "Panier (" + quantityInBasket + ")"
 }
quantityBasketTotal()