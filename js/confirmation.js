console.log("toto")
let orderId = localStorage.getItem("orderIdConfirmation")
console.log(orderId)
confirmationMessage = document.querySelector("#confirmationMessage")
confirmationMessage.content = "coucou";
console.log(confirmationMessage)
document.querySelector("#containerMessage").textContent = `Merci pour votre commande. Voici votre numéro de commande : ${orderId}`
clearBasket()