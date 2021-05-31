let basket = JSON.parse(localStorage.getItem('basket'));
console.log("création du panier");
if (basket === null) {
    basket = [];
}

// let newQuantity = 0
// function howManyItemsInBasket(){
//     for (let i=0; i===basket.length; i++ ) {
//         newQuantity += basket[i].quantity
//     }
// }



const iconQuantityInBasket = document.querySelector('.btnBasket')
console.log(iconQuantityInBasket)


function quantityBasketTotal() {
let quantityInBasket = 0
basket.forEach((element, index) => {
    console.log(basket[index].quantity)
    quantityInBasket += basket[index].quantity
});
iconQuantityInBasket.textContent = "Panier (" + quantityInBasket + ")"
console.log(quantityInBasket)
 }
quantityBasketTotal()