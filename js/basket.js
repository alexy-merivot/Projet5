

const  containerBasket = document.querySelector('#main');
const  basketDiv = document.querySelector('#basketDiv');
const  basketEmpty = document.querySelector('#basketEmpty');
const cloneHead = document.importNode(templatetHead.content, true);
const cloneTbody = cloneHead.querySelector('.tBody')
let indexBasket = 0;
if (basket.length > 0){
    basketDiv.removeChild(basketEmpty);
    basket.forEach((element, index) =>
        {
            const cloneItems = document.importNode(templatetRows.content, true);
            const cloneItemRow = cloneItems.querySelector('.itemRow')
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

const containerForm = document.querySelector('#containerForm')
const cloneForm = document.importNode(templateForm.content, true);


if (basket.length > 0)
{
    containerForm.appendChild(cloneForm);
    // containerForm.querySelector('.btn--form').addEventListener('click', (e) => {
    //     let products = []
    //     basket.forEach((element, index) => {
    //         products.push(basket[index].item._id)
    //     })
    //     console.log(products)

    // })
    const form = document.querySelector('#form')
    const errorList = form.querySelector('#error')
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let products = []
        basket.forEach((element, index) => {
            products.push(basket[index].item._id)
            console.log(products)
        const elements = form.elements;
        console.log(elements)
        let objContact = {};
        let hasError = false;
        for( let i = 0; i < elements.length-1; i++) {
        const item = elements.item(i);
        console.log(elements.item(i).value)
        if(elements.item(i).checkValidity()) {
            console.log("tata")
            objContact[item.name] = elements.item(i).value;
            console.log(objContact)
        } else {
            console.log("toto")
            const liError = document.createElement("li")
            liError.innerText = `${item.name} : ${item.validationMessage}`;
            hasError = true
            errorList.appendChild(liError);
        }
        }
        console.log(objContact)
        console.log(elements)
    })
    })}

function send(e) {
    e.preventDefault();
    fetch("http://localhost:3000/api/", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({objCotact},[products])
    });
}}





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