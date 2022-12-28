
var elenco = [];
let cart = [];
var carrello = [];
var login = document.getElementById('login');
var stato = new Boolean();
class Utente {
    constructor(_email, _password, _carrello, _id) {
        this.email = _email;
        this.password = _password;
        this.carrello = _carrello;
        this.id = _id;

    }

}
window.addEventListener('DOMContentLoaded', init);

function init() {
    onLoadCartNumbers();
    email = document.getElementById('email');
    login = document.getElementById('login');
    printData();
    welcome();
}
// FUNZIONE PER CAMBIARE LE SCRITTE ACCEDI E REGISTRATI
// FUNZIONE LOGOUT PER AGGIORNARE IL CARRELLO DELL'UTENTE NEL JSON
function welcome() {
    if (stato) {
        let loggedUser = localStorage.getItem('user');
        loggedUser = JSON.parse(loggedUser);
        let acc = document.getElementById('log');
        let reg = document.getElementById('sig');
        if (loggedUser){
            reg.innerHTML = `<a href="." style="color:rgb(255, 193, 7);"> <i class="bi bi-person-circle fa-2x"></i> </a>`;
            acc.innerHTML = `<button
            class="btn btn-outline-danger mb-2" id="logout" alt="Logout"><i class="bi bi-box-arrow-right"></i></button>`;
        }
        

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
    login.addEventListener('click', () => {
        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;
        printData();
        if (email == "") {
            let error2 = document.getElementById('error2');
            error2.innerHTML = 'Email richiesta.';
            setTimeout(function(){location.href="login.html"} , 1000);
            return;
            
        }
        else if (password == "") {
            let error1 = document.getElementById('error1');
            error1.innerHTML = 'Password richiesta.';
            setTimeout(function(){location.href="login.html"} , 1000);
        } else {
            for (let i = 0; i < elenco.length; i++) {
                if (email == elenco[i].email && password == elenco[i].password) {
                    stato = true;
                updateCart(i);
                let nuovoUtente = new Utente(email, password, elenco[i].carrello, i + 1);
                document.getElementById("email").value = "";
                document.getElementById("password").value = "";
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
                    newCart.forEach(element =>{
                        numberOfItems += (element.inCart);
                        cartPrice += (element.inCart * element.prezzo);
                    });
                    sessionStorage.setItem('productsInCart', JSON.stringify(newCart));
                    sessionStorage.setItem('cartNumbers', numberOfItems);
                    sessionStorage.setItem('totalCost', cartPrice);
                }
                location.href = 'index.html';
                welcome();
                } 
                else {
                    let error = document.getElementById('error');
                    error.innerHTML = 'Hai sbagliato qualcosa!<br>Oppure non sei registrato';
                }
            }
        }
    });
}
// FUNZIONE CON METODO FETCH PER RICAVARE I DATI DELL'UTENTE DAL JSON
function printData() {
    fetch('http://localhost:3000/users')
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            elenco = data;
        });
}


function onLoadCartNumbers() {
    let productNumbers = sessionStorage.getItem('cartNumbers');
    if (productNumbers) {
        document.querySelector('.cart span').textContent = productNumbers;

    }
}
// FUNZIONE PER MODIFICARE IL CARRELLO DELL'UTENTE NEL JSON DOPO IL LOGOUT
function modifyUser(products, utente, e) {
    products = JSON.parse(products);
    if (products) {
        carrello = Object.values(products);
    } else {
        carrello = [];
    }
    utente = JSON.parse(utente);
    data = {
        carrello: carrello
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
            stato = false;
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
    if (elenco[i].carrello.length > 0) {
        cart.push(elenco[i].carrello);
    }
}
