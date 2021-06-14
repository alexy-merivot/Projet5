

const  containerBasket = document.querySelector('#main');
const  basketDiv = document.querySelector('#basketDiv');
const  basketEmpty = document.querySelector('#basketEmpty');
const cloneHead = document.importNode(templatetHead.content, true);
const cloneTbody = cloneHead.querySelector('.tBody')
let indexBasket = 0;

    // Construction du panier en js en important les templates HTML
if (basket.length > 0){
    basketDiv.removeChild(basketEmpty);
    basket.forEach((element, index) =>
        {
            const cloneItems = document.importNode(templatetRows.content, true);
            const cloneItemRow = cloneItems.querySelector('.itemRow')
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
                    if (itemRow.parentNode) {
                        // supprime un noeud  de l'arbre,
                        // sauf s'il a déjà été supprimé
                        itemRow.parentNode.removeChild(itemRow);
                        }
                    basket.splice(index)
                    localStorage.setItem('basket', JSON.stringify(basket))
                }
                totalPrice()
            })
            cloneHead.appendChild(cloneItems);
            basketDiv.appendChild(cloneHead);
            cloneTbody.appendChild(cloneItemRow)
        })
        totalPrice()
}

    // Case du prix total sous le panier
let caseTotal = document.querySelector('#total')

function totalPrice() {
    let caseTotal = document.querySelector('#total');
    const cloneTotalPrice = document.importNode(templateTotal.content, true);
if (!caseTotal) {
    basketDiv.appendChild(cloneTotalPrice);
    caseTotal = document.querySelector('#total');
}
let price = 0;
basket.forEach(product => {
    price += product.item.price * product.quantity;
})
caseTotal.textContent = `${price / 100} €`
}

const containerForm = document.querySelector('#containerForm')
const cloneForm = document.importNode(templateForm.content, true);
    // Importation du formulaire si le panier n'est pas vide
    // et récupération des input du formulaire
if (basket.length > 0)
{
    containerForm.appendChild(cloneForm);
    const form = document.querySelector('#form')
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let objProducts = []
        basket.forEach((element, index) => {
            objProducts.push(basket[index].item._id)
        })

        let objContact = {};
        const elements = form.elements;
        for( let i = 0; i < elements.length-1; i++) {
            const item = elements.item(i);
            objContact[item.name] = elements.item(i).value;
        }
        send(objContact, objProducts)
    })}

    // fonction reqête post et envoi des données a l'api puis récupération de l'orderID
function send(contacts, prod) {
    let objToSend = {
        contact: contacts,
        products: prod
    }
    localStorage.clear()
    console.log(JSON.stringify(objToSend))
    fetch("http://localhost:3000/api/teddies/order", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(objToSend)
    })
    .then(resp => resp.json())
    .then(data => {
        console.log(data.orderId)
        localStorage.setItem("orderIdConfirmation",data.orderId)
        window.open('confirmation.html')
        window.location.replace('index.html')
    })
    .catch(err => alert(err));




// containerForm.querySelector('.btn--form').addEventListener('click', (e) => {
//     e.preventDefault();
//     const elements = form.elements;
//     const contactObject = {};
//     const productsObject = basket.map(item => {
//         return item.product._id;
//     })
//     let isFormDataValid = true
//     const errorList = document.createElement('ul');
//     console.warn(elements);
//     for (let i = 0; i < elements.length - 1; i++) {
//         const item = elements.item(i);
//         if (item.checkValidity()) {
//             contactObject[item.name] = item.value;
//         } else {
//             const liError = document.createElement('li');
//             liError.innerText = `${item.name} : ${item.validationMessage}`;
//             isFormDataValid = false;
//             errorList.appendChild(liError);
//         }
//     }
//     if (isFormDataValid) {
//         const objectToSend = {
//             contact: contactObject,
//             products: productsObject
//         }
//         fetch('http://localhost:3000/api/cameras/order', {
//             method: 'POST',
//             body: JSON.stringify(objectToSend),
//             headers: {
//                 'Content-Type': 'application/json'
//             }
//         })
//             .then(resp => resp.json())
//             .then(data => console.warn(data))
//             .catch(err => alert(err));
//     } else {
//         document.querySelector('#error').appendChild(errorList);
//     }
// })}