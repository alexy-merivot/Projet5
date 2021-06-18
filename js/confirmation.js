let orderId = getItemFromBasket("orderIdConfirmation")
console.log(orderId)
confirmationMessage = document.querySelector("#confirmationMessage")
confirmationMessage.content = "coucou";
console.log(confirmationMessage)
document.querySelector("#containerMessage").textContent = `Merci pour votre commande. Voici votre numéro de commande : ${getItemFromBasket("orderIdConfirmation")}`
clearBasket()