//Variables
let gallery = document.querySelector("#portfolio .gallery");
let filtres = document.querySelector(".filters-btn");
let maincontainer = document.getElementById("maincontainer");
let modifier = document.querySelector("#portfolio .projet-edition span");
let bgModale = document.querySelector(".modale-bg");
let xmark = document.querySelector(".modale .fa-xmark");

// Récupération des élément depuis l'API
async function getWorks(){
    let response = await fetch("http://localhost:5678/api/works");
    return await response.json(); //pour retourner await .json (notre tableau des works) à chaque appel de la fonction
}

//Affichage des works dans le DOM
function displayWorks(categoryId = 0, isLogged = 'false'){

    getWorks().then((arrayWorks)=> {
        
        if(categoryId !== 0) {
            arrayWorks = arrayWorks.filter((work)=> { return work.categoryId === categoryId })
        }

        let targetGallery = null;

        if(isLogged === 'true') {
            targetGallery = document.querySelector('.modale-content');
        } else {
            targetGallery = gallery
        }

        targetGallery.innerHTML = "";

        arrayWorks.forEach(work => {
            let figure = document.createElement("figure");
            let img = document.createElement("img");

            img.src = work.imageUrl;
            figure.appendChild(img);

            if(isLogged === "true") {
                let deleteProjet = document.createElement("span");
                deleteProjet.classList.add('span-trash');
                deleteProjet.innerHTML = '<i class="fa-regular fa-trash-can"></i>'
                deleteProjet.addEventListener('click', ()=> {
                   // DELETE PROJET API CALL avec work.id
                   deleteProject(work.id);
                })
                figure.appendChild(deleteProjet);
                figure.classList.add('modale-figure')

            } else {
                let figcaption = document.createElement("figcaption");
                figcaption.textContent = work.title;
                figure.appendChild(figcaption);
            }

            targetGallery.appendChild(figure);
        });
    });
}
displayWorks()

//Affichage des boutons categories 

async function getCategories(){
    let response = await fetch("http://localhost:5678/api/categories");
    return await response.json(); 
}

async function displayCategories(){

    await getCategories().then((arrayCategories) => {
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
    });
}
displayCategories()

maincontainer.classList.remove("paddingtop");
modifier.remove();

//si l'utilisateur est connecté
let token = window.localStorage.getItem("token");
let isLogged = window.localStorage.getItem("logged");
let logout = document.querySelector(".logout");

if (token !== null && isLogged !== null) {
    // L'utilisateur est connecté donc on peut ajouter des elements sur la page
    let loggedElement = document.getElementById("edition-banniere");
    loggedElement.classList.remove("hidden");

    maincontainer.classList.add("paddingtop");

    //supprimer les filtres quand connecté
    filtres.remove();

    // On réinsère le "modifier" qu'on a retiré 
    let parentElementModifier = document.querySelector("#portfolio .projet-edition");
    parentElementModifier.appendChild(modifier);

    //au clic sur logout on se déconnecte
    logout.textContent = "logout";
    logout.addEventListener("click", ()=>{
        window.localStorage.removeItem("logged"); //a retirer ?
        maincontainer.classList.remove("paddingtop");
    })

    modifier.addEventListener("click", ()=> {
        bgModale.style.display = "flex";  
        displayWorks(0, isLogged);
    })

    xmark.addEventListener("click", ()=> {
        bgModale.style.display = "none"; 
    })
}

//suppression d'une image dans la modale
async function deleteProject(workId) {
    try {
        let response = await fetch('http://localhost:5678/api/works/' + workId, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' +  token, 
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            // Suppression réussie 
            console.log("Projet avec l'ID " + workId + " supprimé avec succès.");

        } else {
            console.error("Erreur lors de la suppression du projet avec l'ID " + workId + ".");
        }
    } catch (error) {
        console.error("Erreur lors de la suppression du projet:", error);
    }
}