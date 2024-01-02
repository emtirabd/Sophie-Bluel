//Variables
let gallery = document.querySelector("#portfolio .gallery")

// Récupération des élément depuis l'API
async function getWorks(){
    let response = await fetch("http://localhost:5678/api/works");
    return await response.json(); //pour retourner await .json (notre tableau des works) à chaque appel de la fonction
    
}

//Affichage des works dans le DOM
async function displayWorks(categoryId = 0){

    let arrayWorks = await getWorks();

    if(categoryId !== 0) {
        arrayWorks = arrayWorks.filter((work)=> { return work.categoryId === categoryId })
    }

    gallery.innerHTML = "";

    arrayWorks.forEach(work => {

        let figure = document.createElement("figure");
        let img = document.createElement("img");
        let figcaption = document.createElement("figcaption");

        img.src = work.imageUrl;
        figcaption.textContent = work.title;

        figure.appendChild(img);
        figure.appendChild(figcaption);
        gallery.appendChild(figure);
    });
}
displayWorks()

//Affichage des boutons categories 

let filtres = document.querySelector(".filters-btn");

async function getCategories(){
    let response = await fetch("http://localhost:5678/api/categories");
    return await response.json(); 
}

async function displayCategories(){

    let arrayCategories = await getCategories();
    let allFilter = {
        id: 0,
        name: 'Tous'
    } ;

    // Ajoute l'élément en première position du tableau
    arrayCategories.unshift(allFilter)

    arrayCategories.forEach(categories => {

        let button = document.createElement("button");

        // Ajout de la classe 'btn-selected' si la catégorie a un id de 0
        if(categories.id === 0) {
            button.classList.add('btn-selected')
        }

        // Attribution du texte au bouton
        button.textContent = categories.name;

        // Ajout d'un écouteur d'événement pour le clic sur le bouton
        button.addEventListener('click', ()=> {
            displayWorks(categories.id);
            
            // Retirer la classe 'btn-selected' de tous les boutons
            document.querySelectorAll('.btn-selected').forEach(btn => {
                btn.classList.remove('btn-selected');
            });

            // Ajouter la classe 'btn-selected' au bouton actuel
            button.classList.add('btn-selected');

        })

        // Ajout du bouton au conteneur de filtres dans le DOM
        filtres.appendChild(button);
    })
}
displayCategories()

//si l'utilisateur est connecté

let isLogged = window.localStorage.getItem("logged");
let logout = document.querySelector(".logout");

if (isLogged === "true") {
    // L'utilisateur est connecté donc on peut ajouter des elements sur la page
    let loggedElement = document.getElementById("edition-banniere");
    loggedElement.classList.remove("hidden");

    //au clic sur logout on se déconnecte
    logout.textContent = "logout";
    logout.addEventListener("click", ()=>{
        window.localStorage.removeItem("logged");
    })
}