
document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const index = params.get("id");
  
    const contenedor = document.getElementById("detalle-personaje");
    const characters = JSON.parse(localStorage.getItem("characters")) || [];
  
    if (index === null || !characters[index]) {
      contenedor.innerHTML = "<p>No se encontró el personaje solicitado.</p>";
      return;
    }
  
    const character = characters[index];
  
    contenedor.innerHTML = `
      <div class="card">
        <h2>${character.name}</h2>
        <p><strong>Género:</strong> ${character.gender}</p>
        <p><strong>Raza:</strong> ${character.races}</p>
        <p><strong>Clase:</strong> ${character.classes}</p>
        <p><strong>Armadura:</strong> ${character.armor}</p>
        <p><strong>Arma:</strong> ${character.weapon}</p>
        <p><strong>Estadísticas:</strong> Fuerza: ${character.force}, Destreza: ${character.skill}, Inteligencia: ${character.intelligence}</p>
        <p><strong>Habilidad Especial:</strong>${character.ability}</p>
        <p><strong>Accesorios:</strong> ${character.accesories}</p>
      </div>
    `;
  });
  