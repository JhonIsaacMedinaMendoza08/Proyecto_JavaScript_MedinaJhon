document.getElementById("form__character").addEventListener("submit", (e) => {
    e.preventDefault();

    const character = {
        name: document.getElementById("name").value,
        gender: document.getElementById("gender").value,
        races: document.getElementById("races").value,
        classes: document.getElementById("classes").value,
        armor: document.getElementById("armor").value,
        weapon: document.getElementById("weapon").value,
        force: document.getElementById("force").value,
        skill: document.getElementById("skill").value,
        intelligence: document.getElementById("intelligence").value,
        ability: document.getElementById("ability").value,
        accesories: document.getElementById("accessories").value,
    };
    console.log(character);
    saveCharacter(character)
})
function saveCharacter(character) {
    const savedCharacters = JSON.parse(localStorage.getItem("characters")) || [];
    savedCharacters.push(character);
    localStorage.setItem("characters", JSON.stringify(savedCharacters));
    console.log(savedCharacters);
    alert("¡Character saved successfully!");
    document.getElementById("form__character").reset();
}
