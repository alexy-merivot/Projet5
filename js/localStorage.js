let updateToBasket = (itemName,itemToPutInBasket) =>
{
    localStorage.setItem(itemName, JSON.stringify(itemToPutInBasket))
}

let clearBasket = () =>
{
    localStorage.clear()
}