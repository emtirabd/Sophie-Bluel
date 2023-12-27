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

        if(categories.id === 0) {
            button.classList.add('btn-selected')
        }

        button.textContent = categories.name;

        button.addEventListener('click', ()=> {
            displayWorks(categories.id);
            
            // Retirer la classe 'btn-selected' de tous les boutons
            document.querySelectorAll('.btn-selected').forEach(btn => {
                btn.classList.remove('btn-selected');
            });

            // Ajouter la classe 'btn-selected' au bouton actuel
            button.classList.add('btn-selected');

        })

        filtres.appendChild(button);
    })
}
displayCategories()