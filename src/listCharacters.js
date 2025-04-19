document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("listCharacters");
    const characters = JSON.parse(localStorage.getItem("characters")) || []; 

    if (characters.length === 0) {
        container.innerHTML = "<p>There are no saved characters yet in our service.</p>";
        return;
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

    characters.forEach((character, index) => {
        const card = document.createElement("div");
        card.classList.add("characterCard");

        const imageSrc = raceImages[character.races] || raceImages["default"];

        card.innerHTML = `
            <img src="${imageSrc}" alt="${character.races}" class="race-image" />
            <h2>${character.name}</h2>
            <p><strong>Race:</strong> ${character.races}</p>
            <p><strong>Class:</strong> ${character.classes}</p>
            <a href="details.html?id=${index}">See Details</a> 
            <button class="btn-delete" onclick="deleteCharacter(${index})">Delete</button> 
        `;
        container.appendChild(card);
    });
});

function deleteCharacter(index) {
    const confirmation = confirm("¿Are you sure you want to delete this character?");
    if (!confirmation) return;

    const characters = JSON.parse(localStorage.getItem("characters")) || [];
    characters.splice(index, 1);
    localStorage.setItem("characters", JSON.stringify(characters));
    location.reload();
}
