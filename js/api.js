const productSell = 'teddies' //Au choix entre : "cameras" - "furniture" - "teddies"
const APIURL = 'http://localhost:3000/api/' + productSell + '/'

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');

const APIURlWithId = 'http://localhost:3000/api/' + productSell + '/' +  id

const get = (productSell) => {
    return fetch(APIURL)
    .then(resp => resp.json());
}