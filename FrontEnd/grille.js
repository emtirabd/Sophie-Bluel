//Variables
let gallery = document.querySelector("#portfolio .gallery")

// Récupération des élément depuis l'API
async function getWorks(){
    let response = await fetch("http://localhost:5678/api/works");
    return await response.json(); //pour retourner await .json (notre tableau des works) à chaque appel de la fonction
    
}
getWorks()

//Affichage des works dans le DOM
async function displayWorks(){
    let arrayWorks = await getWorks();
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
