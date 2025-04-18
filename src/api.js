const baseURL = "https://www.dnd5eapi.co/api";

document.addEventListener("DOMContentLoaded", () => {
    loadOptions("races", "races");
    loadOptions("classes", "classes");
    loadOptions("spells", "ability");
    loadArmorOptions("armor");
    loadWeaponOptions("weapon");
    loadAccesoriesOptions("accessories");
});

async function loadOptions(endpoint, selectId) {
    try {
        const response = await fetch(`${baseURL}/${endpoint}`);
        const data = await response.json();
        const select = document.getElementById(selectId);

        data.results.forEach(item => {
            const option = document.createElement("option");
            option.value = item.index;
            option.textContent = item.name;
            select.appendChild(option);
        });
    } catch (error) {
        console.error(`Error al cargar ${selectId}: `, error);
    }
}

async function loadArmorOptions(selectId) {
    try {
        const response = await fetch(`${baseURL}/equipment-categories/armor`);
        const data = await response.json();
        const select = document.getElementById(selectId);

        data.equipment.forEach(item => {
            const option = document.createElement("option");
            option.value = item.index;
            option.textContent = item.name;
            select.appendChild(option);
        });
    } catch (error) {
        console.error(`Error al cargar armaduras: `, error);
    }
}
async function loadWeaponOptions(selectId) {
    try {
        const response = await fetch(`${baseURL}/equipment-categories/weapon`);
        const data = await response.json();
        const select = document.getElementById(selectId);

        data.equipment.forEach(item => {
            const option = document.createElement("option");
            option.value = item.index;
            option.textContent = item.name;
            select.appendChild(option);
        });
    } catch (error) {
        console.error(`Error al cargar armas: `, error);
    }
}
async function loadAccesoriesOptions(selectId) {
    try {
        const response = await fetch(`${baseURL}/equipment-categories/adventuring-gear`);
        const data = await response.json();
        const select = document.getElementById(selectId);

        data.equipment.forEach(item => {
            const option = document.createElement("option");
            option.value = item.index;
            option.textContent = item.name;
            select.appendChild(option);
        });
    } catch (error) {
        console.error(`Error al cargar acessorios: `, error);
    }
}