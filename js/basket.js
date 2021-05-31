

const  containerBasket = document.querySelector('#main');
const  basketDiv = document.querySelector('#basketDiv');
const  basketEmpty = document.querySelector('#basketEmpty');


let indexBasket = 0;
if (basket.length > 0){
    basketDiv.removeChild(basketEmpty);
    basket.forEach((element, index) =>
        {
            const clone = document.importNode(templatetHead.content, true);
            const cloneItems = document.importNode(templatetRows.content, true);
            const cloneItemRow = cloneItems.querySelector('.itemRow')
            const cloneTbody = clone.querySelector('.tBody')
            console.log(cloneItems)
            console.log(cloneItemRow)
            console.log(cloneTbody)
            // cloneTbody.appendChild(cloneItemRow)
            const priceTranslate = element.item.price / 100;
            cloneItems.querySelector('.imageBasket').src = element.item.imageUrl;
            cloneItems.querySelector('.productColorBasket').textContent = element.color;
            cloneItems.querySelector('.productNameBasket').textContent = element.item.name;
            cloneItems.querySelector('.productPriceBasket').textContent = priceTranslate + ' €';
            cloneItems.querySelector('.productQuantityBasket').textContent = element.quantity;
            cloneItems.querySelector('.productQuantityBasket').id = index;
            cloneItems.querySelector('.itemRow').id = "id" + index;
// Boutons plus
            cloneItems.querySelector('.btnMore').addEventListener('click', (e) => {
                basket[index].quantity++;
                const labelCount = document.getElementById(index);
                labelCount.textContent = basket[index].quantity;
                localStorage.setItem('basket', JSON.stringify(basket))
                totalPrice()
            })
// Boutons moins
            cloneItems.querySelector('.btnLess').addEventListener('click', (e) => {
                basket[index].quantity--;
                const labelCount = document.getElementById(index);
                labelCount.textContent = basket[index].quantity;
                localStorage.setItem('basket', JSON.stringify(basket))
                if (basket[index].quantity === 0){
                    const itemRow = document.getElementById("id" + index);
                    basketDiv.removeChild(itemRow)
                    basket.splice(index)
                    localStorage.setItem('basket', JSON.stringify(basket))
                }
                totalPrice()
            })
            clone.appendChild(cloneItems);
            basketDiv.appendChild(clone);
            cloneTbody.appendChild(cloneItemRow)
        })
        totalPrice()

}


// Case du prix total sous le panier
//const cloneTotalPrice = document.importNode(templateTotal.content, true)
let caseTotal = document.querySelector('#total')

function totalPrice() {
    let caseTotal = document.querySelector('#total');
if (!caseTotal) {
    const cloneToTotalPrice = document.importNode(templateTotal.content, true);
    basketDiv.appendChild(cloneToTotalPrice);
    caseTotal = document.querySelector('#total');
}
let price = 0;
basket.forEach(product => {
    price += product.item.price * product.quantity;
})
caseTotal.textContent = `${price / 100} €`
//     let caseTotal = document.querySelector('#total')
//     console.log(document.querySelector('#total'))
//     if(caseTotal){
//         console.log("toto")
//         caseTotal.parentNode.removeChild(document.querySelector('#total'))
//     }
//     let prixTotal = 0;
//     const cloneTotalPrice = document.importNode(templateTotal.content, true)
//     basket.forEach(product => {
//         prixTotal += product.item.price * product.quantity;
//         let prixEuro = prixTotal/100 + "€"
//         console.log(cloneTotalPrice.querySelector('#total').textContent)
//         cloneTotalPrice.querySelector('#total').textContent = prixEuro;
//     });
//     basketDiv.appendChild(cloneTotalPrice)
//     console.log(prixTotal);
}


const containerForm = document.querySelector('#containerForm')
const cloneForm = document.importNode(templateForm.content, true);

if (basket.length > 0)
{
    containerForm.appendChild(cloneForm);
    containerForm.querySelector('.btn--form').addEventListener('click', (e) => {
        let products = []
        basket.forEach((element, index) => {
            products.push(basket[index].item._id)
        })
        console.log(products)

    })
    const form = document.querySelector('#form')
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const elements = form.elements;
        console.log(elements)
        let objContact = {};
        for( let i = 0; i < elements.length-1; i++) {
        const item = elements.item(i);
        console.log(elements.item(i).value)
        objContact += [item.name = elements.item(i).value];
        console.log(objContact)
        }
        console.log(objContact)
        console.log(elements)
    })
}
// console.log(form.querySelector('.btn--form'))


// form.querySelector('.btn--form').addEventListener('click', (e) => {