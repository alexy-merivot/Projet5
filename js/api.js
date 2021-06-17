const productSell = 'teddies' //Au choix entre : "cameras" - "furniture" - "teddies"
const APIURL = 'http://localhost:3000/api/' + productSell + '/'
    // récupération de l'id du produit pour rediriger vers la bonne page
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');

const APIURlWithId = 'http://localhost:3000/api/' + productSell + '/' +  id
const APIURLOrder = 'http://localhost:3000/api/' + productSell + '/' + 'order'
const get = () =>
{
    return fetch(APIURL)
    .then(resp => resp.json());
}

const post = () =>
{
    
}