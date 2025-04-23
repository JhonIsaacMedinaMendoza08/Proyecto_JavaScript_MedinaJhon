document.getElementById("form__character").addEventListener("submit", (e) => {
    e.preventDefault();
    // Crea un objeto 'character' con los valores seleccionados o escritos por el usuario
    const character = {
        name: document.getElementById("name").value,                  // Nombre 
        gender: document.getElementById("gender").value,              // Género
        races: document.getElementById("races").value,                // Raza
        classes: document.getElementById("classes").value,            // Clase
        armor: document.getElementById("armor").value,                // Armadura seleccionada
        weapon: document.getElementById("weapon").value,              // Arma seleccionada
        force: document.getElementById("force").value,                // Valor de fuerza
        dexterity: document.getElementById("dexterity").value,                // Valor de habilidad
        intelligence: document.getElementById("intelligence").value,  // Valor de inteligencia
        constitution: document.getElementById("constitution").value,  // Valor de inteligencia
        wisdom: document.getElementById("wisdom").value,  // Valor de inteligencia
        charisma: document.getElementById("charisma").value,  // Valor de inteligencia
        ability: document.getElementById("ability").value,            // Hechizo o habilidad mágica
        accesories: document.getElementById("accessories").value      // Accesorio o equipo de aventura
    };
    console.log(character); // Muestra el objeto en consola para verificar su contenido
    // Llama a la función que guarda el personaje en localStorage
    saveCharacter(character);
});

// Función que guarda un personaje en localStorage
function saveCharacter(character) {
    // Obtiene los personajes previamente guardados, o crea un array vacío si no hay ninguno
    const savedCharacters = JSON.parse(localStorage.getItem("characters")) || [];
    // Agrega el nuevo personaje al array
    savedCharacters.push(character);
    // Guarda el array actualizado en localStorage como string
    localStorage.setItem("characters", JSON.stringify(savedCharacters));
    // Muestra en consola todos los personajes guardados
    console.log(savedCharacters);
    // Alerta al usuario que el personaje fue guardado
    alert("💾 ¡Character saved successfully! 💾");
    // Resetea el formulario para limpiar los campos
    document.getElementById("form__character").reset();
}
