//Variables globales pour le login
let email = document.querySelector("form #email");
let password = document.querySelector("form #password");
let form = document.querySelector("form");
let error = document.querySelector("#error");

//Fonction qui récupère les users
async function postUser (user){
    return await fetch("http://localhost:5678/api/users/login", {
        method : "POST",
        headers: {'Content-Type': 'application/json'},
        body : JSON.stringify(user)
    }).then((response)=> response.json())
}

//Fonction de connexion
async function login(){
    
    form.addEventListener("submit", (event) => {
        event.preventDefault();

        let user = {
            "email": email.value,
            "password": password.value
          } 
        
        if(user.email !== "" && user.password !== ""){
            postUser(user).then((response)=>{
                if(response.token){
                    //stocker le token dans localStorage 
                    window.localStorage.setItem("token", response.token);
                    // Définir que l'utilisateur est connecté
                    window.localStorage.setItem("logged", "true");
                    window.location.href = "./index.html";

                } else {
                    error.innerHTML = "L'identification est invalide ! "
                }
            });
        } else if(user.email === "" && user.password !== ""){
            error.innerHTML = "Le champ e-mail est vide ! "

        } else if(user.email !== "" && user.password === ""){
            error.innerHTML = "Le champ mot de passe est vide ! "

        } else {
            error.innerHTML = "Les 2 champs sont vides ! "
        }
    });
}
login()






       


