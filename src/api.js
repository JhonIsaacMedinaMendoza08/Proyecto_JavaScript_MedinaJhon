const baseURL = "https://www.dnd5eapi.co/api";

document.addEventListener("DOMContentLoaded", () => {
    loadOptions("races" , "races")
    loadOptions("classes" , "classes")
    loadOptions("spells" , "ability")
})

async function loadOptions(endpoint, selectId) {
    try {
        const response = await fetch(`${baseURL}/${endpoint}`);
        const data = await response.json();
        const select = document.getElementById(selectId);

        data.results.forEach(item => {
            const option = document.createElement("option");
            option.value = item.name;
            option.textContent = item.name;
            select.appendChild(option);
            });
            } catch (error) {
                console.error(`Error al cargar ${selectId}: ` ,error);
    }
}