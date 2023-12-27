//Variables globales pour le login
let email = document.querySelector("form #email");
let password = document.querySelector("form #password");
let form = document.querySelector("form");


async function postUser() {

    let response = await fetch("http://localhost:5678/api/users/login", {
        method : "POST",
        body : JSON.stringify(form)
    })
       
}
