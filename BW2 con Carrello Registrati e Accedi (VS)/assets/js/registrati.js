
var email = [];
var elenco = [];
var carrello = [];
var register = document.getElementById('register');





window.addEventListener('DOMContentLoaded', init);

function init() {
    printData();
    email = document.getElementById('email');
    login = document.getElementById('login');
}

class Utente {
    constructor(_email, _password, _carrello) {
        this.email = _email;
        this.password = _password;
        this.carrello = _carrello;
    }

}

register.addEventListener('click', (e) => {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let passwordRetype = document.getElementById("confirmPassword").value;
    let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
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
    printData();
    let t = false;
    if (elenco.length == 0){
        t = true;
    }else{
        for(let i = 0 ; i<elenco.length;i++){
            if (email==elenco[i].email){
                t = false;
                break;
            } else {
                t = true;
        }
    }
    if (t){
        
        nuovoUtente = new Utente(email, password, carrello);
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

const password = document.querySelector("#password");
const confirmPassword = document.querySelector("#confirmPassword");
const pwd_format = document.querySelector(".pwd-format");
// QUESTO CI PERMETTE DI DEFINIRE UN FORMATO PER LA PASSWORD
//LA PASSWORD DEVE CONTENERE 8-15 CARATTERI

const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;
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


async function addData(data) {
    await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(data),

    });

}


function printData() {
    fetch('http://localhost:3000/users')
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            elenco = data;

        });
}
