

// PRINT SU CATEGORIA IN BASE ALLA PAGINA CORRENTE
var page = window.location.pathname;
var listino = [];

window.addEventListener('DOMContentLoaded', init);
function init() {
  switch (page){
    case "/auto.html" :
      printListino(page.slice(0,-5));
      break;
    case "/bici.html":
      printListino(page.slice(0,-5));
      break;
    case "/moto.html":
      printListino(page.slice(0,-5));
      break;
    case "/carrello.html":
      displayCart();

  }
}
// STAMPA I PRODOTTI PRENDENDO I DATI DAL JSON
function printListino(path) {
  fetch('http://localhost:3000'+path).then((response) => {
    return response.json();
  }).then((data) => {
    listino = data;
    let dynamic = document.querySelector('.productCards');
    for (let i = 0; i < listino.length; i++) {
      let fetch = document.querySelector('.productCards').innerHTML;
      dynamic.innerHTML = fetch + `<div class="col-sm-6 col-lg-4 col-xl-3 mb-3">
        <div class="hoverCards card w-100 bg-dark text-white" style="width: 18rem;">
        <a onClick="stampaDettaglio(${i},'${path}')">
        <div class="imgProdotto">
          <img src="${listino[i].imgUno}" class="d-block w-100" alt="...">
        </div>
        </a>
        <div class="card-body">
          <h5 class="titoliProdotto card-title ">${listino[i].nome}</h5>
          <p class="card-text prezziProdotto">&euro;${listino[i].prezzo}</p>
          <button type="button" class="btn btn-warning btn-sm shadow" onclick="spostaInStorage(${i})">Aggiungi al carrello <i class="bi bi-cart-plus-fill"></i></button>
      </div>
    </div>
    </div>`;
    }
  })
}

// STAMPA DETTAGLI DEL PRODOTTO DAL JSON 

var elenco = [];

function stampaDettaglio(numero, path) {
  fetch('http://localhost:3000'+path+`/${numero+1}`).then((response) => {
    return response.json();
  }).then((data) => {
    elenco = data;
    console.log(elenco)
    let dynamic = document.querySelector('.productCards');
      dynamic.innerHTML = `<a href="${page}" class="d-flex float-start ms-4 mt-5"><i class="bi bi-arrow-left-square-fill link-dark fa-2x"></i></a>
      <div class="container contenuto">
      <div class="row">
        <div class="col-md-6 d-flex justify-content-center">
          <div id="piccolo">
            <div id="carouselExampleDark" class="carousel carousel-dark slide" data-bs-ride="carousel">
              <div class="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" class="active"
                  aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1"
                  aria-label="Slide 2"></button>
              </div>
              <div class="carousel-inner">
                <div class="carousel-item active" id="immagine1">
                <img src="${elenco.imgUno}" class="d-block w-100"
                //       alt="...">
                </div>
                <div class="carousel-item" id="immagine2">
                <img src="${elenco.imgDue}" class="d-block w-100"
                //       alt="...">
                </div>
              </div>
              <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark"
                data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
              </button>
              <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleDark"
                data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
              </button>
            </div>
          </div>
        </div>
        <div class="col-md-6 pt-md-4 pt-3">
          <h3 id="titoloProdotto" class="fw-normal">${elenco.nomeIntero}</h3>
          <h2 id="prezzoProdotto">${elenco.prezzo}</h2>
          <hr>
          <div class="d-flex align-content-center ">
            <select id="quantity" class="form-select w-25 me-2" aria-label="Default select example">
              <option selected>1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
  
            <button type="button" class="btn btn-warning me-2" onclick="spostaInStorage(${numero})">Aggiungi al carrello <i
                class="bi bi-cart-plus-fill"></i></button>
            <button type="button" class="btn btn-success"><i class="bi bi-bag-check-fill"></i></button>
          </div>
          <p class="minibox mt-3 p-2 d-inline-block">
            <i class="bi bi-shop-window"></i> Il prodotto selezionato presenta disponibilità nei nostri negozi.
          </p>
        </div>
      </div>
      <div class="row mb-3 mt-md-5">
        <h3>Descrizione</h3>
        <p id="descrizioneProdotto">${elenco.descrizione}</p>
      </div>
      <div class="row mb-3">
        <h3>Specifiche</h3>
        <div class="container">
          <table class="table table-bordered border-warning">
            <tbody>
              <tr>
                <th scope="row">Codice prodotto</th>
                <td id="codiceProdotto">${elenco.id * 3 + 1300}</td>
              </tr>
              <tr>
                <th scope="row">Spedizione in 48h</th>
                <td>Si</td>
              <tr>
                <th scope="row">Divisione</th>
                <td id="divisioneProdotto">${elenco.nome}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>`
  });
}

// CARRELLO
var carrello = [];

getDataCarrello(page.slice(0,-5));
// FUNZIONE CON FETCH PER RICAVARE I DATI DEI PRODOTTI
function getDataCarrello(path) {
  fetch('http://localhost:3000'+path).then((response) => {
    return response.json();
  }).then((data) => {
    carrello = data;
  })
};
// FUNZIONE PER SPOSTARE PRODOTTO SPECIFICO NEL SESSION STORAGE
function spostaInStorage(i) {
  if(document.getElementById("quantity")){
    var quantità = Number(document.getElementById("quantity").value);
  }
    cartNumbers(carrello[i], quantità);
    totalCost(carrello[i], quantità);
}

function onLoadCartNumbers() {
  let productNumbers = sessionStorage.getItem('cartNumbers');
  if (productNumbers) {
    document.querySelector('.cart span').textContent = productNumbers;

  }
}
// FUNZIONE PER IMPOSTARE PRODOTTI E NUMERI DEI PRODOTTI NEL SESSION STORAGE
function cartNumbers(product,quantità) {
  
  let productNumbers = sessionStorage.getItem('cartNumbers');
  productNumbers = parseInt(productNumbers);
  if (productNumbers) {
    if (!quantità){
      sessionStorage.setItem('cartNumbers', productNumbers + 1);
      document.querySelector('.cart span').textContent = productNumbers + 1;
    }else{
      sessionStorage.setItem('cartNumbers', productNumbers + quantità);
      document.querySelector('.cart span').textContent = productNumbers + quantità;
    }
    
  } else {
    if (!quantità){
      sessionStorage.setItem('cartNumbers', 1);
      document.querySelector('.cart span').textContent = 1;
    }else{
      sessionStorage.setItem('cartNumbers', quantità);
      document.querySelector('.cart span').textContent = quantità;
    }
    
  }
  setItem(product, quantità);
}
// FUNZIONE PER IMPOSTARE I PRODOTTI NEL SESSION STORAGE
function setItem(product, quantità) {
  
  let cartItems = sessionStorage.getItem('productsInCart');
  cartItems = JSON.parse(cartItems);
  if (cartItems != null) {
    if (cartItems[product.nomeIntero] == undefined) {
      cartItems = {
        ...cartItems,
        [product.nomeIntero]: product
      }
    }
    if (!quantità){
      cartItems[product.nomeIntero].inCart += 1;
      
    }else{
      cartItems[product.nomeIntero].inCart += quantità;
    }
    
  } else {
    if (!quantità){
      product.inCart = 1;
    }else{
      product.inCart = quantità;
    }
    cartItems = {
      [product.nomeIntero]: product
    }
  }
  sessionStorage.setItem('productsInCart', JSON.stringify
    (cartItems));
}
// FUNZIONE PER IMPOSTARE IL PREZZO TOTALE DEL CARRELLO NEL SESSION STORAGE
function totalCost(product,quantità) {
  let cartCost = sessionStorage.getItem('totalCost');
  if (cartCost != null) {
    if (!quantità){
      cartCost = parseFloat(cartCost);
      var somma = parseFloat(cartCost)+ parseFloat(product.prezzo);
    } else{
      cartCost = parseFloat(cartCost);
      var somma = parseFloat(cartCost)+ parseFloat(product.prezzo*quantità);
    }
    sessionStorage.setItem('totalCost', somma);
  } else {
    if (!quantità){
      sessionStorage.setItem('totalCost', product.prezzo);
    } else {
      sessionStorage.setItem('totalCost', product.prezzo*quantità);
    }
    
  }
}

// FUNZIONE PER MOSTRARE IL CARRELLO SULLA SUA PAGINA
// DOPO AVER SPOSTATO TUTTI I DATI CHE SERVONO NEL SESSION STORAGE
function displayCart() {
  let cartItems = sessionStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);
  let productContainer = document.querySelector
    (".products");
  let cartCost = sessionStorage.getItem('totalCost');
  cartCost = JSON.parse(cartCost);
  if (cartItems && productContainer) {
    productContainer.innerHTML = '';
    Object.values(cartItems).map(item => {
      productContainer.innerHTML += `
        <tbody>
          <tr>
            <td><img src="${item.imgUno}" alt=""
              style="width:8em;">
            </td>
            <td class="align-middle">${item.nomeIntero} <br><span class="text-warning">&euro;${item.prezzo}</span> <br> <span class="text-sm fw-light">Quantità: ${item.inCart} </span> <br> <button type="button" class="btn btn-danger btn-sm mt-1" onclick="removeItem(${item.id})"><a href="carrello.html" style="color:white;">Rimuovi</a></button>
            </td>
          </tr>
        </tbody>`  
    });
    // aggiunge il totale in fondo al carrello
      productContainer.innerHTML += `  <tfoot>
      <tr>
          <td colspan="2"><h5 class="text-end me-2">Totale: <span class="text-warning"> &euro;${parseFloat(cartCost).toFixed(2)}</span></h5></td>
      </tr>
    </tfoot>`;
    
  }
}

// FUNZIONE PER ELIMINARE PRODOTTO DAL CARRELLO
function removeItem(id) {
  let cartItems = sessionStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);
  let arrValues = Object.values(cartItems);
  let prodotto = arrValues.find(arrValue => arrValue.id === id);
  arrValues.splice(arrValues.indexOf(prodotto), 1);
  sessionStorage.setItem('productsInCart', JSON.stringify
    (arrValues));
  
  sessionStorage.setItem('cartNumbers', arrValues.length);
  aggiornaCarrello();
  function aggiornaCarrello() {
    document.querySelector('.cart span').textContent = arrValues.length;
  }
  modificaPrezzo();
  function modificaPrezzo() {
    let cartCost = sessionStorage.getItem('totalCost');
    cartCost = parseFloat(cartCost);
    let sottrazione = parseFloat(cartCost) - (parseFloat(prodotto.prezzo)*prodotto.inCart);
    sessionStorage.setItem('totalCost', sottrazione);
    displayCart();
    if (arrValues.length == 0){
      sessionStorage.clear('totalCost');
    }
  }
}
onLoadCartNumbers();
// FUNZIONE PER LA BARRA DI RICERCA
// FILTRA I PRODOTTI CON QUELLO CHE CE SCRITTO E MOSTRA I PRODOTTI CORRISPONDENTI
function instantSearch() {
  document.querySelectorAll('.col-xl-3').forEach(item => item.querySelectorAll('h5')
  [0].innerText.toLowerCase().indexOf(document.querySelector('#input').value.toLowerCase()) > -1 ?
    item.style.display = 'block' : item.style.display = 'none');
}