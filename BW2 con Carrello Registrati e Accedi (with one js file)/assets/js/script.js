//PRODOTTI L-54
//CARRELLO L-176
//LOGIN L-363
//REGISTRATI L-515

//VARIABILI PRODOTTI
var page = window.location.pathname;
var listino = [];
var datiProdotto = [];
//VARIABILI LOGIN
var datiUserLogin = [];
let cart = [];
var carrelloL = [];
var login = document.getElementById('login');
var userStorage = localStorage.getItem('user');
//VARIABILI REGISTER
var datiUser = [];
var carrelloR = [];
var register = document.getElementById('register');


// FUNZIONI DA ESEGUIRE IN BASE ALLA PAGINA CORRENTE
window.addEventListener('DOMContentLoaded', init);
function init() {
  switch (page){
    case "/index.html":
      welcome();
    case "/auto.html" :
      printListino(page.slice(0,-5));
      welcome();
      break;
    case "/bici.html":
      printListino(page.slice(0,-5));
      welcome();
      break;
    case "/moto.html":
      printListino(page.slice(0,-5));
      welcome();
      break;
    case "/carrello.html":
      welcome();
      displayCart();
    case "/login.html":
      onLoadCartNumbers();
      printData();
      welcome(); 
    case "/registrati.html":
      onLoadCartNumbers();
      getUsers();

  }
}
//--------------------PRODOTTI----------------------//
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
        <div class="hoverCards card w-100 bg-dark text-white" style="width: 18rem; border-radius:5%;">
        <a onClick="stampaDettaglio(${i},'${path}')">
        <div class="imgProdotto">
          <img src="${listino[i].imgUno}" class="d-block w-100" alt="..." style="border-radius:5%;">
        </div>
        <div class="card-body">
          <h5 class="titoliProdotto card-title ">${listino[i].nome}</h5>
          </a>
          <p class="card-text prezziProdotto">&euro;${listino[i].prezzo}</p>
          <div class="d-flex">
          <button type="button" class="btn btn-warning btn-sm shadow" onclick="spostaInStorage(${i})" style="width:15%"><i class="bi bi-cart-plus-fill"></i></button>
          </div>

      </div>
    </div>
    </div>`;
    }
  })
}

// STAMPA DETTAGLI DEL PRODOTTO DAL JSON 


function stampaDettaglio(numero, path) {
  fetch('http://localhost:3000'+path+`/${numero+1}`).then((response) => {
    return response.json();
  }).then((data) => {
    datiProdotto = data;
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
                <img src="${datiProdotto.imgUno}" class="d-block w-100"
                //       alt="...">
                </div>
                <div class="carousel-item" id="immagine2">
                <img src="${datiProdotto.imgDue}" class="d-block w-100"
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
          <h3 id="titoloProdotto" class="fw-normal">${datiProdotto.nomeIntero}</h3>
          <h2 id="prezzoProdotto">${datiProdotto.prezzo}</h2>
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
          </div>
          <p class="minibox mt-3 p-2 d-inline-block">
            <i class="bi bi-shop-window"></i> Il prodotto selezionato presenta disponibilità nei nostri negozi.
          </p>
        </div>
      </div>
      <div class="row mb-3 mt-md-5">
        <h3>Descrizione</h3>
        <p id="descrizioneProdotto">${datiProdotto.descrizione}</p>
      </div>
      <div class="row mb-3">
        <h3>Specifiche</h3>
        <div class="container">
          <table class="table table-bordered border-warning">
            <tbody>
              <tr>
                <th scope="row">Codice prodotto</th>
                <td id="codiceProdotto">${datiProdotto.id * 3 + 1300}</td>
              </tr>
              <tr>
                <th scope="row">Spedizione in 48h</th>
                <td>Si</td>
              <tr>
                <th scope="row">Divisione</th>
                <td id="divisioneProdotto">${datiProdotto.nome}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>`
  });
}

//---------------------CARRELLO--------------------//

// FUNZIONE PER SPOSTARE PRODOTTO SPECIFICO NEL SESSION STORAGE
async function spostaInStorage(i) {
  let carrelloP = [];
  await fetch('http://localhost:3000'+page.slice(0,-5)+`/${i+1}`).then((response) => {
    return response.json();
  }).then((data) => {
    carrelloP = data;
  }
  );
  if(document.getElementById("quantity")){
    var quantità = Number(document.getElementById("quantity").value);
    cartNumbers(carrelloP, quantità);
    totalCost(carrelloP, quantità);
  } else{
    cartNumbers(carrelloP, null);
    totalCost(carrelloP, null);
  }
    
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
      var somma = cartCost+ parseFloat(product.prezzo);
    } else{
      cartCost = parseFloat(cartCost);
      var somma = cartCost+ parseFloat(product.prezzo*quantità);
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
  cartCost = parseFloat(cartCost);
  if (cartItems && productContainer) {
    productContainer.innerHTML = '';
    Object.values(cartItems).map(item => {
      productContainer.innerHTML += `
        <tbody>
          <tr>
            <td><img src="${item.imgUno}" alt=""
              style="width:8em; border-radius: 5%;">
            </td>
            <td class="align-middle">${item.nomeIntero} <br><span class="text-warning">&euro;${item.prezzo}</span> <br> <span class="text-sm fw-light">Quantità: ${item.inCart} </span> <br> <button type="button" class="btn btn-dark btn-sm mt-1" onclick="removeItem(${item.id})"><i class="fa-sharp fa-solid fa-trash"></i></button>
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
    let tasti = document.getElementById('tastiCart');
    tasti.innerHTML = `
        <button id="svuotaCart" type="button" class="btn btn-dark p-2 float-end" style="width: 50px;" onclick="svuotaCarrello()"><i class="fa-sharp fa-solid fa-trash" style="color:white;"></i></button>
        `;
        initPayPalButton(cartCost);
  }
}
//PAYPAL CHECKOUT FUNCTION
function initPayPalButton(cartCost) {
  paypal.Buttons({
    style: {
      shape: 'rect',
      color: 'gold',
      layout: 'vertical',
      label: 'paypal',
      
    },

    createOrder: function(data, actions) {
      return actions.order.create({
        purchase_units: [{"amount":{"currency_code":"EUR","value":cartCost}}]
      });
    },

    onApprove: function(data, actions) {
      return actions.order.capture().then(function(orderData) {
        
        // Full available details
        console.log('Capture result', orderData, JSON.stringify(orderData, null, 2));

        // Show a success message within this page, e.g.
        const element = document.getElementById('paypal-button-container');
        element.innerHTML = '';
        element.innerHTML = '<h3>Thank you for your payment!</h3>';

        // Or go to another URL:  actions.redirect('thank_you.html');
        
      });
    },

    onError: function(err) {
      console.log(err);
    }
  }).render('#paypal-button-container');
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
  location.reload();
}
onLoadCartNumbers();

function svuotaCarrello(){
  sessionStorage.clear();
  location.reload();
}
// FUNZIONE PER LA BARRA DI RICERCA
// FILTRA I PRODOTTI CON QUELLO CHE CE SCRITTO E MOSTRA I PRODOTTI CORRISPONDENTI
function instantSearch() {
  document.querySelectorAll('.col-xl-3').forEach(item => item.querySelectorAll('h5')
  [0].innerText.toLowerCase().indexOf(document.querySelector('#input').value.toLowerCase()) > -1 ?
    item.style.display = 'block' : item.style.display = 'none');
}

//--------------------------------LOGIN----------------------------//
class Utente {
  constructor(_email, _password, _carrello, _id) {
      this.email = _email;
      this.password = _password;
      this.carrello = _carrello;
      this.id = _id;

  }

}
// FUNZIONE PER CAMBIARE LE SCRITTE ACCEDI E REGISTRATI
// FUNZIONE LOGOUT PER AGGIORNARE IL CARRELLO DELL'UTENTE NEL JSON
function welcome() {
  if (userStorage) {
      let loggedUser = localStorage.getItem('user');
      loggedUser = JSON.parse(loggedUser);
      let acc = document.getElementById('log');
      let reg = document.getElementById('sig');
      reg.innerHTML = `<a href="index.html" style="color:rgb(255, 193, 7);"> <i class="bi bi-person-circle fa-2x"></i> </a>`;
      acc.innerHTML = `<button
      class="btn btn-outline-danger mb-2" id="logout" alt="Logout"><i class="bi bi-box-arrow-right"></i></button>`;

      if (document.getElementById("logout")) {
        let logout = document.getElementById("logout");
        logout.addEventListener('click', function (e) {
            let utente = localStorage.getItem('user');
            let products = sessionStorage.getItem('productsInCart');
            localStorage.clear();
            sessionStorage.clear();
            modifyUser(products, utente, e);
        })
      }
  }
}

// FUNZIONE PER LOGGARE L'UTENTE E CARICARE IL CARELLO DAL JSON ALLO STORAGE COSI È DISPONIBILE PER LA FUNZIONE displayCart()
if (document.getElementById('login')) {
  login.addEventListener('click', loginUser);
}
function loginUser(){
  let email = document.getElementById("emailL").value;
  let password = document.getElementById("passwrd").value;
  printData();
  if (email == "") {
      let error2 = document.getElementById('error2');
      error2.innerHTML = 'Email richiesta.';
      setTimeout(function () { location.href = "login.html" }, 1000);
      return;

  }
  else if (password == "") {
      let error1 = document.getElementById('error1');
      error1.innerHTML = 'Password richiesta.';
      setTimeout(function () { location.href = "login.html" }, 1000);
      return;
  } else {
      for (let i = 0; i < datiUserLogin.length; i++) {
          if (email == datiUserLogin[i].email && password == datiUserLogin[i].password) {
              var stato = true;
              updateCart(i);
              let nuovoUtente = new Utente(email, password, datiUserLogin[i].carrello, i + 1);
              document.getElementById("emailL").value = "";
              document.getElementById("passwrd").value = "";
              localStorage.setItem('user', JSON.stringify(nuovoUtente));
              if (cart.length > 0) {
                  let cartPrice = 0;
                  let numberOfItems = 0;
                  let newCart = [];
                  for (let i = 0; i < cart.length; i++) {
                      cart[i].forEach(element => {
                          newCart.push(element);
                      });
                  }
                  // PER RIMUOVERE DUPLICATI TRA IL CARRELLO PRIMA DEL LOGIN E IL CARRELLO DELL'UTENTE NEL JSON
                  newCart = newCart.filter((value, index, self) =>
                      index === self.findIndex((t) => (
                          t.nomeIntero === value.nomeIntero && t.nome === value.nome
                      ))
                  );
                  newCart.forEach(element => {
                      numberOfItems += (element.inCart);
                      cartPrice += (element.inCart * element.prezzo);
                  });
                  sessionStorage.setItem('productsInCart', JSON.stringify(newCart));
                  sessionStorage.setItem('cartNumbers', numberOfItems);
                  sessionStorage.setItem('totalCost', cartPrice);
              }
              location.href = 'index.html';
          }
      }
  }
  if (!stato) {
      let error = document.getElementById('error');
      error.innerHTML = 'Hai sbagliato qualcosa!<br>Oppure non sei registrato';
  }
}
// FUNZIONE CON METODO FETCH PER RICAVARE I DATI DELL'UTENTE DAL JSON
function printData() {
  fetch('http://localhost:3000/users')
      .then((response) => {
          return response.json();
      })
      .then((data) => {
          datiUserLogin = data;
      });
}
// FUNZIONE PER MODIFICARE IL CARRELLO DELL'UTENTE NEL JSON DOPO IL LOGOUT
function modifyUser(products, utente, e) {
  products = JSON.parse(products);
  if (products) {
      carrelloL = Object.values(products);
  } else {
      carrelloL = [];
  }
  utente = JSON.parse(utente);
  data = {
      carrello: carrelloL
  };
  e.preventDefault();
  fetch(`http://localhost:3000/users/${utente.id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
      headers: {
          'Content-Type': 'application/json;charset=utf-8'
      }
  }).then(response => {
      if (response.ok) {
          return response.json();
      }
      throw new Error('Request failed');
  })
      .then(data => {
          console.log(data);
      })
      .catch(error => {
          console.log(error);
      });
}
// FUNZIONE PER AGGIORNARE LA VARIABILE DEL CARRELLO CON I DATI
// PRESI SIA DAL SESSION STORAGE PRIMA DEL ACCESSO E POI DAL JSON DELL'UTENTE DOPO L'ACCESSO
function updateCart(i) {
  let x = sessionStorage.getItem('productsInCart');
  x = JSON.parse(x);
  if (x != null) {
      cart.push(Object.values(x));
  }
  if (datiUserLogin[i].carrello.length > 0) {
      cart.push(datiUserLogin[i].carrello);
  }
}

// ---------------------REGISTRATI----------------------//
let email = document.getElementById("email");
let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
if (email){
  email.addEventListener('focusin', ()=>{
    email.addEventListener('keyup', () => {
      if (mailformat.test(email.value)) {
          email.style.borderColor = 'green' // SE LA PASSWORD È UGUALE AL FORMATO DEFINITO IL BORDO DIVENTERÀ VERDE
      } else {
          // ALTRIMENTI IL BORDO SARÀ ROSSO
          email.style.borderColor = 'red';
      }
    });

  })
    //PER CONTROLLARE LA PASSWORD INSERITO DALL'UTENTE
    
  email.addEventListener('focusout', () => {
    email.style.borderColor = 'none';
  })
}

if (register){
  register.addEventListener('click', () => {
    email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let passwordRetype = document.getElementById("confirmPassword").value;
    
    if (email == "") {
        let error4 = document.getElementById('error4');
        error4.innerHTML = 'Email richiesta.';
        setTimeout(function(){location.href="registrati.html"} , 1000);
        return;
    }
    else if (!email.match(mailformat)){
        let error4 = document.getElementById('error4');
        error4.innerHTML = 'Email non valida.';
        setTimeout(function(){location.href="registrati.html"} , 1000);
        return;
    }
    else if (password == "") {
        let error3 = document.getElementById('error3');
        error3.innerHTML = 'Password richiesta.';
        setTimeout(function(){location.href="registrati.html"} , 1000);
        return;
    }
    else if (passwordRetype == "") {
        let error2 = document.getElementById('error2');
        error2.innerHTML = 'Password richiesta.';
        setTimeout(function(){location.href="registrati.html"} , 1000);
        return;
    }
    else if (passwordRetype != password) {
        let error2 = document.getElementById('error2');
        error2.innerHTML = 'Password non è corretta. Riprovare';
        setTimeout(function(){location.href="registrati.html"} , 1000);
        return;
    }
    getUsers();
    let t = false;
    if (datiUser.length == 0){
        t = true;
    }else{
        for(let i = 0 ; i<datiUser.length;i++){
          if (email==datiUser[i].email){
            t = false;
            break;
          } else {
            t = true;
          }
        }
    }
    if (t){
        
        nuovoUtente = new Utente(email, password, carrelloR);
        addData(nuovoUtente);
        document.getElementById("email").value = "";
        document.getElementById("password").value = "";
        document.getElementById("confirmPassword").value = "";
    } else{
        let error1 = document.getElementById('error1');
        error1.innerHTML = ' Sei già registrato.';
        document.getElementById("email").value = "";
        document.getElementById("password").value = "";
        document.getElementById("confirmPassword").value = "";
        setTimeout(function(){location.href="registrati.html"} , 1000);
        return;
    }
  });
}


const signup = document.querySelector(".signup");
const termCond = document.querySelector("#accept");
const password = document.querySelector("#password");
const confirmPassword = document.querySelector("#confirmPassword");
const pwd_format = document.querySelector(".pwd-format");
// QUESTO CI PERMETTE DI DEFINIRE UN FORMATO PER LA PASSWORD
//LA PASSWORD DEVE CONTENERE 8-15 CARATTERI

const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;
if (password){
  password.addEventListener('focusin', () => {
    pwd_format.style.display = 'block';
  
    //PER CONTROLLARE LA PASSWORD INSERITO DALL'UTENTE
    password.addEventListener('keyup', () => {
        if (passwordPattern.test(password.value)) {
            password.style.borderColor = 'green' // SE LA PASSWORD È UGUALE AL FORMATO DEFINITO IL BORDO DIVENTERÀ VERDE
            pwd_format.style.color = 'green'
        } else {
            // ALTRIMENTI IL BORDO SARÀ ROSSO
            password.style.borderColor = 'red'
            pwd_format.style.color = 'red'
        }
    })
  })
  
  password.addEventListener('focusout', () => {
    pwd_format.style.display = 'none';
  })
}

if(confirmPassword){
  confirmPassword.addEventListener('focusin', () => {
    pwd_format.style.display = 'block';
    confirmPassword.addEventListener('keyup', () => {
        if (passwordPattern.test(confirmPassword.value) && password.value === confirmPassword.value) {
            confirmPassword.style.borderColor = 'green' // SE LA CONFERMA È UGUALE AL FORMATO DEFINITO ED È UGUALE ALLA PASSWORD APPENA SCRITTO IL BORDO DIVENTERÀ VERDE 
            pwd_format.style.color = 'green'
        } else {
            // ALTRIMENTI IL BORDO SARÀ ROSSO
            confirmPassword.style.borderColor = 'red'
            pwd_format.style.color = 'red'
        }
    })
  })
  
  confirmPassword.addEventListener('focusout', () => {
    pwd_format.style.display = 'none';
  })
}



async function addData(data) {
  await fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(data),

  });

}


function getUsers() {
  fetch('http://localhost:3000/users')
      .then((response) => {
          return response.json();
      })
      .then((data) => {
          datiUser = data;

     });
}