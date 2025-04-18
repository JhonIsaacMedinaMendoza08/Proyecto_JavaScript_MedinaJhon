// Espera a que todo el contenido del DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("listCharacters"); // Contenedor donde se mostrarán las tarjetas de personajes

    const characters = JSON.parse(localStorage.getItem("characters")); // Obtiene el array de personajes desde localStorage

    // Verifica si no hay personajes guardados (¡hay un pequeño error aquí, se corrige más abajo!)
    if (characters.length === 0) {
        container.innerHTML = "<p>There are no saved characters yet in our service.</p>";
        return; // Sale de la función si no hay personajes
    }
    // Recorre cada personaje guardado y crea una tarjeta HTML para mostrarlo
    characters.forEach((character, index) => {
        const card = document.createElement("div"); // Crea un nuevo div para la tarjeta
        card.classList.add("characterCard"); // Le asigna una clase para estilos
        // Llena la tarjeta con la información del personaje
        card.innerHTML = `
            <h2>${character.name}</h2>
            <p><strong>Raza:</strong> ${character.races}</p>
            <p><strong>Clase:</strong> ${character.classes}</p>
            <a href="details.html?id=${index}">Ver Detalles</a> <!-- Link a detalles del personaje -->
            <button class="btn-eliminar" onclick="deleteCharacter(${index})">Delete</button> 
        `;
        // Agrega la tarjeta al contenedor
        container.appendChild(card);
    });
});

function deleteCharacter(index) {
    const confirmation = confirm("¿Are you sure you want to delete this character?"); // Pregunta de confirmación
    if (!confirmation) return; // Si el usuario cancela, no se hace nada

    const characters = JSON.parse(localStorage.getItem("characters")) || []; // Obtiene el array actualizado
    characters.splice(index, 1); // Elimina 1 elemento en la posición del índice seleccionado
    localStorage.setItem("characters", JSON.stringify(characters)); // Guarda el nuevo array sin el personaje eliminado
    location.reload(); // Recarga la página para reflejar los cambios
}
