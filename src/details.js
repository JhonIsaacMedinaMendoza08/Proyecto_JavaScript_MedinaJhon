// Espera a que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", () => {
  // Obtiene los parámetros de la URL (por ejemplo: ?id=0)
  const params = new URLSearchParams(window.location.search);
  // Obtiene el valor del parámetro "id", que representa el índice del personaje en el localStorage

  const index = params.get("id");
  // Referencia al contenedor donde se mostrarán los detalles del personaje

  const contenedor = document.getElementById("detailsCharacter");
  // Recupera los personajes guardados desde localStorage

  const characters = JSON.parse(localStorage.getItem("characters")) || [];
  // Si no se proporcionó un índice o no existe el personaje con ese índice, muestra un mensaje de error

  if (index === null || !characters[index]) {
    contenedor.innerHTML = "<p>The requested character was not found.</p>";
    return; // Termina la ejecución
  }
  // Si el índice es válido, obtiene el personaje correspondiente
  const character = characters[index];
  // Muestra la información detallada del personaje en el contenedor
  contenedor.innerHTML = `
    <div class="card">
      <h2>${character.name}</h2>
      <p><strong>Género:</strong> ${character.gender}</p>
      <p><strong>Raza:</strong> ${character.races}</p>
      <p><strong>Clase:</strong> ${character.classes}</p>
      <p><strong>Armadura:</strong> ${character.armor}</p>
      <p><strong>Arma:</strong> ${character.weapon}</p>
      <p><strong>Estadísticas:</strong> Fuerza: ${character.force}, Destreza: ${character.skill}, Inteligencia: ${character.intelligence}</p>
      <p><strong>Habilidad Especial:</strong> ${character.ability}</p>
      <p><strong>Accesorios:</strong> ${character.accesories}</p>
    </div>
  `;
});
