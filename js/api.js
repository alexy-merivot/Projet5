const productSell = 'teddies' //Au choix entre : "cameras" - "furniture" - "teddies"
const APIURL = 'http://localhost:3000/api/' + productSell + '/'
    // récupération de l'id du produit pour rediriger vers la bonne page
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');

const APIURlWithId = 'http://localhost:3000/api/' + productSell + '/' +  id
const APIURLOrder = 'http://localhost:3000/api/' + productSell + '/' + 'order'
const getFromAPI = (anAPIURL) =>
{
    return fetch(anAPIURL)
    .then(resp => resp.json());
}

const postToAPI = (anAPIURL, objToSend) =>
{
    return fetch(anAPIURL,
    {
        method: "POST",
        headers:
        {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(objToSend)
    })
    .then(resp => resp.json());
}