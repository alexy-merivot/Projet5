    // Construction du panier en js en important les templates HTML

let buildDomBasket  = () => {
    const basketDiv = document.querySelector('#basketDiv');
    const basketEmpty = document.querySelector('#basketEmpty');
    const cloneHead = document.importNode(templatetHead.content, true);
    const cloneTbody = cloneHead.querySelector('.tBody')
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
        let buttonMore = () => {
            cloneItems.querySelector('.btnMore').addEventListener('click', (e) => {
                basket[index].quantity++;
                const labelCount = document.getElementById(index);
                labelCount.textContent = basket[index].quantity;
                updateToBasket("basket",basket)
                totalPrice()
                quantityBasketTotal()
            })
        }
        buttonMore()
        // Boutons moins
        let buttonLess = () => {
            cloneItems.querySelector('.btnLess').addEventListener('click', (e) => {
                basket[index].quantity--;
                const labelCount = document.getElementById(index);
                labelCount.textContent = basket[index].quantity;
                updateToBasket("basket",basket)
                if (basket[index].quantity === 0){
                    const itemRow = document.getElementById("id" + index);
                    if (itemRow.parentNode) {
                        // supprime un noeud  de l'arbre,
                        // sauf s'il a déjà été supprimé
                        itemRow.parentNode.removeChild(itemRow);
                        }
                    basket.splice(index)
                    updateToBasket("basket",basket)
                }
                totalPrice()
                quantityBasketTotal()
            })
        }
        buttonLess()
                cloneHead.appendChild(cloneItems);
                basketDiv.appendChild(cloneHead);
                cloneTbody.appendChild(cloneItemRow)
            })
            totalPrice()
    }
}

buildDomBasket()

// Importation du formulaire si le panier n'est pas vide
    // et récupération des input du formulaire

let buildDomForm  = () =>  {
    const containerForm = document.querySelector('#containerForm')
    const cloneForm = document.importNode(templateForm.content, true);
    containerForm.appendChild(cloneForm);

    const catchDataFromForm = () => {
        form.addEventListener('submit', (e) =>
        {
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
            let isFormDataValid = true
            const errorList = document.createElement('ul');
            console.warn(elements);
            for (let i = 0; i < elements.length - 1; i++)
            {
                const item = elements.item(i);
                if (item.checkValidity()) {
                    objContact[item.name] = item.value;
                } else {
                    const liError = document.createElement('li');
                    liError.innerText = `${item.name} : ${item.validationMessage}`;
                    isFormDataValid = false;
                    errorList.appendChild(liError);
                }
            }
            if (isFormDataValid)
            {
                send(objContact, objProducts)
            }
            else
            {
                document.querySelector('#error').appendChild(errorList);
            }
        })
    }
    catchDataFromForm()
}

if (basket.length > 0)
{
    buildDomForm()
}

    // fonction reqête post et envoi des données a l'API puis récupération de l'orderID

let send = (contacts, prod) => {
    console.log("toto")
    let objToSend = {
        contact: contacts,
        products: prod
    }
    clearBasket()
    console.log(JSON.stringify(objToSend))
    postToAPI(APIURLOrder, objToSend)
    .then(data => {
        console.log(data.orderId)
        updateToBasket("orderIdConfirmation",data.orderId)
        window.open('confirmation.html')
        window.location.replace('index.html')
    })
    .catch(err => alert(err));
}
console.log(basket)



// containerForm.querySelector('.btn--form').addEventListener('click', (e) => {
// e.preventDefault();
// const elements = form.elements;
// const objContact = {};
// const objProducts = basket.map(item => {
//     return item.product._id;
// })

// let isFormDataValid = true
// const errorList = document.createElement('ul');
// console.warn(elements);
// for (let i = 0; i < elements.length - 1; i++)
// {
//     const item = elements.item(i);
//     if (item.checkValidity()) {
//         objContact[item.name] = item.value;
//     } else {
//         const liError = document.createElement('li');
//         liError.innerText = `${item.name} : ${item.validationMessage}`;
//         isFormDataValid = false;
//         errorList.appendChild(liError);
//     }
// }

// if (isFormDataValid) {
//     const objToSend = {
//         contact: objContact,
//         products: objProducts
//     }
//     fetch('http://localhost:3000/api/cameras/order', {
//         method: 'POST',
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