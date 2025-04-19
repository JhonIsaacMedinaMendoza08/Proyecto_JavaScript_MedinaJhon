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
    "default": "assets/races/default.png"
};
  // Si el índice es válido, obtiene el personaje correspondiente
  const character = characters[index];
  // Muestra la información detallada del personaje en el contenedor
  const imageSrc = raceImages[character.races] || raceImages["default"];
  contenedor.innerHTML = `
    <div class="card">
      <img src="${imageSrc}" alt="${character.races}" class="race-image" />
      <h2>${character.name}</h2>
      <p><strong>Gender:</strong> ${character.gender}</p>
      <p><strong>Races:</strong> ${character.races}</p>
      <p><strong>Class:</strong> ${character.classes}</p>
      <p><strong>Armor:</strong> ${character.armor}</p>
      <p><strong>Weapon:</strong> ${character.weapon}</p>
      <p><strong>Statistics:</strong> <br>
      Force: ${character.force}, <br>
      Skill: ${character.skill}, <br>
      Intelligence: ${character.intelligence}</p>
      <p><strong>Special Ability:</strong> ${character.ability}</p>
      <p><strong>Accessories:</strong> ${character.accesories}</p>
    </div>
  `;
});
