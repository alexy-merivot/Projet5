const container = document.getElementById('detail-product');
const id = new URLSearchParams(window.location.search).get('id');
let basket = JSON.parse(localStorage.getItem('basket'));
console.warn(basket);
if (basket === null) {
    basket = [];
}
fetch(`http://localhost:3000/api/teddies/${id}`)
    .then(response => response.json())
    .then(product => {
        const template = document.querySelector('#product')
        // clonage du template
        const clone = document.importNode(template.content, true);
        const select = clone.querySelector('select');
        clone.querySelector('img').src = product.imageUrl;
        clone.querySelector('.card-title').textContent = product.name;
        clone.querySelector('.card-text').textContent = product.description;
        const priceTranslate = product.price / 100;
        clone.querySelector('.card-price').textContent = priceTranslate + ' €'
        product.lenses.forEach(opt => {
            const option = document.createElement('option');
            option.value = opt;
            option.textContent = opt;
            select.appendChild(option);
        })
        container.appendChild(clone);
        document.querySelectorAll('#add-to-basket')[0].addEventListener('click', (e) => {
            let productAlreadyExistInBasket = basket.filter(item => item.item._id === product._id);
            if (productAlreadyExistInBasket.length > 0) {
                productAlreadyExistInBasket[0].quantity++;
            } else {
                const object = {
                    item: product,
                    quantity: 1,
                }
                basket.push(product);
            }
            localStorage.setItem('basket', JSON.stringify(basket));
        });
    });