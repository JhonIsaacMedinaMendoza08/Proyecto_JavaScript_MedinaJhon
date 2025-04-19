// Espera a que el contenido del DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", () => {
    // Obtiene el contenedor donde se mostrarán los personajes
    const container = document.getElementById("listCharacters");

    // Recupera los personajes del localStorage y los convierte en objeto JS, o un array vacío si no hay nada
    const characters = JSON.parse(localStorage.getItem("characters")) || []; 

    // Si no hay personajes guardados, muestra un mensaje y detiene la ejecución
    if (characters.length === 0) {
        container.innerHTML = "<p>There are no saved characters yet in our service.</p>";
        return;
    }

    // Diccionario de imágenes asociadas a cada raza
    const raceImages = {
        "dragonborn": "assets/races/dragonborn.png",
        "dwarf": "assets/races/dwarf.png",
        "elf": "assets/races/elf.webp",
        "gnome": "assets/races/gnome.webp",
        "half-elf": "assets/races/half-elf.png",
        "half-orc": "assets/races/orc.png",
        "halfling": "assets/races/halfling.png",
        "human": "assets/races/human.webp",
        "tiefling": "assets/races/tiefling.webp",
        "default": "assets/races/default.png" // Imagen por defecto si no se reconoce la raza
    };

    // Recorre el array de personajes y genera una tarjeta por cada uno
    characters.forEach((character, index) => {
        // Crea un nuevo div para el personaje
        const card = document.createElement("div");
        card.classList.add("characterCard"); // Aplica la clase CSS

        // Selecciona la imagen según la raza o usa la predeterminada
        const imageSrc = raceImages[character.races] || raceImages["default"];

        // Genera el contenido HTML de la tarjeta del personaje
        card.innerHTML = `
            <img src="${imageSrc}" alt="${character.races}" class="race-image" />
            <h2>${character.name}</h2>
            <p><strong>Race:</strong> ${character.races}</p>
            <p><strong>Class:</strong> ${character.classes}</p>
            <p><strong>Habilidad Especial:</strong> ${character.ability}</p>
            <a href="details.html?id=${index}">See Details</a> <!-- Link a detalles -->
            <button class="btn-delete" onclick="deleteCharacter(${index})">Delete</button> 
        `;
        
        // Agrega la tarjeta al contenedor principal
        container.appendChild(card);
    });
});
