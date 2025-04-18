document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("listCharacters")
    const characters = JSON.parse(localStorage.getItem("characters"))
    if (characters.lenght === 0) {
        container.innerHTML = "<p>No hay personajes guardados aun en nuestro servicio</p>";
        return;
    }

    characters.forEach((character, index) => {
        const card = document.createElement("div")
        card.classList.add("characterCard")
        card.innerHTML = `
        <h2>${character.name}</h2>
        <p><strong>Género:</strong> ${character.gender}</p>
        <p><strong>Raza:</strong> ${character.races}</p>
        <p><strong>Clase:</strong> ${character.classes}</p>
        <p><strong>Armadura:</strong> ${character.armor}</p>
        <p><strong>Arma:</strong> ${character.weapon}</p>
        <p><strong>Estadísticas:</strong> Fuerza: ${character.force}, Destreza: ${character.skill}, Inteligencia: ${character.intelligence}</p>
        <p><strong>Habilidad Especial:</strong>${character.ability}</p>
        <p><strong>Accesorios:</strong> ${character.accesories}</p>
        <a href="details.html?id=${index}">Ver Detalles</a>
`
        container.appendChild(card)
    });
});