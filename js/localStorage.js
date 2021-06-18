let updateToBasket = (itemName,itemToPutInBasket) =>
{
    localStorage.setItem(itemName, JSON.stringify(itemToPutInBasket))
}

let getItemFromBasket = (nameItemFromBasket) =>
{
    localStorage.getItem(nameItemFromBasket)
}

let clearBasket = () =>
{
    localStorage.clear()
}